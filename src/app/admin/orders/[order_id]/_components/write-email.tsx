import Box from "@mui/joy/Box";
import ModalClose from "@mui/joy/ModalClose";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Textarea from "@mui/joy/Textarea";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import Input from "@mui/joy/Input";

import { EMAIL_ADDRESS } from "@/shared/data";
import { forwardRef, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { sendEmailToEngineer } from "@/services/send-email.services";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types/response";
import { useSnackbar } from "@/app/_components/providers/snackbar-provider";
import { EngineerType, UserType } from "@/types/users";
import { OrderTypeForResponse } from "@/types/orders";
import { SendEmailToEngineerData } from "@/types/misc";

interface WriteEmailProps {
  open?: boolean;
  onClose?: () => void;
  selectedEngineer: EngineerType<true> | null;
  orderDetails: OrderTypeForResponse<UserType>;
}

const WriteEmail = forwardRef<HTMLDivElement, WriteEmailProps>(
  function WriteEmail({ open, onClose, selectedEngineer, orderDetails }, ref) {
    const [receiver, setReceiver] = useState<string>("");
    const [emailContent, setEmailContent] = useState<string>("");
    const [emailSubject, setEmailSubject] = useState<string>("");
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
      if (selectedEngineer && orderDetails) {
        setReceiver(selectedEngineer.email);
        setEmailSubject(
          `New Job Alert: Service Order ${orderDetails.invoice_id}`
        );
      }
    }, [selectedEngineer, open, orderDetails]);

    const { isPending: isSendEmailPending, mutateAsync: sendEmailMutate } =
      useMutation({
        mutationFn: (data: any) => sendEmailToEngineer(data),
        onSuccess: (response) => {
          enqueueSnackbar(response.message, "success");
          if (onClose) {
            onClose();
          }
        },
        onError: (error: AxiosError<ErrorResponse>) => {
          enqueueSnackbar(
            error.response?.data.message || error.message,
            "error"
          );
        },
      });

    const handleSendEmailToEngineer = async () => {
      if (!selectedEngineer) {
        console.log("You haven't selected any engineer");
        return;
      }

      const payload: SendEmailToEngineerData = {
        engineer: selectedEngineer,
        content: emailContent,
        subject: emailSubject,
        orderDetails: orderDetails,
        receiver,
      };

      await sendEmailMutate(payload);
      setEmailContent("");
    };

    return (
      <Sheet
        ref={ref}
        sx={{
          alignItems: "center",
          px: 1.5,
          py: 1.5,
          ml: "auto",
          width: { xs: "calc(100dvw - 48px)", md: 600 },
          flexGrow: 1,
          border: "1px solid",
          borderRadius: "8px 8px 0 0",
          backgroundColor: "background.level1",
          borderColor: "neutral.outlinedBorder",
          boxShadow: "lg",
          zIndex: 1000,
          position: "fixed",
          bottom: 0,
          right: 24,
          transform: open ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.3s ease",
        }}
      >
        <Box sx={{ mb: 2 }}>
          <Typography level="title-sm">New message</Typography>
          <ModalClose id="close-icon" onClick={onClose} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            flexShrink: 0,
          }}
        >
          <FormControl>
            <FormLabel>To</FormLabel>
            <Input
              placeholder="Please type engineer's email"
              aria-label="Message"
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>CC</FormLabel>
            <Input
              disabled
              placeholder="email@email.com"
              value={EMAIL_ADDRESS}
              aria-label="Message"
            />
          </FormControl>
          <Input
            placeholder="Subject"
            aria-label="Message"
            value={emailSubject}
            onChange={(e) => setEmailSubject(e.target.value)}
          />
          <FormControl
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Textarea
              placeholder="Type your message here…"
              aria-label="Message"
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              minRows={8}
              endDecorator={
                <Stack
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="center"
                  flexGrow={1}
                  sx={{
                    py: 1,
                    pr: 1,
                    borderTop: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Button
                    color="primary"
                    sx={{ borderRadius: "sm" }}
                    onClick={handleSendEmailToEngineer}
                    loading={isSendEmailPending}
                  >
                    Send
                  </Button>
                </Stack>
              }
              sx={{
                "& textarea:first-of-type": {
                  minHeight: 72,
                },
              }}
            />
          </FormControl>
        </Box>
      </Sheet>
    );
  }
);

export default WriteEmail;
