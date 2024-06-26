import { customSlugify } from "@/shared/functions";
import { SvgIconProps } from "@mui/joy/SvgIcon/SvgIconProps";
import Card from "@mui/joy/Card";
import JoyLink from "@mui/joy/Link";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";

import Link from "next/link";
import React from "react";
import { PRIMARY_COLOUR } from "@/shared/constants";
import { NavItem } from "@/types/misc";

export default function ServiceCategoryCard({ service }: { service: NavItem }) {
  const { path, Icon, label, description } = service;

  return (
    <JoyLink component={Link} href={`/services${path}`} underline="none">
      <Card
        variant="plain"
        sx={{
          p: 4,
          borderRadius: "xl",
          transition: "350ms all ease",
          backgroundColor: "white",
          boxShadow: "md",
          ":hover": {
            backgroundColor: PRIMARY_COLOUR[500],
            ".MuiTypography-root": {
              color: "white",
            },
            ".MuiSvgIcon-root": {
              color: "white",
            },
          },
        }}
      >
        <Stack direction="row" spacing={3}>
          {Icon && (
            <Icon
              sx={{
                fontSize: 75,
              }}
              color="primary"
            />
          )}
          <Stack>
            <Typography
              level="h3"
              sx={{
                mb: 2,
              }}
            >
              {label}
            </Typography>
            <Typography color="neutral">{description}</Typography>
          </Stack>
        </Stack>
      </Card>
    </JoyLink>
  );
}
