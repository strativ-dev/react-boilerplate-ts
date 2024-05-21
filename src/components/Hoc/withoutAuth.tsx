import { ConfigProvider } from 'antd';
import { ComponentType } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '@/libs/auth';
import useAppStore from '@/store/useAppStore';

export const withoutAuth = <T extends object>(WrappedComponent: ComponentType<T>) => {
	return (props: T) => {
		const { isAuthenticated } = useAuth();
		const primaryColor = useAppStore((state) => state.primaryColor);

		if (isAuthenticated) {
			return <Navigate to='/dashboard' />;
		}

		return (
			<ConfigProvider theme={{ token: { colorPrimary: primaryColor } }}>
				<WrappedComponent {...props} />;
			</ConfigProvider>
		);
	};
};
