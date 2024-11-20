import { ComponentType } from 'react';
import { Navigate } from 'react-router-dom';

import { ROUTES } from '@/routes/paths';
import useAuthStore from '@/stores/useAuthStore';

export const withoutAuth = <T extends object>(
  WrappedComponent: ComponentType<T>
) => {
  return (props: T) => {
    const accessToken = useAuthStore((state) => state.accessToken);

    if (accessToken) {
      return <Navigate to={ROUTES.DASHBOARD} />;
    }

    return <WrappedComponent {...props} />;
  };
};
