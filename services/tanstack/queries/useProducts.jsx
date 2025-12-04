import { useQuery } from "@tanstack/react-query";
import { queryKeys } from ".";
import { fetchProducts } from "@/services/product";

const useProducts = (payload) => {
  return useQuery({
    queryKey: [queryKeys.products, payload],
    queryFn: () => fetchProducts(payload),
  });
};

export default useProducts;