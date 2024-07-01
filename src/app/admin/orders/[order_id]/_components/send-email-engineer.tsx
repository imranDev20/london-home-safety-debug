import { Mail } from "@mui/icons-material";
import { Button } from "@mui/joy";
import React, { useState } from "react";
import WriteEmail from "./write-email";

export default function SendEmailEngineer() {
  const [openEmailSendDialog, setOpenEmailSendDialog] =
    useState<boolean>(false);

  const handleSendEmailDialog = async () => {
    // await refetchEngineers();
    setOpenEmailSendDialog(true);
  };

  const handleClose = () => {
    setOpenEmailSendDialog(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        size="sm"
        color="neutral"
        startDecorator={<Mail />}
        fullWidth
        onClick={handleSendEmailDialog}
      >
        Send Email
      </Button>
      <WriteEmail open={openEmailSendDialog} onClose={handleClose} />
    </div>
  );
}
