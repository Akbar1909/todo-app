import { useRoutes } from "react-router-dom";
import { lazy } from "react";
import AboutPage from "../pages/AboutPage";

const HomePage = lazy(() => import("../pages/HomePage"));

function Router() {
  const routes = [
    {
      path: "/",
      element: <AboutPage />,
    },
  ];

  return useRoutes(routes);
}

export default Router;
