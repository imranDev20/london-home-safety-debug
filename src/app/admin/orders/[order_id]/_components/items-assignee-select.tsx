import { UnfoldMore } from "@mui/icons-material";
import { CircularProgress, FormControl, Option, Select } from "@mui/joy";
import React, { useEffect, useState } from "react";
import { useEngineersData } from "@/shared/hooks/use-engineers";
import { OrderTypeForResponse } from "@/types/orders";
import { UserType } from "@/types/users";

export default function ItemsAssigneeSelect({
  orderDetails,
}: {
  orderDetails: OrderTypeForResponse<UserType>;
}) {
  const [listBoxOpen, setListBoxOpen] = useState<boolean>(false);
  const [selectedEngineer, setSelectedEngineer] = useState("");

  const {
    data,
    isLoading: isGetEngineersLoading,
    refetch: refetchGetEngineers,
  } = useEngineersData();
  const engineersData = data?.data;

  useEffect(() => {
    if (orderDetails) {
      setSelectedEngineer("");
    }
  }, [orderDetails]);

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
        value={selectedEngineer}
        onChange={(_, value) => value && setSelectedEngineer(value)}
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
