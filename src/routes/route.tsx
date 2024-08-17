import { useAuth } from "@/context/authContext";
import Index from "@/pages";
import Auth from "@/pages/auth";
import DashboardAdmin from "@/pages/admin/dashboard";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
  RouterProviderProps,
} from "react-router-dom";
import { AuthGuard } from "./AuthGuard";
import { RouteAuthGuard } from "./RouteAuthGuard";
import WriteArticle from "@/pages/traveler/WriteArticle";
import Articles from "@/pages/articles";
import ArticleDetail from "@/pages/article/article";
import ArticleSearchResult from "@/pages/article/articleSearchResult";
import TravelerArticles from "@/pages/traveler/articles";
import ArticleEdit from "@/pages/traveler/articleEdit";
import TravelerLibrary from "@/pages/traveler/library";
import HiddenGemsPost from "@/pages/hidden-gems/hiddenGemsPost";

const Router = () => {
  const { role } = useAuth();

  const articlePath = [
    {
      path: "/articles",
      element: <Articles />,
    },
    {
      path: "/articles/result",
      element: <ArticleSearchResult />,
    },
    {
      path: "/article/:articleId",
      element: <ArticleDetail />,
    },
  ];

  const authPath = [
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

  const GuestRoutes = [
    {
      path: "/",
      children: [
        {
          path: "/",
          element: <Index />,
        },
      ],
    },
    ...authPath,
    ...articlePath,
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
          path: "/traveler/write",
          element: <WriteArticle />,
        },
        {
          path: "/traveler/plans",
          element: <div>Plans Page</div>,
        },
        {
          path: "/traveler/events",
          element: <div>Events Page</div>,
        },
        {
          path: "/traveler",
          children: [
            {
              path: "/traveler/articles",
              element: <TravelerArticles />,
            },
            { path: "/traveler/library", element: <TravelerLibrary /> },
            {
              path: "/traveler/:articleId/edit",
              element: <ArticleEdit />,
            },
          ],
        },
        {
          path: "/traveler/hidden-gems/post",
          element: <HiddenGemsPost />,
        },
        {
          path: "/traveler/create/event",
          element: <div>Create Event</div>,
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
