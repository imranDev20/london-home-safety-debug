import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../_lib/dbConnect";
import Order from "../../_models/Order";
import { formatResponse } from "@/shared/functions";
import { OrderType } from "@/types/orders";
import { UserType } from "@/types/users";

export async function GET(
  req: NextRequest,
  { params }: { params: { order_id: string } }
) {
  try {
    await dbConnect();
    const orderId = params.order_id;

    const order = (await Order.findById(orderId).populate({
      path: "customer",
      select: "-password", // Exclude the password field
    })) as OrderType<true, UserType>;

    if (!order) {
      return NextResponse.json(formatResponse(false, null, "Order not found"), {
        status: 404,
      });
    }

    // Ensure timestamp is converted to Date objects if they are strings
    order.order_status.forEach((status) => {
      status.timestamp = new Date(status.timestamp);
    });

    // Sort the order_status array by timestamp in descending order
    order.order_status.sort(
      (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
    );

    return NextResponse.json(
      formatResponse(true, order, "Order fetched successfully")
    );
  } catch (error: any) {
    return NextResponse.json(formatResponse(false, null, error.message), {
      status: 500,
    });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { order_id: string } }
) {
  try {
    await dbConnect();
    const orderId = params.order_id;

    // Get the request body containing the updated order data
    const updatedOrderData = await req.json();

    // Update the order in the database directly using findByIdAndUpdate
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      updatedOrderData,
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return NextResponse.json(formatResponse(false, null, "Order not found"), {
        status: 404,
      });
    }

    return NextResponse.json(
      formatResponse(true, updatedOrder, "Order updated successfully")
    );
  } catch (error: any) {
    return NextResponse.json(formatResponse(false, null, error.message), {
      status: 500,
    });
  }
}
