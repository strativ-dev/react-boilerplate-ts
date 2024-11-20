import { useMutation, useQuery } from '@tanstack/react-query';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

import { authenticatedAxiosInstance, publicAxiosInstance } from './api';
import useErrorNotification from '@/hooks/useErrorNotification';
import { endpoints } from '@/lib/config/endpoints';
import { ROUTES } from '@/routes/paths';
import { useAuthStore } from '@/stores/useAuthStore';

type UseLoginMutationPayload = {
  email: string;
  password: string;
};

type UseLoginMutationResponse = {
  access_token: string;
  refresh_token: string;
};

const loginMutation = (payload: UseLoginMutationPayload) => {
  return publicAxiosInstance.post<UseLoginMutationResponse>(
    endpoints.LOGIN,
    payload
  );
};

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setRefreshToken = useAuthStore((state) => state.setRefreshToken);

  return useMutation({
    mutationFn: loginMutation,
    onSuccess: (data) => {
      setAccessToken(data.data.access_token);
      setRefreshToken(data.data.refresh_token);

      message.success('Logged in successfully!');
      navigate(ROUTES.DASHBOARD);
    },
    onError: (error: Error) => {
      message.error(error.message || 'Invalid credentials');
    },
  });
};

const myProfileQuery = () => {
  return authenticatedAxiosInstance.get(endpoints.MY_PROFILE);
};

export const useMyProfileQuery = ({ isEnabled }: { isEnabled: boolean }) => {
  const query = useQuery({
    queryKey: ['my-profile'],
    queryFn: () => myProfileQuery().then((res) => res.data),
    enabled: isEnabled,
  });

  useErrorNotification({
    isError: query.isError,
    errorMessage: query.error?.message,
  });

  return query;
};

export const useLogoutMutation = () => {
  return useAuthStore((state) => state.clear);
};
