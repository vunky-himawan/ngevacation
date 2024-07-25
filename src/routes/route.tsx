import Index from "@/pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Router = () => {
  const PublicRoutes = [
    {
      path: "/",
      element: <Index />,
    },
  ];

  // const AdminRoutes = [
  //   {
  //     path: "/admin",
  //     element: <div>Admin</div>,
  //   },
  //   {
  //     path: "/admin/dashboard",
  //     element: <div>Dashboard</div>,
  //   },
  //   {
  //     path: "/admin/users",
  //     element: <div>Users</div>,
  //   },
  // ];

  // const TravelerRoutes = [
  //   {
  //     path: "/traveler",
  //     element: <div>Traveler</div>,
  //   },
  //   {
  //     path: "/traveler/dashboard",
  //     element: <div>Dashboard</div>,
  //   },
  // ];

  // const RoutesCantAccessAfterAuth = [
  //   {
  //     path: "/",
  //     element: <div>Home</div>,
  //   },
  // ];

  const router = createBrowserRouter([...PublicRoutes]);

  return <RouterProvider router={router} />;
};

export default Router;
