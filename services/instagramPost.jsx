import { authApi } from './authApi';

export const fetchInstagramPosts = async (params) => {
  const { data } = await authApi.get("instagram-post", { params });
  return data?.data;
};
