"use client";
import { Card, CardContent } from "@mui/joy";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import ServiceDetails from "./service-details";
import PersonalDetails from "./personal-details";
import Confirmation from "./confirmation";

function BookNowFormsComponent() {
  const searchParams = useSearchParams();
  const activeStep = parseInt(searchParams.get("active_step") as string) || 1;

  return (
    <Card
      variant="plain"
      size="lg"
      sx={{
        boxShadow: "md",
      }}
    >
      <CardContent>
        {activeStep === 1 || Number.isNaN(activeStep) ? (
          <ServiceDetails />
        ) : null}

        {activeStep === 2 ? <PersonalDetails /> : null}
        {activeStep === 3 || activeStep === 4 ? <Confirmation /> : null}
      </CardContent>
    </Card>
  );
}

export default function BookNowForms() {
  return (
    <Suspense>
      <BookNowFormsComponent />
    </Suspense>
  );
}
