"use client";
import { OrderTypeForResponse } from "@/types/orders";
import { UserType } from "@/types/users";
import { Event, Schedule } from "@mui/icons-material";
import { Card, CardContent, Stack, Typography } from "@mui/joy";
import dayjs from "dayjs";
import React from "react";

export default function ScheduleInfo({
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
        Schedule Info
      </Typography>

      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Event
                sx={{
                  fontSize: 20,
                }}
              />
              <Typography
                level="title-sm"
                sx={{
                  textTransform: "capitalize",
                }}
              >
                {dayjs(orderDetails.inspection_date).format("DD MMMM YYYY")}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              <Schedule
                sx={{
                  fontSize: 20,
                }}
              />
              <Typography
                level="title-sm"
                sx={{
                  textTransform: "capitalize",
                }}
              >
                {orderDetails.inspection_time}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}
