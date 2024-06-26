import nProgress from 'nprogress';
import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Spin } from '@/components/Atoms';
import useAppStore from '@/store/useAppStore';
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from './paths';
import { privateRoutes } from './privateRoutes';
import { publicRoutes } from './publicRoutes';

const SignInLayout = lazy(() => import('@/layouts/SignInLayout'));
const DashboardLayout = lazy(() => import('@/layouts/DashboardLayout'));
const NotFound = lazy(() => import('@/features/not-found'));

export const BaseRoutes = () => {
	const routeChange = useAppStore((state) => state.routeChange);

	useEffect(() => {
		if (routeChange === 'start') {
			nProgress.start();
		} else {
			nProgress.done();
		}
	}, [routeChange]);

	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<SignInLayout />}>
					{publicRoutes.map(({ path, Component }, i) => (
						<Route
							key={i}
							path={path}
							index={path === PUBLIC_ROUTES.SIGNIN}
							element={
								<Suspense fallback={<Spin type='content-centre' size='large' />}>
									<Component />
								</Suspense>
							}
						/>
					))}
				</Route>
				<Route path='dashboard' element={<DashboardLayout />}>
					{privateRoutes.map(({ path, Component }, index) => (
						<Route
							key={index}
							path={path}
							index={path === PRIVATE_ROUTES.DASHBOARD}
							element={
								<Suspense fallback={<Spin type='content-centre' size='large' />}>
									<Component />
								</Suspense>
							}
						/>
					))}
				</Route>
				<Route path='*' element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
};
