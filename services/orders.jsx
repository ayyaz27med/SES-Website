import { authApi } from './authApi';

export const fetchOrderDetails = async (id) => {
  const { data } = await authApi.get(`feedback-and-complaint/orders-rating/${id}`);
  return data?.data;
};