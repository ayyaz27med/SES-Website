import { useQuery } from "@tanstack/react-query";
import { queryKeys } from ".";
import { fetchUserDetails } from "@/services/user";

const useUserDetails = () => {
  return useQuery({
    queryKey: [queryKeys.userDetails],
    queryFn: () => fetchUserDetails(),
  });
};

export default useUserDetails;
