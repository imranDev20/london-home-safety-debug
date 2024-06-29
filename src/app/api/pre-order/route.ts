import dbConnect from "@/app/api/_lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import PreOrder from "../_models/PreOrder";
import mongoose from "mongoose";
import { formatResponse } from "@/shared/functions";
import User from "../_models/User";
import bcrypt from "bcrypt";

import { createAccountInOrderNotifyHtml } from "../_templates/create-account-order-notify";
import { sendEmail } from "../_lib/send-email";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await dbConnect();
    const { status, ...data } = await req.json();
    const preOrderId = req.cookies.get("bookingSession")?.value;

    let preOrder;

    switch (status) {
      case "service":
        // Validate and handle the customer information step
        preOrder = await PreOrder.findById(preOrderId);

        if (!preOrder) {
          preOrder = new PreOrder({
            service_info: data.service_info,
            status: "service",
          });
          await preOrder.save();
        } else {
          preOrder.service_info = data.service_info;
          preOrder.status = "service";
          await preOrder.save();
        }
        break;

      case "personal":
        // Validate and handle the product information step

        preOrder = await PreOrder.findById(preOrderId);
        if (!preOrder) {
          throw new Error("PreOrder not found for this ID");
        }

        const { name, email, address, phone } = data.personal_info.customer;
        const password = Math.random().toString(36).slice(-6);

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        let customer;
        customer = await User.findOne({ email }); //checking if user exists

        if (!customer) {
          customer = new User({
            name,
            email,
            phone,
            address,
            password: hashedPassword,
            role: "customer",
            creation_method: "through_order",
          });
          await customer.save();

          // send email to customer after account creation
          const accountCreateNotifyEmailSubject = `Your Account is Ready - Start Tracking Your Orders Now`;

          await sendEmail({
            fromEmail: "info@londonhomesafety.co.uk",
            fromName: "London Home Safety",
            to: email,
            subject: accountCreateNotifyEmailSubject,
            html: createAccountInOrderNotifyHtml(name, email, password),
          });
        } else {
          customer.role = "customer";
          customer.phone = phone;
          customer.address = address;
          customer.creation_method = "registration";
          await customer.save();
        }

        if (!customer) {
          throw new Error("Customer creation failed. Please try again.");
        }

        // update the pre-order
        preOrder.service_info = data.service_info;
        preOrder.personal_info = {
          ...data.personal_info,
          customer: customer._id,
        };
        preOrder.status = "personal";

        await preOrder.save();
        break;

      case "payment":
        // Find the existing pre-order by id
        preOrder = await PreOrder.findById(preOrderId).populate(
          "personal_info.customer"
        );

        if (!preOrder) {
          throw new Error("PreOrder not found for this ID");
        }

        preOrder.service_info = data.service_info;
        preOrder.personal_info = data.personal_info;
        preOrder.payment_info = data.payment_info;
        preOrder.status = "payment";
        await preOrder.save();
        break;

      default:
        return NextResponse.json(
          {
            success: false,
            message: "Invalid step",
          },
          { status: 400 }
        );
    }

    const response = NextResponse.json(
      formatResponse(true, preOrder, "Order status updated")
    );

    response.cookies.set("bookingSession", preOrder._id.toString(), {
      httpOnly: true, // Set the httpOnly flag to true
      maxAge: 60 * 60 * 24 * 7, // 1 week in seconds
      sameSite: "strict",
      path: "/", // Set the path for the cookie
    });
    return response;
  } catch (error: any) {
    console.log(error);

    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json(formatResponse(false, null, error.message), {
        status: 400,
      });
    }

    if (error.code === "ETIMEOUT") {
      return NextResponse.json(
        formatResponse(false, null, "Couldn't connect to database"),
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(formatResponse(false, null, error.message), {
      status: 500,
    });
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    await dbConnect();
    const preOrderId = req.cookies.get("bookingSession")?.value;
    const preOrder = await PreOrder.findById(preOrderId).populate(
      "personal_info.customer"
    );

    return NextResponse.json({
      success: true,
      message: "Data fetched successfully!",
      data: preOrder,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(formatResponse(false, null, error.message), {
      status: 500,
    });
  }
}
