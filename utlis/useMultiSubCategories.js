import { useQueries } from "@tanstack/react-query";
import useSubCategories from "@/services/tanstack/queries/useSubCategories";
import { fetchSubCategories } from "@/services/menu";

export function useMultiSubCategories(categoryIds, type) {
  const queries = useQueries({
    queries: categoryIds.map((id) => ({
      queryKey: ["subCategories", type, id],
      queryFn: () =>
        fetchSubCategories({
          category_id: id,
          type,
        }),
      enabled: !!id,
    })),
  });

  const data = queries.flatMap(
    (q) => q.data?.[type] || []
  );

  const isLoading = queries.some((q) => q.isLoading);

  return { data, isLoading };
}
