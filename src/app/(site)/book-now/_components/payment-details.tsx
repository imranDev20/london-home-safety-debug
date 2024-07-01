import { FormEvent, useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Box, Button, Stack } from "@mui/joy";
import { useRouter, usePathname } from "next/navigation";
import { createPreOrder, getPreOrder } from "@/services/pre-order.services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PreOrderType, PaymentMethod } from "@/types/orders";
import { UserType } from "@/types/users";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types/response";
import { East, West } from "@mui/icons-material";
import { useSnackbar } from "@/app/_components/providers/snackbar-provider";
import { useQueryString } from "@/shared/hooks/use-query-string";

export default function PaymentDetails() {
  const [loading, setLoading] = useState<boolean>(false);
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const pathname = usePathname();
  const { enqueueSnackbar } = useSnackbar();
  const { createQueryString } = useQueryString();
  const queryClient = useQueryClient();

  const { data, isPending: isPreOrderDataPending } = useQuery({
    queryKey: ["pre-order"],
    queryFn: () => getPreOrder(),
  });
  const preOrderData = data?.data;

  // fetching pre - order data
  const { mutateAsync: preOrderMutate, isPending: isPreOrderMutatePending } =
    useMutation({
      mutationFn: async (preOrder: Partial<PreOrderType>) =>
        createPreOrder(preOrder),

      onSuccess: (response) => {
        queryClient.invalidateQueries({ queryKey: ["pre-order"] });
      },
      onError: (error: AxiosError<ErrorResponse>) => {
        enqueueSnackbar(
          error.response?.data.message || error?.message,
          "error"
        );
      },
    });

  // Stripe payment
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (!stripe || !elements) {
        throw new Error("stripe or elements isn't found");
      }

      if (!preOrderData?.personal_info || !preOrderData?.service_info) {
        throw new Error("Step data not found");
      }

      if (!preOrderData?.personal_info?.customer?._id) {
        throw new Error("Customer Id wasn't found");
      }

      setLoading(true);

      // first set the payment method in the pre-order
      const payload: PreOrderType = {
        service_info: preOrderData?.service_info,
        personal_info: {
          ...preOrderData?.personal_info,
          customer: preOrderData.personal_info.customer._id,
        },
        payment_info: {
          payment_method: "credit_card" as PaymentMethod,
        },
        status: "payment",
      };
      await preOrderMutate(payload);

      const response = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
        confirmParams: {
          return_url:
            window.location.origin +
            window.location.pathname +
            "?" +
            createQueryString("active_step", "5"),
          // receipt_email: order.email,
        },
      });

      setLoading(false);

      if (response.paymentIntent) {
        const status = response.paymentIntent.status;
        const { message, type } = getPaymentStatusInfo(status);
        queryClient.invalidateQueries({ queryKey: ["pre-order"] });

        router.replace(
          pathname +
            "?" +
            createQueryString("active_step", "4") +
            "&" +
            createQueryString("payment_intent", response.paymentIntent.id) +
            "&" +
            createQueryString(
              "payment_intent_client_secret",
              response.paymentIntent.client_secret as string
            ) +
            "&" +
            createQueryString("redirect_status", status)
        );
        enqueueSnackbar(message, type as any);
      }
    } catch (error: any) {
      enqueueSnackbar(error.message as string, "error");
    }
  };

  return (
    <Box
      component="form"
      sx={{
        mt: 5,
      }}
      onSubmit={handleSubmit}
    >
      <PaymentElement
        options={{
          defaultValues: {
            billingDetails: {
              email: preOrderData?.personal_info?.customer?.email,
              name: preOrderData?.personal_info?.customer.name,
              phone: preOrderData?.personal_info?.customer.phone,
              address: {
                country: "GB",
                city: "London",
                postal_code:
                  preOrderData?.personal_info?.customer?.address?.postcode,
                line1: preOrderData?.personal_info?.customer?.address?.street,
              },
            },
          },
        }}
      />

      <Stack
        sx={{
          mt: 5,
          width: "100%",
        }}
        direction="row"
        justifyContent="space-between"
      >
        <Button
          variant="solid"
          loadingPosition="end"
          size="lg"
          onClick={() =>
            router.push(pathname + "?" + createQueryString("active_step", "2"))
          }
          startDecorator={<West />}
        >
          Back
        </Button>
        <Button
          variant="solid"
          type="submit"
          disabled={isPreOrderDataPending}
          loading={loading}
          size="lg"
          endDecorator={<East />}
        >
          Proceed to Order
        </Button>
      </Stack>
    </Box>
  );
}

type Variant = "success" | "info" | "warning" | "danger";

function getPaymentStatusInfo(status: string): {
  message: string;
  type: Variant;
} {
  switch (status) {
    case "requires_payment_method":
      return { message: "Your payment method was not provided.", type: "info" };
    case "requires_confirmation":
      return { message: "Your payment requires confirmation.", type: "info" };
    case "requires_action":
      return {
        message: "Additional action is required to complete your payment.",
        type: "info",
      };
    case "processing":
      return { message: "Your payment is being processed.", type: "info" };
    case "requires_capture":
      return { message: "Your payment needs to be captured.", type: "info" };
    case "canceled":
      return { message: "Your payment was cancelled.", type: "danger" };
    case "succeeded":
      return { message: "Your payment was successful.", type: "success" };
    default:
      return { message: "An unknown error occurred.", type: "danger" };
  }
}

// http://localhost:3000/quote?payment_intent=pi_3OBcCZJZT84KLAtm0JExs2nR&payment_intent_client_secret=pi_3OBcCZJZT84KLAtm0JExs2nR_secret_4aIBn0NJlR0XPAPb9LDmABNWW&redirect_status=failed
