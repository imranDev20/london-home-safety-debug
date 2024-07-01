import { buildUrl } from "@/shared/functions";
import http from "./http.services";
import {
  DataLessResponse,
  CreateOrderResponse,
  GetOrderDetailsResponse,
  GetOrdersResponse,
  UpdateOrderResponse,
} from "@/types/response";
import { OrderType, OrderTypeForResponse } from "@/types/orders";
import { Types } from "mongoose";

const ORDERS_PATH = "/orders";

export const getOrders = async (
  q?: string,
  order_status?: string,
  assigned_to?: string,
  sort_by?: string,
  sort_order?: string,
  page?: string
): Promise<GetOrdersResponse> => {
  const url = buildUrl(ORDERS_PATH, {
    q,
    order_status,
    assigned_to,
    sort_by,
    sort_order,
    page,
  });

  const response: GetOrdersResponse = await http.get(url);
  return response;
};

export const getOrderDetails = async (
  orderId: string
): Promise<GetOrderDetailsResponse> => {
  const response: GetOrderDetailsResponse = await http.get(
    `${ORDERS_PATH}/${orderId}`
  );
  return response;
};

export const createOrder = async (
  preOrderId: string
): Promise<CreateOrderResponse> => {
  const response: CreateOrderResponse = await http.post(`${ORDERS_PATH}`, {
    pre_order_id: preOrderId,
  });
  return response;
};

export const updateOrder = async (
  orderData: OrderTypeForResponse
): Promise<UpdateOrderResponse> => {
  const response: UpdateOrderResponse = await http.patch(
    `${ORDERS_PATH}/${orderData._id}`,
    orderData
  );
  return response;
};

// Not using params to keep delete bulk functionality
export const deleteOrders = async (
  ids: string[]
): Promise<DataLessResponse> => {
  const response: DataLessResponse = await http.post(`${ORDERS_PATH}`, {
    ids,
  });
  return response;
};

export const exportOrders = async () => {
  const response = await http.get(`/orders/export`);
  return response.data;
};

export const getOrderInvoice = async (orderId: Types.ObjectId) => {
  const response = await http.get(`${ORDERS_PATH}/invoice/${orderId}`);
  return response.data;
};
