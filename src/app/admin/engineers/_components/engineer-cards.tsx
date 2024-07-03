"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import Box from "@mui/joy/Box";
import Grid from "@mui/joy/Grid";
import Stack from "@mui/joy/Stack";

import { FIXED_HEIGHT } from "@/shared/constants";

import EngineerCard from "./engineer-card";
import { useEngineersData } from "@/shared/hooks/use-engineers";
import TablePagination from "@/app/_components/common/table-pagination";
import { useEffect } from "react";
import { useQueryString } from "@/shared/hooks/use-query-string";

export default function EngineerCards() {
  const searchParams = useSearchParams();

  const searchTerm = searchParams.get("q") || "";
  const sortBy = searchParams.get("sort_by") || "";
  const page = searchParams.get("page") || "";
  const sortOrder = searchParams.get("sort_order") || "";

  const { createQueryString } = useQueryString();

  const router = useRouter();
  const pathname = usePathname();

  const {
    data,
    isPending: isGetEngineersDataPending,
    isFetching: isGetEngineersDataFetching,
    refetch: refetchEngineers,
    isFetchedAfterMount,
  } = useEngineersData(false, searchTerm, sortBy, sortOrder, page);

  const engineersData = data?.data;

  useEffect(() => {
    const loadEngineers = async () => {
      await refetchEngineers();
    };
    loadEngineers();
  }, [searchTerm, refetchEngineers, sortBy, sortOrder, page]);

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
          currentPage={data.pagination?.currentPage}
          totalPages={data.pagination.totalPages}
          onPageChange={(newPage) =>
            router.push(
              `${pathname}?${createQueryString("page", newPage.toString())}`
            )
          }
        />
      )}
    </>
  );
}
