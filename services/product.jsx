import { authApi } from './authApi';
import { api } from './instance';

export const fetchProducts = async (params) => {
  const { data } = await authApi.get("product-list-front", { params });
  return data?.data;
};

export const fetchProductDetails = async (id) => {
  const { data } = await authApi.get(`product-list-front/${id}`);
  return data?.data;
};

export const fetchWishlist = async (params) => {
  const { data } = await authApi.get("customer-wishlist", { params });
  return data?.data;
};

export const toggleWishlist = async (payload) => {
  const { data } = await api.post(`customer-wishlist`, payload)
  return data
}

export const rateOrder = async (payload) => {
  const { data } = await api.post(`feedback-and-complaint/rate-our-service`, payload)
  return data
}