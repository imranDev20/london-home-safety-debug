import Button from "@mui/joy/Button";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";

import { useParams, useRouter } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

import {
  customSlugify,
  getMostRecentStatus,
  snakeCaseToNormalText,
} from "@/shared/functions";
import { getOrders } from "@/services/orders.services";
import DataTable from "@/app/_components/common/data-table";
import { OrderTypeForResponse } from "@/types/orders";
import { UserType } from "@/types/users";
import { useEffect } from "react";
import InvoiceDownloadButton from "@/app/admin/orders/_components/invoice-download-button";

const columns = [
  {
    label: "Invoice ID",
    key: "invoice_id",
    width: 150,
    render: (value: string, row: OrderTypeForResponse<UserType>) => (
      <Typography level="body-sm">{value}</Typography>
    ),
  },
  {
    label: "Order Status",
    key: "order_status",
    width: 90,
    render: (value: string, row: OrderTypeForResponse<UserType>) => {
      const status = getMostRecentStatus(row?.order_status);
      return (
        <Typography
          level="body-sm"
          sx={{
            textTransform: "capitalize",
          }}
        >
          {snakeCaseToNormalText(status as string)}
        </Typography>
      );
    },
  },
  {
    label: "Order Placed",
    key: "createdAt",
    width: 90,
    render: (value: string, row: OrderTypeForResponse<UserType>) => (
      <Typography level="body-sm">
        {dayjs(value).format("DD/MM/YYYY")}
      </Typography>
    ),
  },
  {
    label: "Invoice",
    width: 90,
    key: "invoice",
    render: (value: string, row: OrderTypeForResponse<UserType>) => (
      <InvoiceDownloadButton order={row} />
    ),
  },
];

export default function CustomerOrders() {
  const router = useRouter();
  const { customer_id } = useParams();

  const {
    data: ordersData,
    isPending: isGerOrdersDataPending,
    isFetching: isGetOrdersDataFetching,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      getOrders(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        customer_id as string
      ),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: false,
  });

  useEffect(() => {
    if (customer_id) {
      refetch();
    }
  }, [customer_id, refetch]);

  const handleRowClick = (row: OrderTypeForResponse<UserType>) => {
    router.push(`/admin/customers/${customSlugify(row._id.toString())}`);
  };

  const handleSelectionChange = (
    selected: OrderTypeForResponse<UserType>[]
  ) => {
    console.log("Selection changed:", selected);
  };

  if (isGerOrdersDataPending || isGetOrdersDataFetching) {
    return "Loading...";
  }

  if (isError) {
    return <Typography>{error.message}</Typography>;
  }

  if (!ordersData) {
    return <Typography>No orders found</Typography>;
  }

  return (
    <>
      <Typography level="h4" mb={2}>
        Orders
      </Typography>
      <Stack direction="row" spacing={1}>
        <Button size="sm" variant="outlined" color="primary">
          All Orders
        </Button>
        <Button size="sm" variant="outlined" color="neutral">
          Processing
        </Button>
        <Button size="sm" variant="outlined" color="neutral">
          Completed
        </Button>
        <Button size="sm" variant="outlined" color="neutral">
          Cancelled
        </Button>
      </Stack>
      <Sheet
        variant="outlined"
        sx={{
          borderRadius: "sm",
          p: 0,
          mt: 3,
        }}
      >
        <DataTable columns={columns} data={ordersData?.data} />
      </Sheet>
    </>
  );
}
