import http from "./http.services";
import { buildUrl } from "@/shared/functions";
import {
  GetCustomersResponse,
  GetEngineerDetailsResponse,
  GetEngineersResponse,
} from "@/types/response";
import { Types } from "mongoose";

const USERS_PATH: string = "/users";

// setting up different types based on the user role
export const getUsers = async <T extends "engineer" | "customer">(
  q?: string,
  role?: T,
  sort_by?: string,
  sort_order?: string,
  page?: string
): Promise<
  T extends "engineer" ? GetEngineersResponse : GetCustomersResponse
> => {
  const url = buildUrl(USERS_PATH, {
    q,
    role,
    sort_by,
    sort_order,
    page,
  });

  const response: T extends "engineer"
    ? GetEngineersResponse
    : GetCustomersResponse = await http.get(url);
  return response;
};

export const getUserDetails = async (
  userId: Types.ObjectId
): Promise<GetEngineerDetailsResponse> => {
  const response: GetEngineerDetailsResponse = await http.get(
    `${USERS_PATH}/${userId}`
  );
  return response;
};

export const createUser = async (userData: any) => {
  const response = await http.post(USERS_PATH, userData);
  return response.data;
};

export const updateUser = async (
  preOrderId: string | undefined,
  updatedData: any
) => {
  const response = await http.patch(`/pre-order/${preOrderId}`, updatedData);
  return response.data;
};

export const deleteUser = async (preOrderId: string) => {
  const response = await http.delete(`/pre-order/${preOrderId}`);
  return response.data;
};

export const exportUsers = async () => {
  const response = await http.get(`/users/export`);
  return response.data;
};
