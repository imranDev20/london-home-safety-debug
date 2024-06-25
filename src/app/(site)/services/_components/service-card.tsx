import Image from "next/image";

import { Box, Button, Card, Typography } from "@mui/joy";

import Link from "next/link";
import {
  BACKGROUND_COLOUR,
  SECONDARY_COLOUR,
  TEXT_COLOR,
} from "@/shared/constants";
import { NavItem, NavLeafItem } from "@/types/misc";

export default function ServiceCard({ service }: { service: NavLeafItem }) {
  const { description, Icon, image, path, label, categoryPath } = service;
  const trimDeccription =
    description && description.length > 100
      ? `${description.slice(0, 100)}...`
      : description;

  return (
    <Box sx={{ mb: 2 }}>
      {image && (
        <Image
          src={image}
          objectFit="cover"
          alt="serviceImage"
          style={{ width: "100%", height: "100%", borderRadius: 10 }}
        />
      )}

      <Card
        variant="plain"
        sx={{
          mt: -10,
          ml: 2,
          mr: 2,
          p: 3,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          backgroundColor: BACKGROUND_COLOUR.level5,
          boxShadow: "xl",
          borderRadius: "lg",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 2,
          }}
        >
          {Icon && <Icon sx={{ fontSize: 50 }} color="primary" />}
        </Box>
        <Box sx={{ height: "100%" }}>
          <Typography
            level="h3"
            component="h3"
            sx={{
              textAlign: "center",
            }}
          >
            {label}
          </Typography>
          <Typography
            color="neutral"
            sx={{
              my: 2,
              overflow: "hidden",
              textAlign: "center",
            }}
          >
            {trimDeccription}
          </Typography>
        </Box>

        <Button
          variant="solid"
          color="primary"
          component={Link}
          href={`/services${categoryPath}${path}`}
          // endDecorator={<ArrowCircleRightIcon />}
          sx={{
            px: 2,
            display: "flex",
            alignItems: "center",
            ":hover": {
              backgroundColor: SECONDARY_COLOUR[500],
              color: TEXT_COLOR.primary,
            },
          }}
        >
          Learn More
        </Button>
      </Card>
    </Box>
  );
}
