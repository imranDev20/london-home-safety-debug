"use client";
import { Box, Grid, Typography } from "@mui/joy";
import ScheduleInfo from "./schedule-info";
import { useSnackbar } from "@/app/_components/providers/snackbar-provider";
import ItemsAssigneeSelect from "./items-assignee-select";
import SendEmailEngineer from "./send-email-engineer";
import { UserType } from "@/types/users";
import { OrderTypeForResponse } from "@/types/orders";

export default function AssignedAndTimeInfo({
  orderDetails,
}: {
  orderDetails: OrderTypeForResponse<UserType>;
}) {
  const { enqueueSnackbar } = useSnackbar();

  if (!orderDetails) {
    return "no order data found";
  }

  return (
    <>
      <Grid container spacing={3} mt={3}>
        <Grid xs={12} md={9}>
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
              <Grid xs={8} md={4}>
                <ItemsAssigneeSelect />
              </Grid>

              <Grid xs={4} md={2}>
                <SendEmailEngineer />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid xs={12} md={3}>
          <ScheduleInfo />
        </Grid>
      </Grid>
    </>
  );
}
