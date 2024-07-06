import dbConnect from "@/app/api/_lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { calculatePreOrderTotalCost, formatResponse } from "@/shared/functions";
import Order from "../_models/Order";
import { sendEmail } from "../_lib/send-email";
import { placedOrderEmailHtml } from "../_templates/order-placed-email";
import PreOrder from "../_models/PreOrder";
import { PreOrderTypeForResponse } from "@/types/orders";
import mongoose, { Types } from "mongoose";

import {
  generateInvoiceId,
  generateInvoicePdfFromPreOrder,
} from "../_lib/generate-Invoice";
import { UserType } from "@/types/users";
import { receivedOrderEmailHtml } from "../_templates/order-received-email";
import { config } from "../auth/[...nextauth]/auth";
import { getServerSession } from "next-auth";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { pre_order_id } = await req.json();

    if (!pre_order_id) {
      return NextResponse.json(
        formatResponse(false, null, "pre_order_id is required"),
        { status: 400 }
      );
    }

    const preOrder = (await PreOrder.findById(pre_order_id).populate(
      "personal_info.customer"
    )) as PreOrderTypeForResponse<UserType>;

    if (!preOrder) {
      return NextResponse.json(
        formatResponse(false, null, "PreOrder not found"),
        { status: 404 }
      );
    }

    if (
      !preOrder.service_info ||
      !preOrder.personal_info ||
      !preOrder.payment_info
    ) {
      return NextResponse.json(
        formatResponse(
          false,
          null,
          "PreOrder step missing: please ensure all service, personal, and payment information is provided."
        ),
        { status: 400 }
      );
    }

    const invoiceId = await generateInvoiceId();

    // Serialize the PDF document to a Uint8Array
    const pdfBytes = await generateInvoicePdfFromPreOrder(invoiceId, preOrder);
    const pdfBase64 = Buffer.from(pdfBytes).toString("base64");

    //needed this code to text and create the invoice
    // Define the path to save the PDF
    // const invoicesDir = path.join(process.cwd(), "public", "invoices");
    // if (!fs.existsSync(invoicesDir)) {
    //   fs.mkdirSync(invoicesDir, { recursive: true });
    // }
    // const pdfPath = path.join(invoicesDir, `invoice_${invoiceId}.pdf`);

    // // Save the PDF file to the public/invoices folder
    // fs.writeFileSync(pdfPath, Buffer.from(pdfBytes));

    const totalCost = calculatePreOrderTotalCost(preOrder);

    const newOrder = new Order({
      ...preOrder.service_info,
      ...preOrder.personal_info,
      customer: preOrder.personal_info.customer._id,
      ...preOrder.payment_info,
      remaining_amount: totalCost,
      assigned_engineer: null,
      paid_amount: 0,
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

    const { email = "", name = "" } = preOrder.personal_info.customer;

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
    await PreOrder.findByIdAndDelete(pre_order_id);

    const response = NextResponse.json(
      formatResponse(
        true,
        newOrder,
        "Order created successfully, PreOrder deleted, and invoice generated"
      )
    );

    response.cookies.set("bookingSession", "", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      expires: new Date(0),
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(formatResponse(false, null, error.message), {
      status: 500,
    });
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    await dbConnect();

    const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);
    const limit = 10;
    const skip = (page - 1) * limit;

    const searchTerm = req.nextUrl.searchParams.get("q") || "";
    const assignedTo = req.nextUrl.searchParams.get("assigned_to") || "";
    const orderStatus = req.nextUrl.searchParams.get("order_status") || "";
    const sortBy = req.nextUrl.searchParams.get("sort_by") || "createdAt";
    const sortOrder = req.nextUrl.searchParams.get("sort_order") || "desc";
    const customerId = req.nextUrl.searchParams.get("customer_id") || "";

    const session = await getServerSession(config);
    if (
      session?.user.role !== "admin" &&
      (!customerId || new Types.ObjectId(customerId) !== session?.user._id)
    ) {
      return NextResponse.json(
        formatResponse(false, null, "Unauthorized access"),
        { status: 403 }
      );
    }

    function getSortField(sortBy: string) {
      switch (sortBy) {
        case "name":
          return "customer.name";
        case "email":
          return "customer.email";
        case "phone":
          return "customer.phone";
        case "createdAt":
        default:
          return "createdAt";
      }
    }

    const sortField = getSortField(sortBy);

    console.log(assignedTo);

    const pipeline: any[] = [
      // Match customer and search term
      {
        $match: {
          ...(customerId
            ? { customer: new mongoose.Types.ObjectId(customerId) }
            : {}),
        },
      },
      // Sort order_status array by timestamp
      {
        $addFields: {
          order_status: {
            $sortArray: {
              input: "$order_status",
              sortBy: { timestamp: -1 },
            },
          },
        },
      },
      // Add most recent status field
      {
        $addFields: {
          mostRecentStatus: {
            $arrayElemAt: ["$order_status", 0],
          },
        },
      },
      // Match based on orderStatus and assignedTo filters
      {
        $match: {
          ...(orderStatus ? { "mostRecentStatus.status": orderStatus } : {}),
          ...(assignedTo
            ? { assigned_engineer: new Types.ObjectId(assignedTo) }
            : {}),
        },
      },
      // Join with the users collection to get customer details
      {
        $lookup: {
          from: "users",
          localField: "customer",
          foreignField: "_id",
          as: "customer",
        },
      },
      // Unwind customer array to get a single customer object
      {
        $unwind: {
          path: "$customer",
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $match: {
          ...(searchTerm && {
            $or: [
              { invoice_id: { $regex: searchTerm, $options: "i" } },
              { "customer.name": { $regex: searchTerm, $options: "i" } },
              { "customer.email": { $regex: searchTerm, $options: "i" } },
              { "customer.phone": { $regex: searchTerm, $options: "i" } },
            ],
          }),
        },
      },

      // Sort, skip, and limit for pagination
      {
        $sort: {
          [sortField]: sortOrder === "asc" ? 1 : -1,
          createdAt: sortOrder === "asc" ? 1 : -1,
        },
      },
      { $skip: skip },
      { $limit: limit },
    ];

    // Fetch orders from the database using the aggregation pipeline
    const orders = await Order.aggregate(pipeline).exec();

    // Create a pipeline for counting the documents
    const countPipeline = [
      ...pipeline.slice(0, -2), // Exclude $skip and $limit stages
      {
        $count: "totalCount",
      },
    ];
    // Fetch the total count from the database using the count pipeline
    const countResult = await Order.aggregate(countPipeline).exec();

    const totalCount = countResult[0]?.totalCount || 0;
    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json(
      formatResponse(true, orders, "Orders fetched successfully", {
        currentPage: page,
        totalPages,
        totalCount,
      })
    );
  } catch (error: any) {
    return NextResponse.json(formatResponse(false, null, error.message), {
      status: 500,
    });
  }
}
