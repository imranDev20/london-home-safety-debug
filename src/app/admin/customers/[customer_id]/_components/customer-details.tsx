"use client";
import { getUserDetails } from "@/services/user.services";
import { useQuery } from "@tanstack/react-query";
import { Types } from "mongoose";
import { useParams } from "next/navigation";

import Box from "@mui/joy/Box";
import Grid from "@mui/joy/Grid";
import CircularProgress from "@mui/joy/CircularProgress";

import CustomerDetailsHeader from "./customer-details-header";
import CustomerStats from "./customer-stats";
import CustomerInfo from "./customer-info";
import CustomerOrders from "./customer-orders";

export default function CustomerDetails() {
  const { customer_id } = useParams();

  const {
    data: userDetails,
    isFetching: isUserDetailsFetching,
    isPending: isUserDetailsPending,
    isFetchedAfterMount,
    isError,
    error,
  } = useQuery({
    queryKey: ["user-details"],
    queryFn: async () => {
      const response = await getUserDetails(
        new Types.ObjectId(customer_id as string)
      );
      return response.data;
    },
  });

  if ((isUserDetailsFetching && !isFetchedAfterMount) || isUserDetailsPending) {
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

  if (!userDetails) {
    return <Box>No user details found</Box>;
  }

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: "sm",
        flexShrink: 1,
        overflow: "auto",
        minHeight: `calc(100vh - 35px)`,
        height: `calc(100vh - 35px)`,
      }}
    >
      <CustomerDetailsHeader userDetails={userDetails} />
      <CustomerStats />

      <Grid
        container
        spacing={3}
        sx={{
          mt: 5,
        }}
      >
        <Grid xs={12} lg={4}>
          <CustomerInfo userDetails={userDetails} />
          {/* <RecentActivities /> */}
        </Grid>
        <Grid xs={12} lg={8}>
          <CustomerOrders />
        </Grid>
      </Grid>
    </Box>
  );
}
