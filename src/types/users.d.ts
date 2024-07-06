import { Types } from "mongoose";
import { OrderType } from "./orders";

export type Role = "customer" | "engineer" | "admin";
export type CreationMethod = "registration" | "by_admin" | "through_order";

export type UserType<HasId extends boolean = false> = {
  _id: HasId extends true ? Types.ObjectId : never;
  name: string;
  email: string;
  email_verified: boolean;
  phone: string;
  role: Role;
  password: string;

  provider: "credentials" | "google";

  address: {
    city: string;
    street: string;
    postcode: string;
  };

  preferences: {
    mode: "light" | "dark";
  };

  skills?: string[];
  specialty?: string;
  experience?: number;
  creation_method: CreationMethod;
  createdAt: string;
};

export type EngineerType<HasId extends boolean = false> = Omit<
  UserType<HasId>,
  "orders_placed"
> & {
  role: "engineer";
  orders_received: OrderType[];
  skills: string[];
  specialty: string;
  experience: number;
};

export type CustomerType = Omit<
  UserType,
  "orders_received" | "skills" | "specialty" | "experience"
> & {
  role: "customer";
  orders_placed: OrderType[];
};

export type CustomerForResponseType = CustomerType & {
  _id: Types.ObjectId;
};

type UserBasicInfoType = Pick<UserType, "_id" | "name" | "email" | "role">;
