"use server";

import { revalidatePath } from "next/cache";
import Testimonial from "../api/_models/Testimonial";
import testimonialSchema from "./schemas/testimonial-schema";
import dbConnect from "../api/_lib/dbConnect";

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

    await dbConnect();

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

  // Convert fields to their appropriate types with validation
}
