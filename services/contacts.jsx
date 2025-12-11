import { authApi } from './authApi'

export const getInTouch = async (payload) => {
  const { data } = await authApi.post('contact', payload)
  return data
}

export const instoreComplaint = async (payload) => {
  const { data } = await authApi.post('in-store-complaint', payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  return data
}