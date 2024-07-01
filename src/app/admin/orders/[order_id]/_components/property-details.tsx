"use client";
import { CONGESTION_ZONE_OPTIONS, PARKING_OPTIONS } from "@/shared/data";
import useOrderDetails from "@/shared/hooks/use-order-details";
import useUpdateOrderDetails from "@/shared/hooks/use-update-order-details";
import {
  Apartment,
  ApartmentOutlined,
  BedOutlined,
  Close,
  DirectionsCarOutlined,
  Done,
  Edit,
  HomeOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/joy";
import React, { useState } from "react";

export default function PropertyDetails() {
  const { orderDetails } = useOrderDetails();

  const { updateOrderMutate, isPending: isUpdateOrderPending } =
    useUpdateOrderDetails();

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
        Property Details
      </Typography>

      <Card>
        <CardContent orientation="vertical">
          <Stack spacing={2}>
            <Stack direction="row" spacing={1} alignItems="center">
              <HomeOutlined
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
                {orderDetails.property_type}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1}>
              <ApartmentOutlined
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
                {orderDetails.resident_type || "N/A"}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1}>
              <BedOutlined
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
                {orderDetails.bedrooms === 0
                  ? "Studio Flat"
                  : orderDetails.bedrooms === 1
                  ? "bedroom"
                  : "bedrooms"}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1}>
              <DirectionsCarOutlined
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
                {
                  PARKING_OPTIONS.find(
                    (option) =>
                      option.value === orderDetails.parking_options.parking_type
                  )?.name
                }
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1}>
              {/* <CongestionChargeIcon
                sx={{
                  fontSize: 20,
                }}
              /> */}
              <Typography
                level="title-sm"
                sx={{
                  textTransform: "capitalize",
                }}
              >
                {
                  CONGESTION_ZONE_OPTIONS.find(
                    (option) =>
                      option.value === orderDetails.congestion_zone.zone_type
                  )?.nameAlt
                }
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
