import { authApi } from './authApi';

export const fetchFaqs = async (params) => {
  const { data } = await authApi.get("faq", { params });
  return data?.data;
};

export const fetchBlogDetails = async (id) => {
  const { data } = await authApi.get(`blog/${id}`);
  return data?.data;
};