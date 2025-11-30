import { useQuery } from "@tanstack/react-query";
import { queryKeys } from ".";
import { fetchBrands } from "@/services/menu";

const useBrands = (payload) => {
  return useQuery({
    queryKey: [queryKeys.brands, payload],
    queryFn: () => fetchBrands(payload),
  });
};

export default useBrands;
