"use client";
import { Add, Download } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/joy";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { exportOrders } from "@/services/orders.services";
import dayjs from "dayjs";
import { useOrdersData } from "@/shared/hooks/use-orders";
import { usePathname, useSearchParams } from "next/navigation";
import { useQueryString } from "@/shared/hooks/use-query-string";

export default function OrderListHeader() {
  const [openCreateCustomerDrawer, setOpenCreateCustomerDrawer] =
    useState<boolean>(false);

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

  const { isLoading: isExportOrdersLoading, refetch: refetchExportOrders } =
    useQuery({
      queryKey: ["export-orders"],
      queryFn: async () => await exportOrders(),
      enabled: false,
    });

  const handleExportOrders = async () => {
    try {
      const response = await refetchExportOrders();
      const data = response.data;

      if (response.status === "success") {
        // const progressUpdates = data.progressUpdates;
        const excelData = data.excelData;

        // Download Excel file
        const byteArray = new Uint8Array(
          atob(excelData)
            .split("")
            .map((char) => char.charCodeAt(0))
        );
        const blob = new Blob([byteArray], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const downloadUrl = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = downloadUrl;
        link.setAttribute(
          "download",
          `Orders - ${dayjs().format("YYYY-MM-DD@hh:mm:ss")}.xlsx`
        );
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        console.log(data);
        console.error("Error exporting orders:", data);
      }
    } catch (err) {
      console.error(err);
    }
    // finally {
    //   setIsDownloading(false);
    //   setProgress(null);
    // }
  };

  return (
    <Stack
      spacing={2}
      mt={2}
      justifyContent="space-between"
      alignItems={{
        xs: "flex-start",
        md: "center",
      }}
      direction={{
        xs: "column",
        sm: "row",
      }}
    >
      <Typography component="h1" level="h2">
        Order List
      </Typography>

      <Stack
        spacing={2}
        direction={{
          xs: "column",
          sm: "row",
        }}
      >
        <Button
          size="sm"
          variant="outlined"
          startDecorator={<Download />}
          onClick={handleExportOrders}
          loading={isExportOrdersLoading}
          loadingPosition="start"
        >
          Download Excel
        </Button>
        <Button
          size="sm"
          startDecorator={<Add />}
          onClick={() => setOpenCreateCustomerDrawer(true)}
        >
          Add New Order
        </Button>
      </Stack>
    </Stack>
  );
}
