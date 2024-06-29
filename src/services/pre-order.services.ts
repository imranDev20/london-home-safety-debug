import { PreOrderResponse } from "@/types/response";
import http from "./http.services";
import { PreOrderType } from "@/types/orders";
import { UserType } from "@/types/users";

export const getPreOrder = async (): Promise<PreOrderResponse> => {
  const response: PreOrderResponse = await http.get(`/pre-order`);
  return response;
};

export const createPreOrder = async <
  T extends UserType | undefined = undefined
>(
  preOrder: T extends UserType
    ? Partial<PreOrderType<false, UserType>>
    : Partial<PreOrderType<false>>
): Promise<PreOrderResponse> => {
  const response: PreOrderResponse = await http.post(`/pre-order`, preOrder);
  return response;
};

export const deletePreOrder = async (preOrderId: string) => {
  try {
    const response = await http.delete(`/pre-order/${preOrderId}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};
