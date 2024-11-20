import React, { useEffect } from 'react';

import { useMyProfileQuery } from '@/services/authentication';
import useAuthStore from '@/stores/useAuthStore';

type ConfigurationsProviderProps = {
  loading: React.ReactNode;
  children: React.ReactNode;
};

const ConfigurationsProvider = ({
  children,
  loading,
}: ConfigurationsProviderProps) => {
  const setUser = useAuthStore((state) => state.setUser);
  const accessToken = useAuthStore((state) => state.accessToken);
  const setPermissions = useAuthStore((state) => state.setPermissions);

  const myProfileQuery = useMyProfileQuery({
    isEnabled: !!accessToken,
  });

  useEffect(() => {
    if (myProfileQuery.isFetched && myProfileQuery.data) {
      setUser(myProfileQuery.data);

      setPermissions([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myProfileQuery.data, myProfileQuery.isFetched]);

  if (myProfileQuery.isLoading) {
    return loading;
  }

  return children;
};

export default ConfigurationsProvider;
