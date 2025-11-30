import { authApi } from './authApi';
import { api } from './instance'

export const fetchBrands = async (params) => {
  const { data } = await api.get("menu/brands", { params });
  return data?.data;
};

export const fetchCategories = async (params) => {
  const { data } = await authApi.get("menu/categories", { params });
  return data?.data;
};

export const fetchSubCategories = async (params) => {
  const { data } = await authApi.get("menu", { params });
  return data?.data;
};