import { customSlugify } from "@/shared/functions";
import { SvgIconProps } from "@mui/joy/SvgIcon/SvgIconProps";
import Card from "@mui/joy/Card";
import JoyLink from "@mui/joy/Link";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";

import Link from "next/link";
import React from "react";
import { PRIMARY_COLOUR } from "@/shared/constants";

interface ServiceProps {
  service: {
    id: number;
    serviceName: string;
    serviceDetail: string;
    Icon: React.ComponentType<SvgIconProps>;
  };
}

export default function ServiceCategoryCard({ service }: ServiceProps) {
  return (
    <JoyLink
      component={Link}
      href={`/services/${customSlugify(service.serviceName)}`}
      underline="none"
    >
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
        <Stack direction="row" spacing={1}>
          <service.Icon
            sx={{
              fontSize: 100,
            }}
            color="primary"
          />
          <Stack>
            <Typography
              level="h3"
              sx={{
                mb: 2,
              }}
            >
              {service.serviceName}
            </Typography>
            <Typography color="neutral">{service.serviceDetail}</Typography>
          </Stack>
        </Stack>
      </Card>
    </JoyLink>
  );
}
