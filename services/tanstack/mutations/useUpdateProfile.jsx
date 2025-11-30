import { useMutation } from '@tanstack/react-query'
import { mutationKeys } from '.'
import { updateProfile } from '@/services/user'

const useUpdateProfile = (options) => {
  return useMutation({
    mutationKey: [mutationKeys.updateProfile],
    mutationFn: (payload) => updateProfile(payload),
    ...options,
  })
}

export default useUpdateProfile
