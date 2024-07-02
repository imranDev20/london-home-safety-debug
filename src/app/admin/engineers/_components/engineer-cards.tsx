"use client";
import { useSearchParams } from "next/navigation";

import Box from "@mui/joy/Box";
import Grid from "@mui/joy/Grid";
import Stack from "@mui/joy/Stack";

import { FIXED_HEIGHT } from "@/shared/constants";

import EngineerCard from "./engineer-card";
import { useEngineersData } from "@/shared/hooks/use-engineers";
import TablePagination from "@/app/_components/common/table-pagination";

export default function EngineerCards() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  const {
    data,
    isPending: isGetEngineersDataPending,
    isFetching: isGetEngineersDataFetching,
  } = useEngineersData();

  const engineersData = data?.data;

  if (isGetEngineersDataFetching || isGetEngineersDataPending) {
    return "Loading...";
  }

  if (!engineersData) {
    return "No engineers found";
  }

  return (
    <>
      <Box
        sx={{
          width: "100%",
          borderRadius: "sm",
          flexShrink: 1,
          overflow: {
            xs: "unset",
            md: "auto",
          },
          minHeight: {
            md: `calc(100vh - ${FIXED_HEIGHT}px)`,
            xs: "unset",
          },
          height: {
            md: `calc(100vh - ${FIXED_HEIGHT}px)`,
            xs: "unset",
          },
        }}
      >
        <Stack>
          <Grid container spacing={3}>
            {engineersData?.map((engineer) => (
              <Grid xs={12} md={6} key={engineer.email}>
                <EngineerCard engineer={engineer} />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Box>

      {data.pagination && (
        <TablePagination
          currentPage={data?.pagination?.currentPage}
          totalPages={data.pagination.totalPages}
          onPageChange={(val) => console.log(val)}
        />
      )}
    </>
  );
}
