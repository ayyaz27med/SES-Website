import { useMutation } from '@tanstack/react-query'
import { mutationKeys } from '.'
import { getInTouch } from '@/services/contacts'

const useGetInTouch = (options) => {
  return useMutation({
    mutationKey: [mutationKeys.getInTouch],
    mutationFn: (payload) => getInTouch(payload),
    ...options,
  })
}

export default useGetInTouch
