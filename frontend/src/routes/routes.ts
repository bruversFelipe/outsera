import { lazy } from "react";
import type { ComponentType, LazyExoticComponent } from "react";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const MoviesList = lazy(() => import("../pages/Movies"));

export interface AppRoute {
  path: string;
  component: LazyExoticComponent<ComponentType>;
}

export const routes: AppRoute[] = [
  { path: "/dashboard", component: Dashboard },
  { path: "/movies", component: MoviesList },
];
