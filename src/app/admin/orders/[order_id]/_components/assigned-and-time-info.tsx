"use client";

import Box from "@mui/joy/Box";
import Grid from "@mui/joy/Grid";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";

import MailIcon from "@mui/icons-material/Mail";

import ScheduleInfo from "./schedule-info";
import ItemsAssigneeSelect from "./items-assignee-select";
import { OrderTypeForResponse } from "@/types/orders";
import { EngineerType, UserType } from "@/types/users";
import { useState } from "react";
import WriteEmail from "./write-email";

export default function AssignedAndTimeInfo({
  orderDetails,
}: {
  orderDetails: OrderTypeForResponse<UserType>;
}) {
  const [openEmailSendDialog, setOpenEmailSendDialog] =
    useState<boolean>(false);

  const [selectedEngineer, setSelectedEngineer] =
    useState<EngineerType<true> | null>(null);

  const handleSendEmailDialog = async () => {
    setOpenEmailSendDialog(true);
  };

  const handleClose = () => {
    setOpenEmailSendDialog(false);
  };

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
                <ItemsAssigneeSelect
                  selectedEngineer={selectedEngineer}
                  orderDetails={orderDetails}
                  setSelectedEngineer={setSelectedEngineer}
                />
              </Grid>

              <Grid xs={12} md={5} lg={3}>
                <Button
                  variant="outlined"
                  size="sm"
                  color="neutral"
                  startDecorator={<MailIcon />}
                  fullWidth
                  disabled={!selectedEngineer}
                  onClick={handleSendEmailDialog}
                >
                  Send Email
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid xs={12} md={3}>
          <ScheduleInfo orderDetails={orderDetails} />
        </Grid>
      </Grid>

      <WriteEmail
        open={openEmailSendDialog}
        onClose={handleClose}
        selectedEngineer={selectedEngineer}
        orderDetails={orderDetails}
      />
    </>
  );
}
