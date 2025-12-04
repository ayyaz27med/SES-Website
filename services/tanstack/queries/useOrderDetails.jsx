import { useQuery } from "@tanstack/react-query";
import { queryKeys } from ".";
import { fetchOrderDetails } from "@/services/user";

const useOrderDetails = (id) => {
  return useQuery({
    queryKey: [queryKeys.orderDetails, id],
    queryFn: () => fetchOrderDetails(id),
    enabled: !!id,
  });
};

export default useOrderDetails;
