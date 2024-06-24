// schemas/testimonialSchema.js
import { z } from "zod";

const testimonialSchema = z.object({
  name: z.string().min(1, "Name is required"),
  subject: z.string().min(1, "Subject is required"),
  rating: z.number().min(1, "Rating is required"),
  content: z.string().min(1, "Description is required"),
});

export default testimonialSchema;
