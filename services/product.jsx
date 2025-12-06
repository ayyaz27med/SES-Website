import { authApi } from './authApi';

export const fetchProducts = async (params) => {
  const { data } = await authApi.get("product-list-front", { params });
  return data?.data;
};

export const fetchProductDetails = async (id) => {
  const { data } = await authApi.get(`product-list-front/${id}`);
  return data?.data;
};