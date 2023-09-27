import { Route, Routes } from "react-router-dom";
import routes, { guardedRoutes } from "./globals/routes";
import GuardedRoute from "./_utils/GuardedRoute/GuardedRoute";
import { useAuthData } from "./hooks/useAuthData";

export function RoutesProvider() {
  const { claims, gotClaims } = useAuthData();
  return (
    <>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            Component={route.component}
          />
        ))}

        {gotClaims &&
          guardedRoutes.map((route: any) => (
            <Route
              key={route.path}
              element={<GuardedRoute isAuthenticated={claims.length > 0} />}
            >
              <Route Component={route.component} path={route.path} />
            </Route>
          ))}
      </Routes>
    </>
  );
}
