import { useMutation } from '@tanstack/react-query'
import { mutationKeys } from '.'
import { verifyOtp } from '@/services/auth'

const useVerifyOtp = (options) => {
  return useMutation({
    mutationKey: [mutationKeys.verifyOtp],
    mutationFn: (payload) => verifyOtp(payload),
    ...options,
  })
}

export default useVerifyOtp
