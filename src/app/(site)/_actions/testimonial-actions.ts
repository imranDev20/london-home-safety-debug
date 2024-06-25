"use server";

import { revalidatePath } from "next/cache";
import testimonialSchema from "../_schemas/testimonial-schema";

import Testimonial from "@/app/api/_models/Testimonial";
import dbConnect from "@/app/api/_lib/dbConnect";

export type FormState = {
  message: string;
};

export async function createTestimonialAction(
  previousState: FormState,
  data: FormData
) {
  const formData = Object.fromEntries(data);
  const parsedData = {
    ...formData,
    rating: Number(formData.rating), // Convert rating to a number using Number
  };

  try {
    const validationResult = testimonialSchema.safeParse(parsedData);

    if (!validationResult.success) {
      // If validation fails, return the error messages
      const errorMessages = validationResult.error.errors
        .map((err) => err.message)
        .join(", ");
      return {
        message: `Validation failed: ${errorMessages}`,
        success: false,
      };
    }

    // If validation succeeds, create a new testimonial using Mongoose
    const newTestimonial = new Testimonial(validationResult.data);
    await newTestimonial.save();

    // Revalidate the page to update the UI
    revalidatePath("/");

    return {
      message: "Testimonial created successfully!",
      success: true,
    };
  } catch (error: any) {
    console.error("Error creating testimonial:", error);
    return {
      message: "An error occurred while creating the testimonial.",
      success: false,
    };
  }
}
