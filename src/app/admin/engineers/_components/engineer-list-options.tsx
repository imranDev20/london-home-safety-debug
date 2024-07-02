"use client";

import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Grid from "@mui/joy/Grid";
import Option from "@mui/joy/Option";
import Select from "@mui/joy/Select";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import DebounceInput from "@/app/_components/common/debounce-input";
import { toSnakeCase } from "@/shared/functions";
import { useQueryString } from "@/shared/hooks/use-query-string";

export default function EngineerListOptions() {
  const [openCreateEngineerDrawer, setOpenCreateEngineerDrawer] =
    useState<boolean>(false);

  const { createQueryString, removeQueryString } = useQueryString();
  const router = useRouter();
  const pathname = usePathname();

  const handleDebounce = (value: string) => {
    if (value !== "") {
      router.push(`${pathname}?${createQueryString("q", value)}`);
    } else {
      router.push(`${pathname}?${removeQueryString("q")}}`);
    }
  };

  return (
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
            placeholder="Type in here…"
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
            Filter
          </FormLabel>
          <Select
            placeholder="Filter by specialty"
            slotProps={{
              button: {
                id: "select-field-demo-button",
                sx: {
                  textTransform: "capitalize",
                },
              },
            }}
          >
            {["Electrician", "Fire Safety Expert"].map((specialty) => (
              <Option
                key={specialty}
                value={specialty}
                sx={{
                  textTransform: "capitalize",
                }}
              >
                {specialty}
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
            Sort
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
          >
            {[
              "Name",
              "Specialty",
              "Ongoing Projects",
              "Completed Projects",
              "Email",
              "Phone",
            ].map((sortValue) => (
              <Option
                key={sortValue}
                value={toSnakeCase(sortValue)}
                sx={{
                  textTransform: "capitalize",
                }}
              >
                {sortValue}
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
            defaultValue="desc"
            placeholder="Filter by status"
            slotProps={{
              button: {
                id: "select-field-demo-button",
                sx: {
                  textTransform: "capitalize",
                },
              },
            }}
          >
            <Option
              value="asc"
              sx={{
                textTransform: "capitalize",
              }}
            >
              Ascending
            </Option>
            <Option
              value="desc"
              sx={{
                textTransform: "capitalize",
              }}
            >
              Descending
            </Option>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}
