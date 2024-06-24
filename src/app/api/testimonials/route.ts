import dbConnect from "@/app/api/_lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import Testimonial from "../_models/Testimonial";
import { formatResponse } from "@/shared/functions";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { name, subject, user, rating, content } = await req.json();

    const newTestimonial = new Testimonial({
      name,
      subject,
      user,
      rating,
      content,
    });

    const savedTestimonial = await newTestimonial.save();

    return NextResponse.json(
      formatResponse(true, savedTestimonial, "Testimonial created successfully")
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
