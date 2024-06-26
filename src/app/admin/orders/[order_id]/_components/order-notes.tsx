"use client";
import useOrderDetails from "@/shared/hooks/use-order-details";
import useUpdateOrderDetails from "@/shared/hooks/use-update-order-details";
import { OrderTypeForResponse } from "@/types/orders";
import { UserType } from "@/types/users";
import {
  Card,
  CardContent,
  IconButton,
  Stack,
  Textarea,
  Typography,
} from "@mui/joy";
import React, { useEffect, useState } from "react";

export default function OrderNotes({
  orderDetails,
}: {
  orderDetails: OrderTypeForResponse<UserType>;
}) {
  if (!orderDetails) {
    return "Failed to load data...";
  }

  return (
    <>
      <Typography
        level="title-lg"
        sx={{
          mb: 2,
        }}
      >
        Order Notes
      </Typography>

      <Card
        sx={{
          minHeight: 235,
        }}
      >
        <CardContent>
          <Typography level="body-sm" lineHeight={1.8}>
            {orderDetails?.order_notes?.length !== 0
              ? orderDetails.order_notes
              : "No notes from customer"}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
