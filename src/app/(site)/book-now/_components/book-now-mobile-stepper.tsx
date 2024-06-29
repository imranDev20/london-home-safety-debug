"use client";
import { CircularProgress, Stack, Typography, useTheme } from "@mui/joy";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

function BookNowMobileStepperComponent() {
  const searchParams = useSearchParams();
  const activeStep = parseInt(searchParams.get("active_step") as string) || 1;
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      spacing={3}
      alignItems="center"
      sx={{
        mb: 3,
        display: {
          xs: "flex",
          md: "none",
        },
      }}
    >
      <CircularProgress
        sx={{
          "--CircularProgress-trackColor": theme.palette.secondary[200],
          "--CircularProgress-size": "60px",
        }}
        determinate
        value={100 / (4 - activeStep)}
      >
        {activeStep} / 3
      </CircularProgress>

      <Stack justifyContent="center">
        <Typography fontWeight={600} fontSize={24}>
          {activeStep === 1 && "Property Details"}
          {activeStep === 2 && "Confirmation & Payment"}
          {activeStep === 3 && "Confirmation & Payment"}
        </Typography>

        <Typography fontWeight={500} fontSize={16} color="neutral">
          {activeStep === 1 && "Next: Personal Details"}
          {activeStep === 2 && "Next: Confirmation & Payment"}
          {activeStep === 3 && "Next: Complete Order"}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default function BookNowMobileStepper() {
  return (
    <Suspense>
      <BookNowMobileStepperComponent />
    </Suspense>
  );
}
