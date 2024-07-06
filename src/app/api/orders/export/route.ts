import { NextRequest, NextResponse } from "next/server";
import exceljs from "exceljs";
import dbConnect from "../../_lib/dbConnect";
import Order from "../../_models/Order";

import {
  calculateOrderTotalCost,
  formatResponse,
  getMostRecentStatus,
  snakeCaseToNormalText,
} from "@/shared/functions";
import dayjs from "dayjs";
import { getServerSession } from "next-auth";
import { config } from "../../auth/[...nextauth]/auth";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(config);

    if (session?.user.role !== "admin") {
      return NextResponse.json(
        formatResponse(false, null, "Unauthorized access"),
        { status: 403 }
      );
    }

    const orders = await Order.find(
      {},
      {
        invoice_id: 1,
        customer: 1,
        createdAt: 1,
        payment_method: 1,
        order_status: 1,
        order_items: 1,
        parking_options: 1,
        congestion_zone: 1,
      }
    ).populate("customer", "name email phone address.postcode");

    const totalOrders = orders.length;

    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet("Orders");

    worksheet.columns = [
      { header: "Invoice ID", key: "invoice_id", width: 20 },
      { header: "Name", key: "name", width: 30 },
      { header: "Email", key: "email", width: 30 },
      { header: "Phone", key: "phone", width: 20 },
      { header: "Postcode", key: "postcode", width: 15 },

      { header: "Placed On", key: "createdAt", width: 20 },
      { header: "Payment Method", key: "payment_method", width: 20 },
      { header: "Status", key: "status", width: 30 },
      {
        header: "Total",
        key: "total",
        width: 15,
      },
    ];

    const progressUpdates = [];

    let processedOrders = 0;
    for (const order of orders) {
      const mostRecentStatus = getMostRecentStatus(order.order_status);
      worksheet.addRow({
        invoice_id: order.invoice_id,
        name: order.customer.name,
        email: order.customer.email,
        phone: order.customer.phone,
        postcode: order?.customer?.address?.postcode,

        status: snakeCaseToNormalText(mostRecentStatus),
        createdAt: dayjs(order?.createdAt).format("DD MMMM YYYY"),
        payment_method: snakeCaseToNormalText(order.payment_method),
        total: calculateOrderTotalCost(order),
      });
      processedOrders++;
      const progress = Math.round((processedOrders / totalOrders) * 100);
      progressUpdates.push({ progress });
    }

    const buffer = await workbook.xlsx.writeBuffer();
    const excelData = Buffer.from(buffer).toString("base64");

    const response = {
      progressUpdates,
      excelData,
    };

    return NextResponse.json(
      formatResponse(true, response, "Export orders successful!"),
      {
        headers: {
          "Content-Type": "application/json",
          "Content-Disposition": 'attachment; filename="orders.xlsx"',
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
