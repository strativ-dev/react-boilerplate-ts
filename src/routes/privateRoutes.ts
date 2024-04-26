import { lazy } from 'react';
import { PRIVATE_ROUTES } from './paths';

const { DASHBOARD, PROFILE } = PRIVATE_ROUTES;

export const privateRoutes = [
	{
		path: DASHBOARD,
		Component: lazy(() => import('@/pages/Dashboard')),
	},
	{
		path: PROFILE,
		Component: lazy(() => import('@/pages/Profile')),
	},
];
