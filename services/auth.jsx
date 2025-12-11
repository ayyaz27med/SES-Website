import { api } from './instance'

export const loginOrRegister = async (payload) => {
  const { data } = await api.post('auth/login', payload)
  return data
}

export const verifyOtp = async (payload) => {
  const { id, data: otp } = payload
  const { data } = await api.put(`auth/verified-OTP/${id}`, otp)
  return data
}

export const uploadProfileImage = async (payload) => {
  const { data } = await api.post('auth/profile-photo', payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  return data
}