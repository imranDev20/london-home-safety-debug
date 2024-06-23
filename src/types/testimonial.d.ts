import { Types } from "mongoose";

export interface ITestimonial {
  _id: Types.ObjectId;
  name: string;
  rating: number;
  content: string;
  subject: string;
}

export type TestimonialInput = Omit<ITestimonial, "_id">;
