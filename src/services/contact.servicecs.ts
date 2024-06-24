import { ContactFormInput } from "@/types/contact";
import http from "./http.services";
import { DataLessResponse } from "@/types/response";

const CONTACT_PATH = "/contact";

export const submitContactUsForm = async (
  contactFormData: ContactFormInput
): Promise<DataLessResponse> => {
  const response: DataLessResponse = await http.post(
    CONTACT_PATH,
    contactFormData
  );
  return response;
};
