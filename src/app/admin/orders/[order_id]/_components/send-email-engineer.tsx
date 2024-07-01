import { Mail } from "@mui/icons-material";
import { Button } from "@mui/joy";
import React, { useState } from "react";
import WriteEmail from "./write-email";
import { Types } from "mongoose";
import { useQuery } from "@tanstack/react-query";
import { getUserDetails } from "@/services/user.services";
import { Assignment } from "./assigned-and-time-info";

export default function SendEmailEngineer() {
  const [openEmailSendDialog, setOpenEmailSendDialog] =
    useState<boolean>(false);

  // const {
  //   data: engineerDetails,
  //   isFetching: isGetEngineerDetailsFetching,
  //   isLoading: isGetEngineerDetailsLoading,
  //   refetch: refetchEngineers,
  // } = useQuery({
  //   queryKey: ["user-details", assignment.engineer],
  //   queryFn: () => getUserDetails(assignment.engineer as Types.ObjectId),
  //   enabled: false,
  // });

  const handleSendEmailDialog = async () => {
    // await refetchEngineers();
    setOpenEmailSendDialog(true);
  };

  const handleClose = () => {
    setOpenEmailSendDialog(false);
  };

  return (
    <div>
      {/* <Button
        variant="outlined"
        size="sm"
        color="neutral"
        startDecorator={<Mail />}
        fullWidth
        loading={isGetEngineerDetailsLoading || isGetEngineerDetailsFetching}
        onClick={handleSendEmailDialog}
      >
        Send Email
      </Button>

      {engineerDetails?.data && (
        <WriteEmail
          open={openEmailSendDialog}
          engineerDetails={engineerDetails?.data}
          onClose={handleClose}
          assignment={assignment}
        />
      )} */}
    </div>
  );
}
