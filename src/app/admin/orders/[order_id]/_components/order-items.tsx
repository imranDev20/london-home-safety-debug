"use client";

import { Sheet, Typography } from "@mui/joy";
import { OrderItemType, OrderTypeForResponse } from "@/types/orders";
import DataTable from "@/app/_components/common/data-table";
import { UserType } from "@/types/users";

const columns = [
  {
    label: "ITEM",
    key: "title",
    width: 240,
  },
  {
    label: "QUANTITY",
    key: "quantity",
    width: 150,
    render: (value: string, row: OrderItemType) => (
      <Typography>
        {row.quantity} {row.unit}
      </Typography>
    ),
  },
  {
    label: "PRICE",
    key: "price",
    width: 50,
    render: (value: string, row: OrderItemType) => (
      <Typography level="title-sm">£{row.price}</Typography>
    ),
  },
];

export default function OrderItems({
  orderDetails,
}: {
  orderDetails: OrderTypeForResponse<UserType>;
}) {
  return (
    <>
      <Typography
        level="title-lg"
        sx={{
          mb: 2,
        }}
      >
        Order Items
      </Typography>

      <Sheet
        variant="outlined"
        sx={{
          borderRadius: "sm",
          display: {
            xs: "none",
            md: "block",
          },
        }}
      >
        {orderDetails?.order_status && (
          <DataTable
            data={orderDetails?.order_items}
            columns={columns}
            checkboxSelection={false}
          />
        )}
      </Sheet>
    </>
  );
}
