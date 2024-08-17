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
import { TravelerGuard } from "./TravelerGuard";
import { AdminGuard } from "./AdminGuard";
import Error from "@/pages/error";
import { GuestTravelerGuard } from "./GuestTravelerGuard";
import HiddenGems from "@/pages/hiddenGems";

const Router = () => {
  const ArticlePath = [
    {
      path: "/articles",
      element: <GuestTravelerGuard />,
      children: [
        {
          path: "/articles",
          element: <Articles />,
        },
        {
          path: "/articles/result",
          element: <ArticleSearchResult />,
        },
      ],
    },
    {
      path: "/article/:articleId",
      element: <GuestTravelerGuard />,
      children: [
        {
          path: "/article/:articleId",
          element: <ArticleDetail />,
        },
      ],
    },
  ];

  const AuthPath = [
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

  const HiddenGemsPath = [
    {
      path: "/hidden-gems",
      element: <GuestTravelerGuard />,
      children: [
        {
          path: "/hidden-gems",
          element: <HiddenGems />,
        },
      ],
    },
    {
      path: "/hidden-gems/post",
      element: <TravelerGuard />,
      children: [
        {
          path: "/hidden-gems/post",
          element: <HiddenGemsPost />,
        },
      ],
    },
  ];

  const GuestPath = [
    {
      path: "/",
      element: <GuestTravelerGuard />,
      children: [
        {
          path: "/",
          element: <Index />,
        },
      ],
    },
  ];

  const AdminRoutes = [
    {
      path: "/admin",
      element: <AdminGuard />,
      children: [
        {
          path: "/admin",
          element: <DashboardAdmin />,
        },
      ],
    },
  ];

  const TravelerRoutes = [
    {
      path: "/traveler",
      element: <TravelerGuard />,
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
          path: "/traveler/create/event",
          element: <div>Create Event</div>,
        },
      ],
    },
  ];

  const UserRoutes = [
    ...AdminRoutes,
    ...TravelerRoutes,
    ...GuestPath,
    ...AuthPath,
    ...HiddenGemsPath,
    ...ArticlePath,
  ];

  const routes: RouteObject[] = [
    ...UserRoutes,
    {
      path: "*",
      element: <Error code={404} message="Page not found" />,
    },
  ];

  const router: RouterProviderProps["router"] = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default Router;
