import { UnfoldMore } from "@mui/icons-material";
import { CircularProgress, FormControl, Option, Select } from "@mui/joy";
import React, { useEffect, useState } from "react";
import { useEngineersData } from "@/shared/hooks/use-engineers";
import { OrderType, OrderTypeForResponse } from "@/types/orders";
import { UserType } from "@/types/users";
import useUpdateOrderDetails from "@/shared/hooks/use-update-order-details";
import { Types } from "mongoose";
import { useSnackbar } from "@/app/_components/providers/snackbar-provider";

export default function ItemsAssigneeSelect({
  orderDetails,
}: {
  orderDetails: OrderTypeForResponse<UserType>;
}) {
  const [listBoxOpen, setListBoxOpen] = useState<boolean>(false);
  const [selectedEngineer, setSelectedEngineer] = useState("");

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
      setSelectedEngineer(orderDetails.assigned_engineer.toString());
    }
  }, [orderDetails]);

  const handleSelectEngineer = (value: string) => {
    setSelectedEngineer(value);

    if (!orderDetails?.customer?._id) {
      enqueueSnackbar("Customer details wasn't found", "error");
      return;
    }

    const payload: OrderTypeForResponse = {
      ...orderDetails,
      customer: orderDetails.customer._id,
      assigned_engineer: new Types.ObjectId(value),
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
        onChange={(_, value) => value && handleSelectEngineer(value)}
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
