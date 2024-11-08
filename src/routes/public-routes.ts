import { lazy } from "react";
import { PUBLIC_ROUTES } from "./paths";

export const publicRoutes = [
  {
    path: PUBLIC_ROUTES.LOGIN,
    Component: lazy(() => import("@/app/authentication/login")),
  },
];
