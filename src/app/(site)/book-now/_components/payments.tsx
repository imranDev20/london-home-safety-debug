import Outcome from "./outcome";
import PaymentDetails from "./payment-details";
import { Elements } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";
import { Box, CircularProgress } from "@mui/joy";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { getPreOrder } from "@/services/pre-order.services";

export default function Payments() {
  const [stripePromise, setStripePromise] = useState<any>();
  const [clientSecret, setClientSecret] = useState("");
  const searchParams = useSearchParams();

  const activeStep = parseInt(searchParams.get("active_step") as string) || 1;

  const {
    data: preOrderData,
    isPending: isPreOrderDataPending,
    refetch: refetchPreOrder,
  } = useQuery({
    queryKey: ["pre-order"],
    queryFn: () => getPreOrder(),
  });

  useEffect(() => {
    const fetchKey = async () => {
      try {
        const response = await axios.get("/api/config");
        setStripePromise(loadStripe(response.data.publishableKey));
      } catch (error) {
        console.log(error);
      }
    };

    fetchKey();
  }, []);

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const orderPayload = {
          ...preOrderData,
        };

        const response = await axios.post(
          "/api/create-payment-intent",
          orderPayload
        );

        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.log(error);
      }
    };

    fetchClientSecret();
  }, [preOrderData]);

  if (!stripePromise || !clientSecret) {
    return (
      <Box
        sx={{
          display: "flex",
          mt: 5,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress
          thickness={4}
          sx={{ "--CircularProgress-size": "40px" }}
        />
      </Box>
    );
  }

  return (
    <>
      {stripePromise && clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            loader: "always",
            appearance: {
              theme: "stripe",
              labels: "above",
            },
          }}
        >
          {activeStep === 3 ? <PaymentDetails /> : null}
          {activeStep === 4 ? <Outcome /> : null}
        </Elements>
      )}
    </>
  );
}
