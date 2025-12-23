import { notifyMe } from "@/services/product";
import { mutationKeys } from ".";
import { useMutation } from "@tanstack/react-query";

const useNotifyMe = (options) => {
  return useMutation({
    mutationKey: [mutationKeys.notifyMe],
    mutationFn: (payload) => notifyMe(payload),
    ...options,
  })
}

export default useNotifyMe;
