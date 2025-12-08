import { useMutation } from '@tanstack/react-query'
import { mutationKeys } from '.'
import { uploadProfileImage } from '@/services/auth'

const useUploadProfileImage = (options) => {
  return useMutation({
    mutationKey: [mutationKeys.uploadProfileImage],
    mutationFn: (payload) => uploadProfileImage(payload),
    ...options,
  })
}

export default useUploadProfileImage
