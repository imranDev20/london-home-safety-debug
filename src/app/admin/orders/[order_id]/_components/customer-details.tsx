"use client";

import { OrderTypeForResponse } from "@/types/orders";
import { UserType } from "@/types/users";
import { MapOutlined, PhoneOutlined } from "@mui/icons-material";
import { Avatar, Box, Card, CardContent, Stack, Typography } from "@mui/joy";
import React from "react";

export default function CustomerDetails({
  orderDetails,
}: {
  orderDetails: OrderTypeForResponse<UserType>;
}) {
  if (!orderDetails) {
    return "Failed to load data...";
  }

  return (
    <Box>
      <Typography
        level="title-lg"
        sx={{
          mb: 2,
        }}
      >
        Customer Details
      </Typography>

      <Card>
        <CardContent orientation="vertical">
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar>{orderDetails?.customer?.name?.charAt(0)}</Avatar>

            <Stack>
              <Typography level="title-md">
                {orderDetails.customer?.name}
              </Typography>
              <Typography level="body-sm">
                {orderDetails.customer?.email}
              </Typography>
            </Stack>
          </Stack>

          <Stack spacing={2} mt={3}>
            <Stack direction="row" spacing={1} alignItems="center">
              <PhoneOutlined
                sx={{
                  fontSize: 20,
                }}
              />
              <Typography level="title-sm">
                {orderDetails.customer?.phone}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1}>
              <MapOutlined
                sx={{
                  fontSize: 20,
                }}
              />
              <Typography level="title-sm">
                {orderDetails?.customer?.address?.street},{" "}
                {orderDetails?.customer?.address?.city}{" "}
                {orderDetails?.customer?.address?.postcode}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
