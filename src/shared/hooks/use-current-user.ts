import { useQuery } from "@tanstack/react-query";
import { getCurrentAccount } from "@/services/account.services";

/**
 * Custom React hook to fetch and manage the current user data.
 */

export default function useCurrentUser() {
  const { data: userData, ...rest } = useQuery({
    queryKey: ["current-user", "users"],
    queryFn: () => getCurrentAccount(),
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return {
    userData: userData?.data,
    ...rest,
  };
}
