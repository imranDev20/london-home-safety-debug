"use server";

import testimonialSchema from "./schemas/testimonial-schema";

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
    const parseResult = testimonialSchema.safeParse(parsedData);
    console.log(parseResult);

    if (!parseResult.success) {
      throw new Error("Invalid data");
    }

    return {
      message: "Created Successfully",
    };
  } catch (error: any) {
    return {
      message: error?.message,
    };
  }

  // Convert fields to their appropriate types with validation
}
