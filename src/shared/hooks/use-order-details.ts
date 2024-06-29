import { getOrderDetails } from "@/services/orders.services";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function useOrderDetails() {
  const { order_id } = useParams();

  const { data, ...rest } = useQuery({
    queryKey: ["order-details"],
    queryFn: () => getOrderDetails(order_id as string),
  });

  return { orderDetails: data?.data, ...rest };
}
