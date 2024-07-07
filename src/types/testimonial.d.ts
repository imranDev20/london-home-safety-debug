import testimonialSchema from "@/app/(site)/_schemas/testimonial-schema";
import { Types } from "mongoose";
import { z } from "zod";

export interface ITestimonial {
  _id: Types.ObjectId;
  name: string;
  rating: number;
  content: string;
  subject: string;
}

export type TestimonialInput = z.infer<typeof testimonialSchema>;
