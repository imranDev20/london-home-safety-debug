"use client";
import CustomerDetails from "./customer-details";
import OrderItems from "./order-items";
import OrderNotes from "./order-notes";
import OrderActivity from "./order-activity";
import PropertyDetails from "./property-details";
import AssignedAndTimeInfo from "./assigned-and-time-info";
import PriceDetails from "./price-details";
import OrderDetailsHeader from "./order-details-header";
import { Box, CircularProgress, Grid, Sheet } from "@mui/joy";
import useOrderDetails from "@/shared/hooks/use-order-details";

export default function OrderDetails() {
  //   const {
  //     orderDetails,
  //     isPending: isOrderDetailsPending,
  //     isFetching: isOrderDetailsFetching,
  //   } = useOrderDetails();

  //   if (isOrderDetailsPending || isOrderDetailsFetching) {
  //     return (
  //       <Box
  //         sx={{
  //           width: "100%",
  //           borderRadius: "sm",
  //           flexShrink: 1,
  //           overflow: "auto",
  //           display: "flex",
  //           justifyContent: "center",
  //           alignItems: "center",
  //         }}
  //       >
  //         <CircularProgress
  //           thickness={3}
  //           sx={{
  //             "--CircularProgress-size": "60px",
  //           }}
  //         />
  //       </Box>
  //     );
  //   }

  return (
    <Box>
      <OrderDetailsHeader />
      <AssignedAndTimeInfo />

      <Grid
        container
        spacing={3}
        sx={{
          mt: 3,
        }}
      >
        <Grid md={9}>
          <OrderItems />
          <PriceDetails />
        </Grid>
        <Grid md={3}>
          <OrderNotes />
        </Grid>
      </Grid>

      <Grid container spacing={3} mt={3}>
        <Grid md={4}>
          <CustomerDetails />
        </Grid>

        <Grid md={4}>
          <PropertyDetails />
        </Grid>

        <Grid md={4}>
          <OrderActivity />
        </Grid>
      </Grid>
    </Box>
  );
}
