import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../_lib/dbConnect";
import Order from "../../../_models/Order";
import { OrderType } from "@/types/orders";
import { UserType } from "@/types/users";
import { formatResponse } from "@/shared/functions";
import { generateInvoicePdfFromOrder } from "@/app/api/_lib/generate-Invoice";

export async function GET(
  req: NextRequest,
  { params }: { params: { order_id: string } }
) {
  try {
    await dbConnect();

    const orderId = params.order_id;

    const order = await Order.findById(orderId).populate({
      path: "customer",
      select: "-password", // Exclude the password field
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 500 });
    }

    const pdfBytes = await generateInvoicePdfFromOrder(order.invoice_id, order);
    const invoiceData = Buffer.from(pdfBytes).toString("base64");

    const response = {
      invoiceData,
    };

    return NextResponse.json(
      formatResponse(true, response, "Export orders successful!"),
      {
        headers: {
          "Content-Type": "application/json",
          "Content-Disposition": 'attachment; filename="invoice.pdf"',
        },
      }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to export orders" },
      { status: 500 }
    );
  }
}
