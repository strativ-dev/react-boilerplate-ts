import axios from "axios";

import useAuthStore from "@/stores/useAuthStore";

// Axios instance with interceptors
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
});

// Add token to requests
axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
