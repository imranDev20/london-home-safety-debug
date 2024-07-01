"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/joy";
import { AddRounded, Check } from "@mui/icons-material";

import ScheduleInfo from "./schedule-info";
import { OrderType } from "@/types/orders";
import { Types } from "mongoose";
import useOrderDetails from "@/shared/hooks/use-order-details";
import useUpdateOrderDetails from "@/shared/hooks/use-update-order-details";
import { useSnackbar } from "@/app/_components/providers/snackbar-provider";
import ItemsAssigneeSelect from "./items-assignee-select";
import SendEmailEngineer from "./send-email-engineer";

export type Assignment = {
  id: number;
  engineer: Types.ObjectId | "";
  tasks: Types.ObjectId[];
  isEmailSent: boolean;
};

interface TaskWithEngineers {
  task: Types.ObjectId;
  engineers: Types.ObjectId[];
}

const assignment: Assignment = {
  id: 1,
  engineer: "",
  tasks: [],
  isEmailSent: false,
};

export default function AssignedAndTimeInfo() {
  const { orderDetails } = useOrderDetails();
  const [assignments, setAssignments] = useState([assignment]);
  const { updateOrderMutate, isPending: isUpdateOrderDetailsPending } =
    useUpdateOrderDetails();

  const { enqueueSnackbar } = useSnackbar();

  if (!orderDetails) {
    return "Loading...";
  }

  return (
    <>
      <Grid container spacing={3} mt={3}>
        <Grid md={9}>
          <Box
            sx={{
              width: "100%",
            }}
          >
            <Typography
              level="title-lg"
              sx={{
                mb: 2,
              }}
            >
              Assignment Info
            </Typography>

            <Grid container spacing={2}>
              <Grid md={4}>{/* <ItemsAssigneeSelect /> */}</Grid>

              <Grid md={2}>
                <SendEmailEngineer />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid md={3}>
          <ScheduleInfo />
        </Grid>
      </Grid>
    </>
  );
}
