import { useQuery } from "@tanstack/react-query";
import { queryKeys } from ".";
import { fetchCategories } from "@/services/menu";

const useCategories = (payload) => {
  return useQuery({
    queryKey: [queryKeys.categories, payload],
    queryFn: () => fetchCategories(payload),
  });
};

export default useCategories;