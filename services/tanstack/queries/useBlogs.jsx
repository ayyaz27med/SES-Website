import { useQuery } from "@tanstack/react-query";
import { queryKeys } from ".";
import { fetchBrands } from "@/services/menu";
import { fetchBlogs } from "@/services/blogs";

const useBlogs = (payload) => {
  return useQuery({
    queryKey: [queryKeys.blogs, payload],
    queryFn: () => fetchBlogs(payload),
  });
};

export default useBlogs;
