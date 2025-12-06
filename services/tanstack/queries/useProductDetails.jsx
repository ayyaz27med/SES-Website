import { useQuery } from "@tanstack/react-query";
import { queryKeys } from ".";
import { fetchProductDetails } from "@/services/product";

const useProductDetails = (id) => {
  return useQuery({
    queryKey: [queryKeys.productDetails, id],
    queryFn: () => fetchProductDetails(id),
    enabled: !!id,
  });
};

export default useProductDetails;
