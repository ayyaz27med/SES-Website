import { authApi } from './authApi';
import { api } from './instance'

export const updateProfile = async (payload) => {
  const { data } = await api.put(`auth/update`, payload)
  return data
}

export const fetchUserDetails = async () => {
  const { data } = await api.get(`auth/me`);
  return data;
};

export const fetchUserOrders = async (params) => {
  const { data } = await authApi.get("customer-order", { params });
  return data?.data;
};

export const fetchOrderDetails = async (id) => {
  const { data } = await api.get(`customer-order/${id}`);
  return data?.data;
};