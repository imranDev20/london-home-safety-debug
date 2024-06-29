"use client";
import Stepper from "@mui/joy/Stepper";
import Step from "@mui/joy/Step";
import StepButton from "@mui/joy/StepButton";
import StepIndicator from "@mui/joy/StepIndicator";
import Check from "@mui/icons-material/Check";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createQueryString } from "@/shared/functions";
import { useQuery } from "@tanstack/react-query";
import { getPreOrder } from "@/services/pre-order.services";

const steps = [
  {
    name: "Property Details",
    number: 1,
  },
  {
    name: "Personal Details",
    number: 2,
  },
  {
    name: "Complete Order",
    number: 3,
  },
];

export default function BookNowStepper() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const activeStep = parseInt(searchParams.get("active_step") as string) || 1;

  const { data, isPending: isPreOrderDataPending } = useQuery({
    queryKey: ["pre-order"],
    queryFn: () => getPreOrder(),
    retry: 1,
  });

  const preOrderData = data?.data;

  const handleStep = (stepNumber: number) => {
    router.push(
      pathname + "?" + createQueryString("active_step", stepNumber.toString()),
      { scroll: false }
    );
  };

  if (isPreOrderDataPending) {
    return "loading...";
  }

  return (
    <Stepper
      sx={{
        width: "100%",
        mb: 5,
        display: {
          xs: "none",
          md: "flex",
        },
      }}
    >
      {steps.map((step, index) => (
        <Step
          key={step.number}
          indicator={
            <StepIndicator
              variant={activeStep === index + 1 ? "solid" : "soft"}
              color="primary"
            >
              {activeStep > index + 1 ? <Check /> : index + 1}
            </StepIndicator>
          }
        >
          <StepButton
            disabled={
              (index === 1 &&
                activeStep < index + 1 &&
                !preOrderData?.service_info) ||
              (index === 2 &&
                activeStep < index + 1 &&
                !preOrderData?.personal_info)
            }
            onClick={() => handleStep(step.number)}
          >
            {step.name}
          </StepButton>
        </Step>
      ))}
    </Stepper>
  );
}
