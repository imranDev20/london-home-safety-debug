import { NextResponse } from "next/server";
import { buffer } from "node:stream/consumers";
import Stripe from "stripe";
import PreOrder from "../_models/PreOrder";
import Order from "../_models/Order";
import {
  generateInvoiceId,
  generateInvoicePdfFromPreOrder,
} from "../_lib/generate-Invoice";
import { sendEmail } from "../_lib/send-email";
import { placedOrderEmailHtml } from "../_templates/order-placed-email";
import { receivedOrderEmailHtml } from "../_templates/order-received-email";
import { UserType } from "@/types/users";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET_KEY;

export async function POST(req: any) {
  const rawBody = await buffer(req.body);
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      req.headers.get("stripe-signature") as string,
      process.env.STRIPE_WEBHOOK_SECRET_KEY as string
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: "Webhook signature verification failed",
      },
      {
        status: 400,
      }
    );
  }

  try {
    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;

        const preOrder = await PreOrder.findById(
          paymentIntent.metadata.pre_order_id
        ).populate("personal_info.customer");

        if (!preOrder) {
          throw new Error("You did not complete previous steps");
        }

        const invoiceId = await generateInvoiceId();
        const pdfBytes = await generateInvoicePdfFromPreOrder(
          invoiceId,
          preOrder
        );
        const pdfBase64 = Buffer.from(pdfBytes).toString("base64");

        const newOrder = new Order({
          ...preOrder.service_info,
          ...preOrder.personal_info,
          customer: preOrder.personal_info?.customer._id,
          ...preOrder.payment_info,
          remaining_amount: 0,
          paid_amount: paymentIntent.amount_received,
          invoice_id: invoiceId,
        });
        await newOrder.save();

        const attachments = [
          {
            ContentType: "application/pdf",
            Filename: `invoice_${invoiceId}.pdf`,
            Base64Content: pdfBase64,
          },
        ];

        const { email, name } = preOrder?.personal_info?.customer as UserType;

        const orderPlacedEmailSubject = `Your Order Has Been Placed: Confirmation #${invoiceId}`;
        // send email to customer
        await sendEmail({
          fromEmail: "info@londonhomesafety.co.uk",
          fromName: "London Home Safety",
          to: email,
          subject: orderPlacedEmailSubject,
          html: placedOrderEmailHtml(name, invoiceId),
          attachments: attachments,
        });

        const orderReceivedEmailSubject = `New Order Received: Order #${invoiceId} - Action Required`;
        // send email to admin
        await sendEmail({
          fromEmail: "info@londonhomesafety.co.uk",
          fromName: "London Home Safety",
          to: process.env.ADMIN_EMAIL as string,
          subject: orderReceivedEmailSubject,
          html: receivedOrderEmailHtml(
            newOrder.invoice_id,
            newOrder._id.toString()
          ),
          attachments: attachments,
        });

        // Delete the pre order after order is complete
        await PreOrder.findByIdAndDelete(paymentIntent.metadata.pre_order_id);

        console.log("PaymentIntent was successful!");
        break;
      case "payment_method.attached":
        const paymentMethod = event.data.object;
        console.log("PaymentMethod was attached to a Customer!");
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    const response = NextResponse.json(
      { message: "successfully received" },
      { status: 200 }
    );

    response.cookies.set("bookingSession", "", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      expires: new Date(0),
    });

    return response;
  } catch (error) {
    console.log(error);
  }
}
