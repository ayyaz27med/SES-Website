import { useQuery } from "@tanstack/react-query";
import { queryKeys } from ".";
import { fetchBrandsGroup } from "@/services/menu";

const useBrandsGroup = (payload) => {
  return useQuery({
    queryKey: [queryKeys.brandsGroup, payload],
    queryFn: () => fetchBrandsGroup(payload),
  });
};

export default useBrandsGroup;
