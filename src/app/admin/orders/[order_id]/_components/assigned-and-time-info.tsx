"use client";
import { Box, Grid, Typography } from "@mui/joy";
import ScheduleInfo from "./schedule-info";
import ItemsAssigneeSelect from "./items-assignee-select";
import SendEmailEngineer from "./send-email-engineer";
import { OrderTypeForResponse } from "@/types/orders";
import { UserType } from "@/types/users";

export default function AssignedAndTimeInfo({
  orderDetails,
}: {
  orderDetails: OrderTypeForResponse<UserType>;
}) {
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
              <Grid xs={12} md={6} lg={6}>
                <ItemsAssigneeSelect orderDetails={orderDetails} />
              </Grid>

              <Grid xs={12} md={5} lg={3}>
                <SendEmailEngineer />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid xs={12} md={3}>
          <ScheduleInfo orderDetails={orderDetails} />
        </Grid>
      </Grid>
    </>
  );
}
