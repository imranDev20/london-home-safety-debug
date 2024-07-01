import { UnfoldMore } from "@mui/icons-material";
import { CircularProgress, FormControl, Option, Select } from "@mui/joy";
import React, { useState } from "react";
import { Assignment } from "./assigned-and-time-info";
import { useEngineersData } from "@/shared/hooks/use-engineers";

type ItemsAssigneeSelectProps = {
  index: number;
  setToStateEngineer: (param1: Assignment, index: number) => void;
};

export default function ItemsAssigneeSelect({
  index,
  setToStateEngineer,
}: ItemsAssigneeSelectProps) {
  const [listBoxOpen, setListBoxOpen] = useState<boolean>(false);

  const {
    data,
    isLoading: isGetEngineersLoading,
    refetch: refetchGetEngineers,
  } = useEngineersData();
  const engineersData = data?.data;

  return (
    <FormControl size="sm">
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
      >
        {engineersData?.map((engineer) => (
          <Option value={engineer._id} key={engineer._id.toString()}>
            {engineer.name}
          </Option>
        ))}
      </Select>
    </FormControl>
  );
}
