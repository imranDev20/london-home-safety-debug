import { getOrderInvoice } from "@/services/orders.services";
import { OrderType, OrderTypeForResponse } from "@/types/orders";
import { UserType } from "@/types/users";
import { Button } from "@mui/joy";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import React from "react";

type InvoiceDownloadButtonProps = {
  order: OrderTypeForResponse<UserType>;
};

export default function InvoiceDownloadButton({
  order,
}: InvoiceDownloadButtonProps) {
  const { isLoading: isExportOrdersLoading, refetch: refetchGetInvoice } =
    useQuery({
      queryKey: ["export-orders", order._id],
      queryFn: () => getOrderInvoice(order._id),
      enabled: false,
    });

  const handleDownloadInvoice = async () => {
    try {
      const response = await refetchGetInvoice();

      const data = response.data;
      console.log(response);
      if (response.status === "success") {
        // const progressUpdates = data.progressUpdates;
        const invoiceData = data.invoiceData;
        // Download Excel file
        const byteArray = new Uint8Array(
          atob(invoiceData)
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
          `${order.invoice_id} - ${dayjs().format("YYYY-MM-DD@hh:mm:ss")}.pdf`
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
    <Button
      size="sm"
      variant="plain"
      onClick={(event) => {
        event.stopPropagation();
        handleDownloadInvoice();
      }}
      sx={{
        fontSize: 13,
        fontWeight: 500,
      }}
    >
      Download
    </Button>
  );
}
