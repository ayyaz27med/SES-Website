import { useQuery } from "@tanstack/react-query";
import { queryKeys } from ".";
import { fetchInstagramPosts } from "@/services/instagramPost";

const useInstagramPosts = (payload) => {
  return useQuery({
    queryKey: [queryKeys.instagramPosts, payload],
    queryFn: () => fetchInstagramPosts(payload),
  });
};

export default useInstagramPosts;
