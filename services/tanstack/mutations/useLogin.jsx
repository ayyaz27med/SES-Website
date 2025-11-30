import { useMutation } from '@tanstack/react-query'
import { mutationKeys } from '.'
import { loginOrRegister } from '@/services/auth'

const useLoginOrRegister = (options) => {
  return useMutation({
    mutationKey: [mutationKeys.loginOrRegister],
    mutationFn: (payload) => loginOrRegister(payload),
    ...options,
  })
}

export default useLoginOrRegister
