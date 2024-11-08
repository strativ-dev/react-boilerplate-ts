import { BrowserRouter, Route, Routes } from "react-router-dom";

import { publicRoutes } from "./public-routes";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "./paths";
import { privateRoutes } from "./private-routes";

export const BaseRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          {publicRoutes.map(({ path, Component }, i) => (
            <Route
              key={i}
              path={path}
              index={path === PUBLIC_ROUTES.LOGIN}
              element={<Component />}
            />
          ))}
        </Route>
        <Route path="dashboard">
          {privateRoutes.map(({ path, Component }, index) => (
            <Route
              key={index}
              path={path}
              index={path === PRIVATE_ROUTES.DASHBOARD}
              element={<Component />}
            />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
