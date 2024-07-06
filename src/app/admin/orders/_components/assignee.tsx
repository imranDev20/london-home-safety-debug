import { useEngineersData } from "@/shared/hooks/use-engineers";
import { useQueryString } from "@/shared/hooks/use-query-string";
import { UnfoldMore } from "@mui/icons-material";
import {
  CircularProgress,
  FormControl,
  FormLabel,
  Option,
  Select,
} from "@mui/joy";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Assignee() {
  const [listBoxOpen, setListBoxOpen] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const assignedToQuery = searchParams.get("assigned_to") || "";
  const { createQueryString } = useQueryString();
  const router = useRouter();
  const pathname = usePathname();

  const {
    data,
    isLoading: isGetEngineersLoading,
    refetch: refetchGetEngineers,
  } = useEngineersData(false);
  const engineersData = data?.data;

  useEffect(() => {
    if (assignedToQuery !== "") {
      refetchGetEngineers();
    }
  }, [assignedToQuery, refetchGetEngineers]);

  return (
    <>
      <FormControl size="sm">
        <FormLabel
          id="select-field-demo-label"
          htmlFor="select-field-demo-button"
        >
          Assignee
        </FormLabel>

        <Select
          listboxOpen={listBoxOpen}
          onClose={() => setListBoxOpen(false)}
          onListboxOpenChange={async (e) => {
            if (e) {
              if (!engineersData) {
                await refetchGetEngineers();
              } else {
                refetchGetEngineers();
              }
            }
            setListBoxOpen(e);
          }}
          indicator={
            isGetEngineersLoading ? (
              <CircularProgress
                size="sm"
                thickness={2}
                sx={{ "--CircularProgress-size": "20px" }}
              />
            ) : (
              <UnfoldMore />
            )
          }
          placeholder="Filter by assignee"
          slotProps={{
            button: {
              id: "select-field-demo-button",
            },
          }}
          value={assignedToQuery}
          onChange={(_, value) => {
            if (value !== null) {
              router.push(
                `${pathname}?${createQueryString(
                  "assigned_to",
                  value as string
                )}`
              );
            }
          }}
        >
          <Option value="">All Engineers</Option>
          {engineersData?.map((engineer) => (
            <Option value={engineer._id} key={engineer._id.toString()}>
              {engineer.name}
            </Option>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
