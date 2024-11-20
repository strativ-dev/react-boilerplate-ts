import { lazy } from 'react';
import { RouteGuard } from 'react-access-boundary-v2';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { PRIVATE_ROUTES, PUBLIC_ROUTES } from './paths';
import { privateRoutes } from './private-routes';
import { publicRoutes } from './public-routes';

import AuthenticationLayout from '@/components/Layouts/AuthenticationLayout';
import DashboardLayout from '@/components/Layouts/DashboardLayout';

const NotFound = lazy(() => import('@/app/not-found'));

export const BaseRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthenticationLayout />}>
          {publicRoutes.map(({ path, Component }, index) => (
            <Route
              key={index}
              path={path}
              index={path === PUBLIC_ROUTES.LOGIN}
              element={<Component />}
            />
          ))}
        </Route>

        <Route path={PRIVATE_ROUTES.INDEX} element={<DashboardLayout />}>
          {privateRoutes.map(({ path, Component, permissions }, index) => (
            <Route
              key={index}
              path={path}
              index={path === PRIVATE_ROUTES.INDEX}
              element={
                <RouteGuard permissions={permissions}>
                  <Component />
                </RouteGuard>
              }
            />
          ))}
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
