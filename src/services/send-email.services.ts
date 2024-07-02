import { DataLessResponse } from "@/types/response";
import http from "./http.services";
import { SendEmailToEngineerData } from "@/types/misc";

const SEND_EMAIL_PATH: string = "/send-email";

export const sendEmailToEngineer = async (
  emailData: SendEmailToEngineerData
): Promise<DataLessResponse> => {
  const response: DataLessResponse = await http.post(
    `${SEND_EMAIL_PATH}/engineer`,
    emailData
  );
  return response;
};
