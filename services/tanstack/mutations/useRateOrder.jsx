import { useMutation } from '@tanstack/react-query'
import { mutationKeys } from '.'
import { rateOrder } from '@/services/product'

const useRateOrder = (options) => {
  return useMutation({
    mutationKey: [mutationKeys.rateOrder],
    mutationFn: (payload) => rateOrder(payload),
    ...options,
  })
}

export default useRateOrder
