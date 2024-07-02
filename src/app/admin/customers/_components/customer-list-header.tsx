"use client";
import { exportUsers } from "@/services/user.services";
import { useQueryString } from "@/shared/hooks/use-query-string";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";

import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";

import dayjs from "dayjs";
import FormDrawer from "@/app/_components/common/form-drawer";
import CreateCustomerForm from "./create-customer-form";

export default function CustomerListHeader() {
  const [openCreateCustomerDrawer, setOpenCreateCustomerDrawer] =
    useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const { createQueryString, removeQueryString } = useQueryString();

  // Mutate function to export users
  const { isLoading: isExportUsersLoading, refetch: refetchExportUsers } =
    useQuery({
      queryKey: ["export-users"],
      queryFn: async () => {
        const response = await exportUsers();
        return response.data;
      },
      enabled: false,
    });

  const handleExportUsers = async () => {
    try {
      const response = await refetchExportUsers();
      const data = response.data;

      if (response.status === "success") {
        // const progressUpdates = data.progressUpdates;
        const excelData = data.excelData;

        // Update progress
        // for (const { progress } of progressUpdates) {
        //   setProgress(progress);
        // }

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
          `Customers - ${dayjs().format("YYYY-MM-DD@hh:mm:ss")}.xlsx`
        );
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        console.error("Error exporting users:", data.error);
      }
    } catch (err) {
      console.error(err);
    }
    // finally {
    //   setIsDownloading(false);
    //   setProgress(null);
    // }
  };

  const handleDebounce = (value: string) => {
    if (value !== "") {
      router.push(`${pathname}?${createQueryString("q", value)}`);
    } else {
      router.push(`${pathname}?${removeQueryString("q")}`);
    }
  };

  return (
    <>
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
          Customer List
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
            startDecorator={<DownloadIcon />}
            onClick={handleExportUsers}
            loading={isExportUsersLoading}
            loadingPosition="start"
          >
            Download Excel
          </Button>
          <Button
            size="sm"
            startDecorator={<AddIcon />}
            onClick={() => setOpenCreateCustomerDrawer(true)}
          >
            Add New Customer
          </Button>
        </Stack>
      </Stack>

      <FormDrawer
        open={openCreateCustomerDrawer}
        setOpen={setOpenCreateCustomerDrawer}
      >
        <CreateCustomerForm
          setOpenCreateCustomerDrawer={setOpenCreateCustomerDrawer}
        />
      </FormDrawer>
    </>
  );
}
