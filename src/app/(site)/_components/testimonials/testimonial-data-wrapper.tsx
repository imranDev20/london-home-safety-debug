import React from "react";
import TestimonialSlider from "./testimonial-slider";
import dbConnect from "@/app/api/_lib/dbConnect";
import { ITestimonial } from "@/types/testimonial";
import Testimonial from "@/app/api/_models/Testimonial";

async function fetchTestimonials(page: number): Promise<ITestimonial[]> {
  await dbConnect();
  const limit = 10;
  const skip = (page - 1) * limit;

  const testimonials: ITestimonial[] = await Testimonial.find({})
    .sort({ createdAt: -1 }) // Sort by createdAt in descending order
    .skip(skip)
    .limit(limit);

  return testimonials;
}

export default async function TestimonialDataWrapper() {
  const testimonialData = await fetchTestimonials(1);

  return <TestimonialSlider slides={testimonialData} />;
}
