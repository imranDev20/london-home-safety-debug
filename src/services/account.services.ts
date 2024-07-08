import {
  ForgotPasswordInput,
  LoginFormInput,
  NewPasswordPayload,
  RegisterPayload,
} from "@/types/account";
import { AuthUserResponse, DataLessResponse } from "@/types/response";
import http from "./http.services";

const ACCOUNT_PATH = "/account";

export const registerAccount = async (
  registerData: RegisterPayload
): Promise<AuthUserResponse> => {
  const response: AuthUserResponse = await http.post(
    `${ACCOUNT_PATH}/register`,
    registerData
  );
  return response;
};

export const loginAccount = async (
  loginData: LoginFormInput
): Promise<AuthUserResponse> => {
  const response: AuthUserResponse = await http.post(
    `${ACCOUNT_PATH}/login`,
    loginData
  );
  return response;
};

export const resetPassword = async (
  resetData: ForgotPasswordInput
): Promise<DataLessResponse> => {
  const response: DataLessResponse = await http.post(
    `/send-email/reset-password`,
    resetData
  );
  return response;
};

export const verifyToken = async (token: string) => {
  const response: DataLessResponse = await http.get(
    `${ACCOUNT_PATH}/reset-password?token=${token}`
  );
  return response;
};

export const changePassword = async (payload: NewPasswordPayload) => {
  const response: DataLessResponse = await http.post(
    `${ACCOUNT_PATH}/reset-password`,
    payload
  );
  return response;
};
