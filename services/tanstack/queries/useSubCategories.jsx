import { useQuery } from "@tanstack/react-query";
import { queryKeys } from ".";
import { fetchSubCategories } from "@/services/menu";

const useSubCategories = (payload) => {
  return useQuery({
    queryKey: [queryKeys.subCategories, payload],
    queryFn: () => fetchSubCategories(payload),
  });
};

export default useSubCategories;