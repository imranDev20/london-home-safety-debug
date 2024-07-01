"use client";

import { Box, Grid, Stack, Typography } from "@mui/joy";
import { OrderItemType } from "@/types/orders";

type OrderItemProps = {
  item: OrderItemType;
};

export default function OrderItem({ item }: OrderItemProps) {
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid xs={8}>
          <Stack spacing={0.5}>
            <Typography level="body-xs">Service Name</Typography>
            <Typography level="title-md">{item.name}</Typography>
          </Stack>
        </Grid>

        <Grid xs={2}>
          <Stack spacing={0.5}>
            <Typography level="body-xs">Quantity</Typography>
            <Typography level="title-md">
              {item.quantity} {item.unit}
            </Typography>
          </Stack>
        </Grid>

        <Grid xs={2}>
          <Stack spacing={0.5}>
            <Typography level="body-xs">Price</Typography>
            <Typography
              level="title-md"
              sx={{
                ml: 10,
              }}
            >
              £{item.price}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
