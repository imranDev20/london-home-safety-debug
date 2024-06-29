// Adjust the import path as necessary

import { getUsers } from "@/services/user.services";
import { GetEngineersResponse } from "@/types/response";
import { useQuery } from "@tanstack/react-query";

export const useEngineersData = (enabled?: boolean) => {
  const data = useQuery<GetEngineersResponse>({
    queryKey: ["users"],
    queryFn: () => getUsers<"engineer">(undefined, "engineer"),
    enabled: enabled ?? true,
    refetchOnMount: false,
  });

  return data;
};
