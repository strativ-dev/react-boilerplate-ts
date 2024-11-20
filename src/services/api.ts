import axios from 'axios';

import useAuthStore from '@/stores/useAuthStore';

export const publicAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
});

export const authenticatedAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
});

authenticatedAxiosInstance.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});
