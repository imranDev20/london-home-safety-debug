import { TypographyProps } from "@mui/joy";
import { StaticImageData } from "next/image";
import { ReactNode, ReactElement } from "react";
import { Faq, Service } from "./misc";

export type DrawerAppBarProps = {
  children: ReactNode;
};

export type HideOnScrollProps = {
  children: ReactElement;
};

export type PageHeaderProps = {
  backgroundImage: StaticImageData;
  title: string;
  secondary?: string;
  tertiary?: string;
};

export type ParagraphProps = TypographyProps & {
  lineHeight?: number;
  children: ReactNode;
};

export type HeadingProps = TypographyProps & {
  children: ReactNode;
  headingType?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

export type FaqAccordionProps = {
  faqs: Faq[];
};

export type ServiceCardProps = {
  service: Service;
};
