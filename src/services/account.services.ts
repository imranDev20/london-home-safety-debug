import { LoginPayload } from "@/types/account";
import { AuthUserResponse, DataLessResponse } from "@/types/response";
import http from "./http.services";

const ACCOUNT_PATH = "/account";

type RegisterPayload = {};

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
  loginData: LoginPayload
): Promise<AuthUserResponse> => {
  const response: AuthUserResponse = await http.post(
    `${ACCOUNT_PATH}/login`,
    loginData
  );
  return response;
};

export const logoutAccount = async (): Promise<DataLessResponse> => {
  const response: DataLessResponse = await http.post(`${ACCOUNT_PATH}/logout`);
  return response;
};

export const getCurrentAccount = async (): Promise<AuthUserResponse> => {
  const response: AuthUserResponse = await http.get(`${ACCOUNT_PATH}/me`);
  return response;
};
