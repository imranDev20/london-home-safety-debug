import { Pagination } from "./misc";
import {
  OrderType,
  PreOrderType,
  InvoiceData,
  PreOrderTypeForResponse,
  OrderTypeForResponse,
} from "./orders";
import { ITestimonial } from "./testimonial";
import {
  CustomerType,
  EngineerType,
  UserType,
  UserBasicInfoType,
  CustomerForResponseType,
} from "./users";

export type SuccessResponseWithArray<T> = {
  data: T[];
  success: true;
  message: string;
  pagination?: Pagination;
};

export type SuccessResponse<T> = {
  data: T;
  success: true;
  message: string;
};

export type ErrorResponse = {
  success: false;
  message: string;
};

export type GetTestimonialsResponse = SuccessResponseWithArray<ITestimonial>;

export type GetEngineersResponse = SuccessResponseWithArray<EngineerType<true>>;
export type GetEngineerDetailsResponse = SuccessResponse<EngineerType>;
export type GetCustomersResponse =
  SuccessResponseWithArray<CustomerForResponseType>;
export type AuthUserResponse = SuccessResponse<UserBasicInfoType>;

export type GetOrdersResponse = SuccessResponseWithArray<
  OrderTypeForResponse<UserType>
>;
export type GetOrderDetailsResponse = SuccessResponse<
  OrderTypeForResponse<UserType>
>;

export type PreOrderResponse = SuccessResponse<
  PreOrderTypeForResponse<UserType>
>;
export type CreateOrderResponse = SuccessResponse<OrderType<UserType>>;
export type UpdateOrderResponse = SuccessResponse<OrderType>;

export type DataLessResponse = SuccessResponse<undefined>;
