import { ComponentType } from 'react';
import { AccessProvider } from 'react-access-boundary';
import { useQuery } from 'react-query';
import { Navigate, useLocation } from 'react-router-dom';

import { Spin } from '~/components/Atoms';
import { usersAPI } from '~/libs/api';
import { useAuth } from '~/libs/auth';
import { useStoreDispatch, useStoreSelector } from '~/store';
import { authActions } from '~/store/actions';

export const withAuth = <T extends object>(WrappedComponent: ComponentType<T>) => {
	return (props: T) => {
		const location = useLocation();
		const { isAuthenticated } = useAuth();
		const { user, permissions } = useStoreSelector((state) => state.auth);
		const dispatch = useStoreDispatch();

		const { isLoading } = useQuery('profile', () => usersAPI.profile(), {
			enabled: isAuthenticated && !user,
			onSuccess: (data) => {
				if (data && Object.entries(data).length) {
					dispatch(authActions.setUser(data));

					if (data?.permissions?.length) {
						const authPermissions = data.permissions.reduce((acc, curr) => {
							acc.push(curr.codename.toUpperCase());
							return acc;
						}, [] as string[]);
						dispatch(authActions.setPermissions(authPermissions));
					}
				}
			},
		});

		if (isLoading) {
			return <Spin type='window-centre' size='large' />;
		}

		if (!isAuthenticated) {
			return <Navigate to='/' state={location} />;
		}

		return (
			<AccessProvider permissions={permissions}>
				<WrappedComponent {...props} />
			</AccessProvider>
		);
	};
};
