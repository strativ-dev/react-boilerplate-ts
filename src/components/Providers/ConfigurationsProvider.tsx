import React, { useEffect } from 'react';

import useAuthStore from '@/stores/useAuthStore';

interface ConfigurationsProviderProps {
  loading: React.ReactNode;
  children: React.ReactNode;
}

const ConfigurationsProvider = ({ children }: ConfigurationsProviderProps) => {
  const setPermissions = useAuthStore((state) => state.setPermissions);
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    // fetch permissions or profile info and set them
    setPermissions([]);
    setUser(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
};

export default ConfigurationsProvider;
