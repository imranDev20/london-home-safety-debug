import React, { useEffect } from "react";

import Box from "@mui/joy/Box";
import Chip from "@mui/joy/Chip";
import Sheet from "@mui/joy/Sheet";
import { Avatar, CircularProgress } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import {
  getMostRecentStatus,
  hexToRgba,
  snakeCaseToNormalText,
} from "@/shared/functions";
import dayjs from "dayjs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  FIXED_HEIGHT,
  ORDER_STATUS_COLORS,
  ORDER_STATUS_ICONS,
} from "@/shared/constants";
import { OrderType, OrderTypeForResponse } from "@/types/orders";
import { UserType } from "@/types/users";
import InvoiceDownloadButton from "./invoice-download-button";
import { useQueryString } from "@/shared/hooks/use-query-string";
import { useOrdersData } from "@/shared/hooks/use-orders";
import DataTable from "@/app/_components/common/data-table";
import TablePagination from "@/app/_components/common/table-pagination";

const columns = [
  {
    label: "Invoice ID",
    key: "invoice_id",
    width: 80,
    render: (value: string, row: OrderTypeForResponse<UserType>) => (
      <Typography level="body-sm">{value}</Typography>
    ),
  },
  {
    label: "Customer",
    key: "customer",
    width: 160,
    render: (value: string, row: OrderTypeForResponse<UserType>) => {
      const initial = row?.customer?.name?.charAt(0);

      return (
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Avatar size="sm">{initial}</Avatar>
          <div>
            <Typography level="body-xs">{row?.customer?.name}</Typography>
            <Typography level="body-xs">{row?.customer?.email}</Typography>
          </div>
        </Box>
      );
    },
  },
  {
    label: "Status",
    key: "order_status",
    width: 110,
    render: (value: string, row: OrderTypeForResponse<UserType>) => {
      const status = getMostRecentStatus(row.order_status);
      return (
        <Chip
          variant="soft"
          size="sm"
          startDecorator={ORDER_STATUS_ICONS[status]}
          sx={{
            backgroundColor: hexToRgba(ORDER_STATUS_COLORS[status], 0.2),
            textTransform: "capitalize",
          }}
        >
          {snakeCaseToNormalText(status as string)}
        </Chip>
      );
    },
  },
  {
    label: "Payment Method",
    key: "payment_method",
    width: 100,
    render: (value: string, row: OrderTypeForResponse<UserType>) => {
      return (
        <Typography
          level="body-sm"
          sx={{
            textTransform: "capitalize",
          }}
        >
          {snakeCaseToNormalText(value)}
        </Typography>
      );
    },
  },
  {
    label: "Date",
    key: "createdAt",
    width: 85,
    render: (value: string, row: any) => (
      <Typography level="body-sm">
        {dayjs(value).format("DD MMMM, YYYY")}
      </Typography>
    ),
  },
  {
    label: "Invoice",
    width: 60,
    key: "invoice",
    render: (value: string, row: OrderTypeForResponse<UserType>) => (
      <InvoiceDownloadButton order={row} />
    ),
  },
];

export default function OrderTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { createQueryString } = useQueryString();
  const searchTerm = searchParams.get("q") || "";
  const orderStatus = searchParams.get("order_status") || "";
  const assignedTo = searchParams.get("assigned_to") || "";
  const sortBy = searchParams.get("sort_by") || "";
  const sortOrder = searchParams.get("sort_order") || "";
  const page = searchParams.get("page") || "";

  const {
    ordersData,
    isGetOrdersDataFetching,
    isGetOrdersDataPending,
    refetchGetOrders,
  } = useOrdersData(true, {
    q: searchTerm,
    order_status: orderStatus,
    assigned_to: assignedTo,
    sort_by: sortBy,
    sort_order: sortOrder,
    page,
  });

  // useEffect(() => {
  //   const loadOrders = async () => {
  //     await refetchGetOrders();
  //   };
  //   loadOrders();
  // }, [
  //   searchTerm,
  //   orderStatus,
  //   refetchGetOrders,
  //   sortBy,
  //   sortOrder,
  //   assignedTo,
  //   page,
  // ]);

  const handleRowClick = (order: OrderTypeForResponse<UserType>) => {
    router.push(`/admin/orders/${order._id.toString()}`);
  };

  if (isGetOrdersDataFetching || isGetOrdersDataPending) {
    return (
      <Sheet
        variant="outlined"
        sx={{
          width: "100%",
          borderRadius: "sm",
          flexShrink: 1,
          overflow: "auto",
          minHeight: `calc(100vh - ${FIXED_HEIGHT}px)`,
          height: `calc(100vh - ${FIXED_HEIGHT}px)`,
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
      </Sheet>
    );
  }

  if (!ordersData) {
    return "No Orders Found";
  }

  return (
    <React.Fragment>
      <Sheet
        variant="outlined"
        sx={{
          width: "100%",
          borderRadius: "sm",
          flexShrink: 1,
          overflow: "auto",
          minHeight: `calc(100vh - ${FIXED_HEIGHT}px)`,
          height: `calc(100vh - ${FIXED_HEIGHT}px)`,
        }}
      >
        <DataTable
          data={ordersData?.data}
          columns={columns}
          onRowClick={handleRowClick}
        />
      </Sheet>

      {ordersData.pagination && (
        <TablePagination
          currentPage={ordersData.pagination?.currentPage}
          totalPages={ordersData.pagination.totalPages}
          onPageChange={(newPage) =>
            router.push(
              `${pathname}?${createQueryString("page", newPage.toString())}`
            )
          }
        />
      )}
    </React.Fragment>
  );
}
