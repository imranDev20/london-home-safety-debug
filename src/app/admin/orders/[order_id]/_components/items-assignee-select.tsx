import { UnfoldMore } from "@mui/icons-material";
import { CircularProgress, FormControl, Option, Select } from "@mui/joy";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useEngineersData } from "@/shared/hooks/use-engineers";
import { OrderTypeForResponse } from "@/types/orders";
import { EngineerType, UserType } from "@/types/users";
import useUpdateOrderDetails from "@/shared/hooks/use-update-order-details";

import { useSnackbar } from "@/app/_components/providers/snackbar-provider";

export default function ItemsAssigneeSelect({
  orderDetails,
  selectedEngineer,
  setSelectedEngineer,
}: {
  orderDetails: OrderTypeForResponse<UserType>;
  selectedEngineer: EngineerType<true> | null;
  setSelectedEngineer: Dispatch<SetStateAction<EngineerType<true> | null>>;
}) {
  const [listBoxOpen, setListBoxOpen] = useState<boolean>(false);

  const { updateOrderMutate, isPending: isUpdateOrderPending } =
    useUpdateOrderDetails();

  const { enqueueSnackbar } = useSnackbar();

  const {
    data,
    isLoading: isGetEngineersLoading,
    refetch: refetchGetEngineers,
  } = useEngineersData();
  const engineersData = data?.data;

  useEffect(() => {
    if (orderDetails && orderDetails.assigned_engineer) {
      const selected = engineersData?.find(
        (item) => item._id === orderDetails.assigned_engineer
      );

      if (!selected) {
        console.log("Selected engineer not found in DB");
        return;
      }

      setSelectedEngineer(selected);
    }
  }, [orderDetails, setSelectedEngineer, engineersData]);

  const handleSelectEngineer = (value: EngineerType<true>) => {
    setSelectedEngineer(value);

    if (!orderDetails?.customer?._id) {
      enqueueSnackbar("Customer details wasn't found", "error");
      return;
    }

    const payload: OrderTypeForResponse = {
      ...orderDetails,
      customer: orderDetails.customer._id,
      assigned_engineer: value._id,
    };

    updateOrderMutate(payload);
  };

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
        onChange={(_, value) => {
          if (value) {
            handleSelectEngineer(value);
          }
        }}
        placeholder="Filter by assignee"
        slotProps={{
          button: {
            id: "select-field-demo-button",
          },
        }}
      >
        {engineersData?.map((engineer) => (
          <Option value={engineer} key={engineer._id.toString()}>
            {engineer.name}
          </Option>
        ))}
      </Select>
    </FormControl>
  );
}
