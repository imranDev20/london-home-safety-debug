import { calculatePreOrderTotalCost } from "@/shared/functions";
import { PreOrderType } from "@/types/orders";
import { UserType } from "@/types/users";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// This is your test secret API key.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

export async function POST(req: NextRequest) {
  try {
    const { data } = await req.json();
    const total = calculatePreOrderTotalCost(data);

    if (!total) {
      throw new Error("There was a problem calculating the total amount");
    }

    const paymentIntent = await stripe.paymentIntents.create({
      currency: "gbp",
      amount: total,
      payment_method_types: ["card"],
      description: "Thanks for your purchase!",
      metadata: {
        pre_order_id: data._id.toString(),
      },
    });

    if (paymentIntent.client_secret) {
      return NextResponse.json(
        {
          clientSecret: paymentIntent.client_secret,
          orderId: paymentIntent.id,
        },
        {
          status: 200,
        }
      );
    } else {
      return NextResponse.json(
        {
          message: "Payment intent not found",
        },
        {
          status: 404,
        }
      );
    }
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        message: error.message || "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
