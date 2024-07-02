import { OrderTypeForResponse } from "@/types/orders";
import { UserType } from "@/types/users";
import { Box } from "@mui/joy";
import React from "react";

export default function PriceDetails({
  orderDetails,
}: {
  orderDetails: OrderTypeForResponse<UserType>;
}) {
  return <Box mt={3}>PriceDetails</Box>;
}
