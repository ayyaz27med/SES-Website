import { useQuery } from "@tanstack/react-query";
import { queryKeys } from ".";
import { fetchGoogleReviews } from "@/services/reviews";

const useGoogleReviews = (payload) => {
  return useQuery({
    queryKey: [queryKeys.googleReviews, payload],
    queryFn: () => fetchGoogleReviews(payload),
  });
};

export default useGoogleReviews;
