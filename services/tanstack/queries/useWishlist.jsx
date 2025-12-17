import { useQuery } from "@tanstack/react-query";
import { queryKeys } from ".";
import { fetchWishlist } from "@/services/product";

const useWishlist = (payload) => {
  return useQuery({
    queryKey: [queryKeys.wishlist, payload],
    queryFn: () => fetchWishlist(payload),
  });
};

export default useWishlist;
