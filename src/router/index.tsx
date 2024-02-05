import { useRoutes } from "react-router-dom";
import { lazy } from "react";

const HomePage = lazy(() => import("../pages/HomePage"));

function Router() {
  const routes = [
    {
      path: "/",
      element: <HomePage />,
    },
  ];

  return useRoutes(routes);
}

export default Router;
