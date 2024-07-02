"use client";
import { usePathname, useRouter } from "next/navigation";

import { useState } from "react";

import { FormControl, FormLabel, Grid, Option, Select } from "@mui/joy";

import { exportUsers } from "@/services/user.services";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

import { toSnakeCase } from "@/shared/functions";
import DebounceInput from "@/app/_components/common/debounce-input";
import { useQueryString } from "@/shared/hooks/use-query-string";

export default function CustomerTableOptions() {
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
      <Grid container spacing={1} sx={{ mt: 3, mb: 2 }}>
        <Grid xs={12} md={6}>
          <FormControl size="sm">
            <FormLabel
              id="select-field-demo-label"
              htmlFor="select-field-demo-button"
            >
              Search for customers
            </FormLabel>
            <DebounceInput
              placeholder="Type in customer email, name or phone number..."
              debounceTimeout={1000}
              handleDebounce={handleDebounce}
            />
          </FormControl>
        </Grid>
        <Grid xs={12} md={3}>
          <FormControl size="sm">
            <FormLabel
              id="select-field-demo-label"
              htmlFor="select-field-demo-button"
            >
              Sort
            </FormLabel>
            <Select
              placeholder="Sort customers by..."
              slotProps={{
                button: {
                  id: "select-field-demo-button",
                },
              }}
              defaultValue="createdAt"
              onChange={(e, value) =>
                router.push(
                  `${pathname}?${createQueryString("sort_by", value as string)}`
                )
              }
            >
              <Option value="createdAt">Date Created</Option>

              {["Name", "Email", "Phone"].map((sortVal) => (
                <Option value={toSnakeCase(sortVal)} key={sortVal}>
                  {sortVal}
                </Option>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid xs={12} md={3}>
          <FormControl size="sm">
            <FormLabel
              id="select-field-demo-label"
              htmlFor="select-field-demo-button"
            >
              Order
            </FormLabel>
            <Select
              placeholder="Order customers by..."
              slotProps={{
                button: {
                  id: "select-field-demo-button",
                },
              }}
              defaultValue="desc"
              onChange={(e, value) =>
                router.push(
                  `${pathname}?${createQueryString(
                    "sort_order",
                    value as string
                  )}`
                )
              }
            >
              <Option value="asc">Ascending</Option>
              <Option value="desc">Descending</Option>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
}
