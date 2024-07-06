"use client";

import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Grid from "@mui/joy/Grid";
import Option from "@mui/joy/Option";
import Select from "@mui/joy/Select";
import { usePathname, useRouter } from "next/navigation";

import DebounceInput from "@/app/_components/common/debounce-input";
import { toSnakeCase } from "@/shared/functions";
import { useQueryString } from "@/shared/hooks/use-query-string";

export default function EngineerListOptions() {
  const { createQueryString, removeQueryString } = useQueryString();
  const router = useRouter();
  const pathname = usePathname();

  const handleDebounce = (value: string) => {
    if (value !== "") {
      router.push(`${pathname}?${createQueryString("q", value)}`);
    } else {
      router.push(`${pathname}?${removeQueryString("q")}`);
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
            Search for engineers
          </FormLabel>
          <DebounceInput
            placeholder="Type in here…"
            debounceTimeout={1000}
            handleDebounce={handleDebounce}
          />
        </FormControl>
      </Grid>

      {/* <Grid xs={12} md={2}>
        <FormControl size="sm">
          <FormLabel
            id="select-field-demo-label"
            htmlFor="select-field-demo-button"
          >
            Filter by specialty
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
      </Grid> */}

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
  );
}
