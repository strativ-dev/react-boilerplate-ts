import { lazy } from 'react';
import { PRIVATE_ROUTES } from './paths';

const { DASHBOARD, PROFILE } = PRIVATE_ROUTES;

export const privateRoutes = [
	{
		path: DASHBOARD,
		Component: lazy(() => import('@/features/Dashboard')),
	},
	{
		path: PROFILE,
		Component: lazy(() => import('@/features/Profile')),
	},
];
