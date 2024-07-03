// Adjust the import path as necessary

import { getUsers } from "@/services/user.services";
import { GetEngineersResponse } from "@/types/response";
import { useQuery } from "@tanstack/react-query";

export const useEngineersData = (
  enabled?: boolean,
  searchTerm?: string,
  sortBy?: string,
  sortOrder?: string,
  page?: string
) => {
  const data = useQuery<GetEngineersResponse>({
    queryKey: ["users"],
    queryFn: () =>
      getUsers<"engineer">(searchTerm, "engineer", sortBy, sortOrder, page),
    enabled: enabled ?? true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return data;
};
