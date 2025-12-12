import { authApi } from './authApi';

export const fetchGoogleReviews = async (params) => {
  const { data } = await authApi.get("google-review", { params });
  return data?.data;
};
