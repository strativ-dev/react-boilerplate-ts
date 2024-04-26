import { lazy } from 'react';
import { PUBLIC_ROUTES } from './paths';

export const publicRoutes = [
	{
		path: PUBLIC_ROUTES.SIGNIN,
		Component: lazy(() => import('~/features/signin')),
	},
	{
		path: PUBLIC_ROUTES.FORGOT_PASSWORD,
		Component: lazy(() => import('~/features/forgot-password')),
	},
	{
		path: PUBLIC_ROUTES.RESET_PASSWORD,
		Component: lazy(() => import('~/features/reset-password')),
	},
];
