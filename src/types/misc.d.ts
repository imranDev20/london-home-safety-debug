import SvgIcon from "@mui/joy/SvgIcon";
import { StaticImageData } from "next/image";
import { Dispatch, SetStateAction } from "react";

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
};

export type NavLeafItem = Omit<NavItem, "children"> & {
  categoryPath?: string;
};
