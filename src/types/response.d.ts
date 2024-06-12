import { Pagination } from "./misc";
import { IOrder, IPreOrder, InvoiceData } from "./orders";
import { ITestimonial } from "./testimonial";
import { ICustomer, IEngineer, IUser, IUserBasicInfo } from "./user";

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

export type GetEngineersResponse = SuccessResponseWithArray<IEngineer>;
export type GetEngineerDetailsResponse = SuccessResponse<IEngineer>;
export type GetCustomersResponse = SuccessResponseWithArray<ICustomer>;
export type AuthUserResponse = SuccessResponse<IUserBasicInfo>;

export type GetOrdersResponse = SuccessResponseWithArray<IOrder<IUser>>;
export type GetOrderDetailsResponse = SuccessResponse<IOrder<IUser>>;

export type PreOrderResponse = SuccessResponse<Partial<IPreOrder<IUser>>>;
export type CreateOrderResponse = SuccessResponse<IOrder<IUser>>;
export type UpdateOrderResponse = SuccessResponse<IOrder>;

export type DataLessResponse = SuccessResponse<undefined>;
