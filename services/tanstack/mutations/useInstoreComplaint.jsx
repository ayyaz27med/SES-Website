import { useMutation } from '@tanstack/react-query'
import { mutationKeys } from '.'
import { instoreComplaint } from '@/services/contacts'

const useInstoreComplaint = (options) => {
  return useMutation({
    mutationKey: [mutationKeys.instoreComplaint],
    mutationFn: (payload) => instoreComplaint(payload),
    ...options,
  })
}

export default useInstoreComplaint
