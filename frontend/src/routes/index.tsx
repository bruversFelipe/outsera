import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import Loading from "../components/Loading";

function AppRoutes() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        {routes.map(({ path, component: Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
