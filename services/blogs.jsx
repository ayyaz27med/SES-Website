import { authApi } from './authApi';

export const fetchBlogs = async (params) => {
  const { data } = await authApi.get("blog", { params });
  return data?.data;
};

export const fetchBlogDetails = async (id) => {
  const { data } = await authApi.get(`blog/${id}`);
  return data?.data;
};