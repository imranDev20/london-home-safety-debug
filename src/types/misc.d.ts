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
