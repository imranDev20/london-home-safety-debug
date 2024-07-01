"use client";
import React from "react";
import { Breadcrumbs, Link as JoyLink, Typography, useTheme } from "@mui/joy";
import { Home, KeyboardArrowRight } from "@mui/icons-material";
import Link from "next/link";

interface BreadcrumbProps {
  items: {
    label: string;
    href?: string;
    isActive?: boolean;
  }[];
}

export default function CustomBreadcrumb(props: BreadcrumbProps) {
  const { items } = props;
  const theme = useTheme();

  return (
    <Breadcrumbs
      sx={{
        px: 0,
        fontSize: 13,
      }}
      separator={<KeyboardArrowRight />}
    >
      <JoyLink
        component={Link}
        color="neutral"
        href="/admin/"
        sx={{
          color: theme.palette.text.primary,
          textDecoration: "none",
        }}
      >
        <Home />
      </JoyLink>
      {items.map((item) => (
        <React.Fragment key={item.label}>
          {item.href && (
            <JoyLink
              component={Link}
              color="neutral"
              href={item.href}
              sx={{
                textDecoration: "none",
                fontSize: 13,
              }}
            >
              {item.label}
            </JoyLink>
          )}

          {!item.href && (
            <Typography
              color="primary"
              sx={{
                textDecoration: "none",
                fontWeight: 500,
                fontSize: 13,
              }}
            >
              {item.label}
            </Typography>
          )}
        </React.Fragment>
      ))}
    </Breadcrumbs>
  );
}
