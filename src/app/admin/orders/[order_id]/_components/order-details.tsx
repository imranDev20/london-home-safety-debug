"use client";

import Box from "@mui/joy/Box";
import CircularProgress from "@mui/joy/CircularProgress";
import Grid from "@mui/joy/Grid";

import OrderDetailsHeader from "./order-details-header";
import AssignedAndTimeInfo from "./assigned-and-time-info";
import OrderItems from "./order-items";
import PriceDetails from "./price-details";
import OrderNotes from "./order-notes";
import CustomerDetails from "./customer-details";
import OrderActivity from "./order-activity";
import PropertyDetails from "./property-details";
import useOrderDetails from "@/shared/hooks/use-order-details";

export default function OrderDetails() {
  const {
    orderDetails,
    isPending: isOrderDetailsPending,
    isFetching: isOrderDetailsFetching,
    isError,
    isFetchedAfterMount,
    error,
  } = useOrderDetails();

  if (
    (isOrderDetailsFetching && !isFetchedAfterMount) ||
    isOrderDetailsPending
  ) {
    return (
      <Box
        sx={{
          width: "100%",
          borderRadius: "sm",
          flexShrink: 1,
          overflow: "auto",
          height: "90vh",
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

  if (isError) {
    return <Box>{error.message}</Box>;
  }

  if (!orderDetails) {
    return <Box>No order details found</Box>;
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
          <PriceDetails orderDetails={orderDetails} />
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
