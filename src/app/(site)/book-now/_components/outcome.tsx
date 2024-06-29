import Lottie from "lottie-react";
import successAnimation from "@/assets/success-animation.json";
import errorAnimation from "@/assets/error-animation-2.json";
import { Box, Button, Typography } from "@mui/joy";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { createQueryString } from "@/shared/functions";
import { useEffect, useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";

export default function Outcome() {
  const stripe = useStripe();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [message, setMessage] = useState<null | {
    status: string;
    text: string;
  }>(null);

  const pathname = usePathname();
  const [info, setInfo] = useState({
    email: "",
    id: "",
  });

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = searchParams.get("payment_intent_client_secret");

    const fetchIntent = async () => {
      try {
        const response = await stripe.retrievePaymentIntent(clientSecret!);
        const { paymentIntent } = response;
        setInfo({
          email: response.paymentIntent?.receipt_email!,
          id: response.paymentIntent?.id!,
        });

        if (!paymentIntent) {
          console.log("Payment intent wasn't found");
          return;
        }

        switch (paymentIntent.status) {
          case "succeeded":
            setMessage({
              status: paymentIntent.status,
              text: "Success! Payment received.",
            });
            break;

          case "processing":
            setMessage({
              status: paymentIntent.status,
              text: "Payment processing. We'll update you when payment is received.",
            });
            break;

          case "requires_payment_method":
            // Redirect your user back to your payment page to attempt collecting
            // payment again
            setMessage({
              status: paymentIntent.status,
              text: "Payment failed. Please try another payment method.",
            });

            break;

          default:
            setMessage({
              status: paymentIntent.status,
              text: "Something went wrong.",
            });
            break;
        }
      } catch (error: any) {
        setMessage({
          status: error.name as string,
          text: error.message as string,
        });
      }
    };

    fetchIntent();
  }, [stripe, searchParams]);

  return (
    <div>
      {message?.status === "succeeded" && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: 100,
              height: 100,
            }}
          >
            <Lottie animationData={successAnimation} loop={false} />
          </Box>
          <Typography
            component="h1"
            level="h3"
            sx={{
              textAlign: "center",
              mb: 2,
            }}
          >
            {message.text}
          </Typography>
          <Typography
            sx={{
              color: "text.secondary",
              textAlign: "center",
              mt: 1,
              maxWidth: 500,
            }}
          >
            Thank you for your order. An email containing your receipt has been
            sent. Create an account using{" "}
            <Typography
              component="span"
              sx={{
                fontWeight: 600,
              }}
            >
              {info.email}
            </Typography>{" "}
            to monitor your order.
          </Typography>

          <Typography
            sx={{
              fontSize: 16,
            }}
          >
            Order ID:{" "}
            <Typography
              component="span"
              sx={{
                fontWeight: 500,
              }}
            >
              82190
            </Typography>
          </Typography>
        </Box>
      )}

      {message?.status === "requires_payment_method" && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: 100,
              height: 100,
            }}
          >
            <Lottie animationData={errorAnimation} loop={false} />
          </Box>
          <Typography
            component="h1"
            sx={{
              textAlign: "center",
            }}
          >
            {message?.text}
          </Typography>
          <Typography
            sx={{
              color: "text.secondary",
              textAlign: "center",
              mt: 1,
            }}
          >
            We&apos;re sorry, but there was an issue processing your payment.
            Please double-check your payment information and try again. If the
            problem persists, contact our customer support for assistance.
          </Typography>

          <Button
            onClick={() => {
              router.push(
                pathname + "?" + createQueryString("active_step", "4")
              );
            }}
            sx={{
              mt: 2,
            }}
          >
            Go Back
          </Button>
        </Box>
      )}
    </div>
  );
}
