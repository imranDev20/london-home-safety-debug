import { Document, Types } from "mongoose";
import { UserType } from "./users";

export type PropertyType = "residential" | "commercial";
export type ResidentType<T extends PropertyType> = T extends "residential"
  ? "house" | "flat" | "hmo"
  : null;

export type ParkingType = "free" | "paid" | "unavailable";
export type ZoneType = "congestion" | "non_congestion";
export type PreOrderStepStatus = "service" | "personal" | "payment";

export type BedroomsType<T extends PropertyType> = T extends "residential"
  ? number
  : null;

export type PaymentMethod =
  | "bank_transfer"
  | "credit_card"
  | "cash_to_engineer";

export type OrderStatus = {
  _id?: string;
  status:
    | "pending_payment"
    | "payment_completed"
    | "awaiting_confirmation"
    | "order_confirmed"
    | "engineer_en_route"
    | "work_in_progress"
    | "work_completed"
    | "completed"
    | "cancelled";
  timestamp: Date;
};

export type OrderStatusValues = Pick<OrderStatus, "status">[keyof Pick<
  OrderStatus,
  "status"
>];

export type OrderItemType = {
  name: string;
  price: number;
  quantity: number;
  unit: string;
  title: string;
};

export type OrderItemForResponseType = OrderItemType & {
  _id: Types.ObjectId;
};

export type OrderItemWithEngineerType = OrderItemType & {
  assigned_engineer: Types.ObjectId;
};

export type OrderItemWithEngineerForResponseType = OrderItemWithEngineerType & {
  _id: Types.ObjectId;
};

export type PreOrderType<T extends UserType | undefined = undefined> = {
  service_info: {
    property_type: PropertyType;
    resident_type?: ResidentType<PropertyType>;
    bedrooms?: BedroomsType<PropertyType>;
    order_items: OrderItemType[];
  };
  personal_info?: {
    customer: T extends UserType ? Partial<UserType> : Types.ObjectId;
    parking_options: {
      parking_type: ParkingType;
      parking_cost: number;
    };
    congestion_zone: {
      zone_type: ZoneType;
      zone_cost: number;
    };
    inspection_date: Date;
    inspection_time: string;
    order_notes?: string;
  };
  payment_info?: {
    payment_method: PaymentMethod;
  };
  status: PreOrderStepStatus;
  createdAt?: Date;
  updatedAt?: Date;
};

export type PreOrderTypeForResponse<
  T extends UserType | undefined = undefined
> = PreOrderType<T> & {
  _id: Types.ObjectId;
};

export type OrderType<T extends UserType | undefined = undefined> = {
  property_type: PropertyType;
  resident_type?: ResidentType<PropertyType>;
  bedrooms?: BedroomsType<PropertyType>;
  order_items: OrderItemWithEngineerType[]; // Changed here
  customer: T extends UserType ? Partial<UserType> : Types.ObjectId;
  parking_options: {
    parking_type: ParkingType;
    parking_cost: number;
  };
  congestion_zone: {
    zone_type: ZoneType;
    zone_cost: number;
  };
  inspection_date: Date;
  inspection_time: string;
  order_notes?: string;
  payment_method: PaymentMethod;
  order_status: OrderStatus[];
  remaining_amount: number;
  paid_amount: number;
  invoice_id: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type OrderTypeForResponse<T extends UserType | undefined = undefined> =
  OrderType<T> & {
    _id: Types.ObjectId;
  };

export type InvoiceData = {
  data: string;
};
