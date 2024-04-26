import { useAuth } from '@/libs/auth';
import { useStoreSelector } from '@/store';
import { ConfigProvider } from 'antd';
import { ComponentType, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

export const withoutAuth = <T extends object>(WrappedComponent: ComponentType<T>) => {
	return (props: T) => {
		const { isAuthenticated } = useAuth();
		const { primaryColor } = useStoreSelector((state) => state.app);

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
