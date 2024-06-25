"use client";
import { Box, Button } from "@mui/joy";
import React from "react";
import TestimonialForm from "./testimonial-form";
import { SECONDARY_COLOUR, TEXT_COLOR } from "@/shared/constants";

export default function TestimonialModal() {
  const [openModal, setOpenModal] = React.useState<boolean>(false);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 10,
      }}
    >
      <Button
        size="lg"
        variant="solid"
        onClick={() => setOpenModal(true)}
        sx={{
          ":hover": {
            backgroundColor: SECONDARY_COLOUR[500],
            color: TEXT_COLOR.primary,
          },
        }}
      >
        Leave a Testimonial
      </Button>
      <TestimonialForm openModal={openModal} setOpenModal={setOpenModal} />
    </Box>
  );
}
