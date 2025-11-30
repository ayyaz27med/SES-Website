import axios from "axios";

import { useSessionStore } from "../store/session";

const URL = process.env.NEXT_PUBLIC_API_URL;

export const getApiURL = () => {
  return URL;
};

const DEFAULT_HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "ngrok-skip-browser-warning": "true",
};

const instance = axios.create({
  baseURL: URL,
  headers: DEFAULT_HEADERS,
});

instance.interceptors.request.use((request) => {
  const { token } = useSessionStore.getState();
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

instance.interceptors.response.use(
  (response) => {
    // Any status code that lies within the range of 2xx causes this function to trigger
    return response;
  },
  (error) => {
    const { response } = error;
    if (response) {
      // Handle specific status codes
      switch (response.status) {
        case 429:
          // Handle bad request
          //   ToastHelper.error("Too many requests");
          // console.error('Bad Request:', response.data.message);
          break;
      }
    } else {
      // Handle errors without a response
      // console.error('Error:', error.message);
    }

    return Promise.reject(error);
  },
);

export const api = instance;
