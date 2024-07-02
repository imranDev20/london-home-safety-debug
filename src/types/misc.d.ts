import SvgIcon from "@mui/joy/SvgIcon";
import { StaticImageData } from "next/image";
import { Dispatch, SetStateAction } from "react";
import { BedroomsType, OrderTypeForResponse } from "./orders";
import { EngineerType, UserType } from "./users";

// These are confirmed to be in use
export type Pagination = {
  currentPage: number;
  totalPages: number;
  totalCount: number;
};

export type ComponentUseStateProps<T> = {
  state?: T;
  setState?: Dispatch<SetStateAction<T>>;
};

export type ChildrenProp = {
  children: React.ReactNode;
};

export type NavItem = {
  label: string;
  path: string;
  children?: NavItem[];
  abbr?: string;
  Icon?: typeof SvgIcon;
  image?: StaticImageData;
  description?: string;
  detailedDesc?: {
    details: string;
    points: string[];
  };

  pricingDetails?: {
    type: string;
    unit: string;
    Icon: any;
    description: string;
    prices: {
      unitCount: string | number;
      price: number;
    }[];
  }[];

  pageContent?: {
    title: string;
    html: string;
  };

  faqs?: {
    ques: string;
    ans: string;
  }[];
};

export type NavLeafItem = Omit<NavItem, "children"> & {
  categoryPath?: string;
};

export type SendEmailToEngineerData = {
  engineer: EngineerType<true>;
  subject: string;
  content: string;
  receiver: string;
  orderDetails: OrderTypeForResponse<UserType>;
};
