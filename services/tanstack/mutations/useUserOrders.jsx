import { useQuery } from "@tanstack/react-query";
import { fetchUserOrders } from "@/services/user";
import { queryKeys } from "../queries";

export const useUserOrders = (payload) => {
  return useQuery({
    queryKey: [queryKeys.userOrders, payload],
    queryFn: () => fetchUserOrders(payload),
    keepPreviousData: true,
  });
};

export default useUserOrders;
