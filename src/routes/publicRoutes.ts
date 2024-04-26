import { lazy } from 'react';
import { PUBLIC_ROUTES } from './paths';

export const publicRoutes = [
	{
		path: PUBLIC_ROUTES.SIGNIN,
		Component: lazy(() => import('@/features/SignIn')),
	},
	{
		path: PUBLIC_ROUTES.FORGOT_PASSWORD,
		Component: lazy(() => import('@/features/ForgotPassword')),
	},
	{
		path: PUBLIC_ROUTES.RESET_PASSWORD,
		Component: lazy(() => import('@/features/ResetPassword')),
	},
];
