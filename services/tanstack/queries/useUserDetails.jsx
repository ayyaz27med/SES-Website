import { useQuery } from "@tanstack/react-query";
import { queryKeys } from ".";
import { fetchUserDetails } from "@/services/user";

const useUserDetails = (id) => {
  return useQuery({
    queryKey: [queryKeys.userDetails],
    queryFn: () => fetchUserDetails(),
    enabled: !!id,
  });
};

export default useUserDetails;
