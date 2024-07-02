"use client";
import { FormControl, FormLabel, Grid, Option, Select } from "@mui/joy";
import { ORDER_STATUS } from "@/shared/constants";
import { snakeCaseToNormalText, toSnakeCase } from "@/shared/functions";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useQueryString } from "@/shared/hooks/use-query-string";
import DebounceInput from "@/app/_components/common/debounce-input";
import Assignee from "./assignee";

export default function OrderTableOptions() {
  const searchParams = useSearchParams();
  const orderStatus = searchParams.get("order_status") || "";

  const { createQueryString, removeQueryString } = useQueryString();
  const router = useRouter();
  const pathname = usePathname();

  const handleDebounce = (value: string): void => {
    if (value !== "") {
      router.push(`${pathname}?${createQueryString("q", value)}`);
    } else {
      router.push(`${pathname}?${removeQueryString("q")}`);
    }
  };

  return (
    <>
      <Grid container spacing={1} sx={{ mt: 3, mb: 2 }}>
        <Grid xs={12} md={4}>
          <FormControl size="sm">
            <FormLabel
              id="select-field-demo-label"
              htmlFor="select-field-demo-button"
            >
              Search for orders
            </FormLabel>
            <DebounceInput
              placeholder="Type in invoice ID, Email, Name or Phone No..."
              debounceTimeout={1000}
              handleDebounce={handleDebounce}
            />
          </FormControl>
        </Grid>

        <Grid xs={12} md={2}>
          <FormControl size="sm">
            <FormLabel
              id="select-field-demo-label"
              htmlFor="select-field-demo-button"
            >
              Status
            </FormLabel>
            <Select
              placeholder="Filter by status"
              slotProps={{
                button: {
                  id: "select-field-demo-button",
                  sx: {
                    textTransform: "capitalize",
                  },
                },
              }}
              value={orderStatus || ""}
              onChange={(_, value) => {
                router.push(
                  `${pathname}?${createQueryString(
                    "order_status",
                    value as string
                  )}`,
                  { scroll: false }
                );
              }}
            >
              <Option
                value=""
                sx={{
                  textTransform: "capitalize",
                }}
              >
                All Statuses
              </Option>
              {ORDER_STATUS.map((order) => (
                <Option
                  key={order}
                  value={order}
                  sx={{
                    textTransform: "capitalize",
                  }}
                >
                  {snakeCaseToNormalText(order)}
                </Option>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid xs={12} md={2}>
          <Assignee />
        </Grid>

        <Grid xs={12} md={2}>
          <FormControl size="sm">
            <FormLabel
              id="select-field-demo-label"
              htmlFor="select-field-demo-button"
            >
              Sort
            </FormLabel>
            <Select
              placeholder="Sort orders by..."
              slotProps={{
                button: {
                  id: "select-field-demo-button",
                },
              }}
              defaultValue="createdAt"
              onChange={(e, value) =>
                router.push(
                  `${pathname}?${createQueryString(
                    "sort_by",
                    value as string
                  )}`,
                  { scroll: false }
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

        <Grid xs={12} md={2}>
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
                  )}`,
                  { scroll: false }
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
