import { ComponentType } from 'react';
import { AccessProvider } from 'react-access-boundary-v2';
import { Navigate, useLocation } from 'react-router-dom';

import useAuthStore from '@/stores/useAuthStore';

export const withAuth = <T extends object>(
  WrappedComponent: ComponentType<T>
) => {
  return (props: T) => {
    const location = useLocation();

    const permissions = useAuthStore((state) => state.permissions);
    const accessToken = useAuthStore((state) => state.token);

    if (!accessToken) {
      return <Navigate to="/" state={location} />;
    }

    return (
      <AccessProvider permissions={permissions}>
        <WrappedComponent {...props} />
      </AccessProvider>
    );
  };
};
