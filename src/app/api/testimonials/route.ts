import dbConnect from "@/app/api/_lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import Testimonial from "../_models/Testimonial";
import { formatResponse } from "@/shared/functions";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const userId = req.nextUrl.searchParams.get("user_id");
    const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);
    const limit = 10; // Number of testimonials per page
    const skip = (page - 1) * limit; // Number of testimonials to skip

    const query: any = {};

    if (userId) {
      query.user_id = userId;
    }

    const testimonials = await Testimonial.find(query)
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order
      .skip(skip)
      .limit(limit);

    const totalCount = await Testimonial.countDocuments(
      userId ? { user: userId } : {}
    );
    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json(
      formatResponse(true, testimonials, "Testimonials fetched successfully", {
        currentPage: page,
        totalPages,
        totalCount,
      })
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(formatResponse(false, null, error.message), {
      status: 500,
    });
  }
}
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
