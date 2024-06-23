"use client";
import { Box, Button } from "@mui/joy";
import React from "react";
import TestimonialForm from "./testimonial-form";

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
      <Button size="lg" variant="solid" onClick={() => setOpenModal(true)}>
        Leave a Testimonial
      </Button>
      <TestimonialForm openModal={openModal} setOpenModal={setOpenModal} />
    </Box>
  );
}
