import { ITestimonial } from "@/types/testimonial";
import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema<ITestimonial>(
  {
    name: { type: String, required: true },
    subject: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    content: { type: String, required: true },
  },
  { timestamps: true }
);
const Testimonial: mongoose.Model<ITestimonial> =
  mongoose.models?.Testimonial ||
  mongoose.model<ITestimonial>("Testimonial", testimonialSchema);

export default Testimonial;
