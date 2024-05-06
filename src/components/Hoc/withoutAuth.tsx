import { ConfigProvider } from 'antd';
import { ComponentType, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '~/libs/auth';
import { useAppStore } from '~/store/useAppStore';

export const withoutAuth = <T extends object>(WrappedComponent: ComponentType<T>) => {
	return (props: T) => {
		const { isAuthenticated } = useAuth();
		const { primaryColor } = useAppStore();

		useEffect(() => {
			if (primaryColor) {
				ConfigProvider.config({ theme: { primaryColor } });
			}
		}, [primaryColor]);

		if (isAuthenticated) {
			return <Navigate to='/dashboard' />;
		}

		return <WrappedComponent {...props} />;
	};
};
