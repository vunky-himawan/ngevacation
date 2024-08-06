import { useAuth } from "@/context/authContext";
import Index from "@/pages";
import Auth from "@/pages/auth";
import DashboardTraveler from "@/pages/traveler/dashboard";
import DashboardAdmin from "@/pages/admin/dashboard";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
  RouterProviderProps,
} from "react-router-dom";
import { AuthGuard } from "./AuthGuard";
import { RouteAuthGuard } from "./RouteAuthGuard";

const Router = () => {
  const { role } = useAuth();

  const GuestRoutes = [
    {
      path: "/",
      element: <Index />,
    },
    {
      path: "/auth",
      element: <RouteAuthGuard />,
      children: [
        {
          path: "/auth/:provider",
          element: <Auth />,
        },
      ],
    },
  ];

  const AdminRoutes = [
    {
      path: "/admin",
      element: <AuthGuard />,
      children: [
        {
          path: "/admin/dashboard",
          element: <DashboardAdmin />,
        },
      ],
    },
  ];

  const TravelerRoutes = [
    {
      path: "/traveler",
      element: <AuthGuard />,
      children: [
        {
          path: "/traveler/dashboard",
          element: <DashboardTraveler />,
        },
      ],
    },
  ];

  const UserRoutes = [
    ...(role === "admin" ? AdminRoutes : TravelerRoutes),
    {
      path: "/auth/change-password",
      element: <div>Change Password</div>,
    },
  ];

  const routes: RouteObject[] = [...UserRoutes, ...GuestRoutes];

  const router: RouterProviderProps["router"] = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default Router;
