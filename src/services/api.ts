import axios from 'axios';
import { t } from 'i18next';

import { endpoints } from '@/lib/config/endpoints';
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

authenticatedAxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (!error.response) {
      return Promise.reject({
        ...error,
        message: t('common.no_response_received_from_the_server'),
      });
    }

    const originalRequest = error.config;

    const accessToken = useAuthStore.getState().accessToken;
    const refreshToken = useAuthStore.getState().refreshToken;

    if (
      error.response.status === 401 &&
      originalRequest &&
      accessToken &&
      refreshToken
    ) {
      // if refresh token is invalid or expired
      if (originalRequest.url?.includes(endpoints.REFRESH_TOKEN)) {
        return Promise.reject(error);
      }

      try {
        const response = await authenticatedAxiosInstance.post(
          endpoints.REFRESH_TOKEN,
          {
            refreshToken: refreshToken,
          }
        );
        const newAccessToken = response.data.access;
        const newRefreshToken = response.data.refresh;

        useAuthStore.getState().setAccessToken(newAccessToken);
        useAuthStore.getState().setRefreshToken(newRefreshToken);

        authenticatedAxiosInstance.defaults.headers.common['Authorization'] =
          `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return authenticatedAxiosInstance(originalRequest);
      } catch (error) {
        useAuthStore.getState().clear();
        window.location.reload();

        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);
