import { Types } from "mongoose";
import { IOrder } from "./orders";
import { Document } from "mongoose";

export type Role = "customer" | "engineer" | "admin";
export type CreationMethod = "registration" | "by_admin" | "through_order";

export interface IUser extends Pick<Document, "_id"> {
  name: string;
  email: string;
  phone: string;
  role: Role;
  password: string;
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
}

export interface IEngineer extends Omit<IUser, "orders_placed"> {
  role: "engineer";
  orders_received: IOrder[];
  skills: string[];
  specialty: string;
  experience: number;
}

export interface ICustomer
  extends Omit<
    IUser,
    "orders_received" | "skills" | "specialty" | "experience"
  > {
  role: "customer";
  orders_placed: IOrder[];
}

export interface IUserBasicInfo
  extends Pick<IUser, "_id" | "name" | "email" | "role"> {}
