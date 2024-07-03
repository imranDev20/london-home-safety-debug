"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Grid from "@mui/joy/Grid";
import Option from "@mui/joy/Option";
import Select from "@mui/joy/Select";

import { exportUsers } from "@/services/user.services";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

import { toSnakeCase } from "@/shared/functions";
import DebounceInput from "@/app/_components/common/debounce-input";
import { useQueryString } from "@/shared/hooks/use-query-string";

export default function CustomerTableOptions() {
  const router = useRouter();
  const pathname = usePathname();
  const { createQueryString, removeQueryString } = useQueryString();

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
              onChange={(_, value) =>
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
