import { Pagination } from "./misc";
import { OrderType, PreOrderType, InvoiceData } from "./orders";
import { ITestimonial } from "./testimonial";
import {
  CustomerType,
  EngineerType,
  UserType,
  UserBasicInfoType,
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

export type GetEngineersResponse = SuccessResponseWithArray<EngineerType>;
export type GetEngineerDetailsResponse = SuccessResponse<EngineerType>;
export type GetCustomersResponse = SuccessResponseWithArray<CustomerType>;
export type AuthUserResponse = SuccessResponse<UserBasicInfoType>;

export type GetOrdersResponse = SuccessResponseWithArray<
  OrderType<false, UserType>
>;
export type GetOrderDetailsResponse = SuccessResponse<
  OrderType<true, UserType>
>;

export type PreOrderResponse = SuccessResponse<PreOrderType<true, UserType>>;
export type CreateOrderResponse = SuccessResponse<OrderType<false, UserType>>;
export type UpdateOrderResponse = SuccessResponse<OrderType>;

export type DataLessResponse = SuccessResponse<undefined>;
