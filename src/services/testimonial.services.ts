import { TestimonialInput } from "@/types/testimonial";
import http from "./http.services";
import { GetTestimonialsResponse } from "@/types/response";

export const getTestimonials = async (): Promise<GetTestimonialsResponse> => {
  const response: GetTestimonialsResponse = await http.get(`/testimonials`);
  return response;
};

export const createTestimonial = async (testimonialData: TestimonialInput) => {
  try {
    const response = await http.post(`/testimonials`, testimonialData);
    console.log(response);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export const updateTestimonials = async (
  preOrderId: string | undefined,
  updatedData: any
) => {
  try {
    const response = await http.patch(`/pre-order/${preOrderId}`, updatedData);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export const deletePreOrder = async (preOrderId: string) => {
  try {
    const response = await http.delete(`/pre-order/${preOrderId}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};
