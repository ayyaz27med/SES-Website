import { useQuery } from "@tanstack/react-query";
import { queryKeys } from ".";
import { fetchBlogDetails } from "@/services/blogs";

const useBlogDetails = (id) => {
  return useQuery({
    queryKey: [queryKeys.blogDetails, id],
    queryFn: () => fetchBlogDetails(id),
    enabled: !!id,
  });
};

export default useBlogDetails;
