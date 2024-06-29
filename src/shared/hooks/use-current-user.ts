import { useQuery } from "@tanstack/react-query";
import { getCurrentAccount } from "@/services/account.services";

/**
 * Custom React hook to fetch and manage the current user data.
 */

const useCurrentUser = () => {
  const { data: userData, ...rest } = useQuery({
    queryKey: ["current-user", "users"],
    queryFn: () => getCurrentAccount(),
    retry: 1,
  });

  return {
    userData: userData?.data,
    ...rest,
  };
};

export default useCurrentUser;
