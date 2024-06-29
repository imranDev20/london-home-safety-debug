import { updateOrder } from "@/services/orders.services";
import { OrderType } from "@/types/orders";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserType } from "@/types/users";
import { useSnackbar } from "@/app/_components/providers/snackbar-provider";

export default function useUpdateOrderDetails() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const { mutateAsync: updateOrderMutate, ...rest } = useMutation({
    mutationFn: (orderData: OrderType) => updateOrder(orderData),

    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["order-details"],
      });
      enqueueSnackbar(response.message, "success");
    },
    onError: (error) => enqueueSnackbar(error.message, "error"),
  });
  return { updateOrderMutate, ...rest };
}
