import { useQuery } from "@tanstack/react-query";
import { queryKeys } from ".";
import { fetchFilters } from "@/services/menu";

const useFilters = (payload) => {
  return useQuery({
    queryKey: [queryKeys.filters, payload],
    queryFn: () => fetchFilters(payload),
  });
};

export default useFilters;
