import { getOrders } from "@/services/orders.services";
import { GetOrdersResponse } from "@/types/response";
import { useQuery } from "@tanstack/react-query";

interface OrderQueries {
  q?: string;
  order_status?: string;
  assigned_to?: string;
  sort_by?: string;
  sort_order?: string;
  page?: string;
}

export const useOrdersData = (enabled?: boolean, queries?: OrderQueries) => {
  const { q, order_status, assigned_to, sort_by, sort_order, page } =
    queries as OrderQueries;
  const {
    data,
    isPending: isGetOrdersDataPending,
    isFetching: isGetOrdersDataFetching,
    refetch: refetchGetOrders,
  } = useQuery<GetOrdersResponse>({
    queryKey: ["orders"],
    queryFn: () =>
      getOrders(q, order_status, assigned_to, sort_by, sort_order, page),
    enabled: enabled ?? true,
    refetchOnMount: true,
  });

  return {
    ordersData: data,
    isGetOrdersDataPending,
    isGetOrdersDataFetching,
    refetchGetOrders,
  };
};
