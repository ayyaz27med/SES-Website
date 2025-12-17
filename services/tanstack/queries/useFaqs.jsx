import { useQuery } from "@tanstack/react-query";
import { queryKeys } from ".";
import { fetchFaqs } from "@/services/faqs";

const useFaqs = (payload) => {
  return useQuery({
    queryKey: [queryKeys.faqs, payload],
    queryFn: () => fetchFaqs(payload),
  });
};

export default useFaqs;
