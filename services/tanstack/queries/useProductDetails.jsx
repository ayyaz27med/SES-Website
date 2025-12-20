import { useQuery } from "@tanstack/react-query";
import { queryKeys } from ".";
import { fetchProductDetails } from "@/services/product";

const useProductDetails = (id, params) => {
  return useQuery({
    queryKey: [queryKeys.productDetails, id, params],
    queryFn: () => fetchProductDetails(id, params),
    enabled: !!id,
  });
};

export default useProductDetails;
