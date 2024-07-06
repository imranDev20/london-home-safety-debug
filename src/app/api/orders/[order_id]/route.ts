import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../_lib/dbConnect";
import Order from "../../_models/Order";
import { formatResponse } from "@/shared/functions";
import { OrderTypeForResponse } from "@/types/orders";
import { UserType } from "@/types/users";
import { getServerSession } from "next-auth";
import { config } from "../../auth/[...nextauth]/auth";

// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET(
  req: NextRequest,
  { params }: { params: { order_id: string } }
) {
  try {
    await dbConnect();
    const orderId = params.order_id;

    // await delay(1000); // 1-second delay

    const order = (await Order.findById(orderId).populate({
      path: "customer",
      select: "-password", // Exclude the password field
    })) as OrderTypeForResponse<UserType>;

    if (!order) {
      return NextResponse.json(formatResponse(false, null, "Order not found"), {
        status: 404,
      });
    }

    const session = await getServerSession(config);

    if (
      session?.user.role !== "admin" &&
      session?.user._id !== order.customer._id
    ) {
      return NextResponse.json(
        formatResponse(false, null, "Unauthorized access"),
        { status: 403 }
      );
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
    const session = await getServerSession(config);

    if (session?.user.role !== "admin") {
      return NextResponse.json(
        formatResponse(false, null, "Unauthorized access"),
        { status: 403 }
      );
    }

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
