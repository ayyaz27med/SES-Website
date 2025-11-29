import { useSessionStore } from "@/store/session";
import axios from "axios";

export const authApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

authApi.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const { token } = useSessionStore.getState();  
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
