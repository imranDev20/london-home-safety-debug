"use client";
import CustomerDetails from "./customer-details";
import OrderItems from "./order-items";
import OrderNotes from "./order-notes";
import OrderActivity from "./order-activity";
import PropertyDetails from "./property-details";
import { Box, CircularProgress, Grid } from "@mui/joy";
import useOrderDetails from "@/shared/hooks/use-order-details";
import OrderDetailsHeader from "./order-details-header";
import AssignedAndTimeInfo from "./assigned-and-time-info";
import PriceDetails from "./price-details";

export default function OrderDetails() {
  const {
    orderDetails,
    isPending: isOrderDetailsPending,
    isFetching: isOrderDetailsFetching,
  } = useOrderDetails();

  if (isOrderDetailsPending || isOrderDetailsFetching) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress
          thickness={3}
          sx={{
            "--CircularProgress-size": "60px",
          }}
        />
      </Box>
    );
  }

  if (!orderDetails) {
    return "order details not available";
  }

  return (
    <Box
      sx={{
        maxHeight: "95vh",
        overflowY: {
          md: "auto",
          xs: "unset",
        },
      }}
    >
      <OrderDetailsHeader orderDetails={orderDetails} />
      <AssignedAndTimeInfo orderDetails={orderDetails} />

      <Grid
        container
        spacing={3}
        sx={{
          mt: 3,
        }}
      >
        <Grid md={9}>
          <OrderItems orderDetails={orderDetails} />
          <PriceDetails />
        </Grid>
        <Grid md={3}>
          <OrderNotes orderDetails={orderDetails} />
        </Grid>
      </Grid>

      <Grid container spacing={3} mt={3}>
        <Grid xs={12} md={4}>
          <CustomerDetails orderDetails={orderDetails} />
        </Grid>

        <Grid xs={12} md={4}>
          <PropertyDetails orderDetails={orderDetails} />
        </Grid>

        <Grid xs={12} md={4}>
          <OrderActivity orderDetails={orderDetails} />
        </Grid>
      </Grid>
    </Box>
  );
}
