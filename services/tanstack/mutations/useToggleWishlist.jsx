import { toggleWishlist } from "@/services/product";
import { mutationKeys } from ".";
import { useMutation } from "@tanstack/react-query";

const useToggleWishlist = (options) => {
  return useMutation({
    mutationKey: [mutationKeys.toggleWishlist],
    mutationFn: (payload) => toggleWishlist(payload),
    ...options,
  })
}

export default useToggleWishlist;
