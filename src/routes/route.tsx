import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import DashboardAdmin from "@/pages/admin/Dashboard";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
  RouterProviderProps,
} from "react-router-dom";
import { RouteAuthGuard } from "./RouteAuthGuard";
import WriteArticle from "@/pages/traveler/WriteArticle";
import Articles from "@/pages/Articles";
import ArticleDetail from "@/pages/article/Article";
import ArticleSearchResult from "@/pages/article/ArticleSearchResult";
import TravelerArticles from "@/pages/traveler/Articles";
import ArticleEdit from "@/pages/traveler/ArticleEdit";
import TravelerLibrary from "@/pages/traveler/Library";
import HiddenGemsPost from "@/pages/hidden-gems/HiddenGemsPost";
import { TravelerGuard } from "./TravelerGuard";
import { AdminGuard } from "./AdminGuard";
import Error from "@/pages/Error";
import { GuestTravelerGuard } from "./GuestTravelerGuard";
import HiddenGems from "@/pages/HiddenGems";
import HiddenGemsRequest from "@/pages/admin/hidden-gem/HiddenGemsRequest";
import HiddenGemsDetail from "@/pages/admin/hidden-gem/HiddenGemsDetail";
import EventRequest from "@/pages/admin/event/EventRequest";
import UserReportList from "@/pages/admin/report/UserReportList";
import EventPost from "@/pages/event/EventPost";
import HiddenGem from "@/pages/hidden-gems/HiddenGem";
import Events from "@/pages/Events";
import PlannerPost from "@/pages/planner/PlannerPost";
import Planner from "@/pages/traveler/planner/Planner";
import PlannerDetail from "@/pages/traveler/planner/PlannerDetail";
import HiddenGemSearchResult from "@/pages/hidden-gems/HiddenGemSearchResult";
import EventSearchResult from "@/pages/event/EventSearchResult";
import Event from "@/pages/event/Event";
import TravelerEvents from "@/pages/traveler/event/Events";
import EventUpdate from "@/pages/traveler/event/UpdateEvent";

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
        {
          path: "/hidden-gems/result",
          element: <HiddenGemSearchResult />,
        },
      ],
    },
    {
      path: "/hidden-gem/:hiddenGemId",
      element: <HiddenGem />,
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

  const PlannerPath = [
    {
      path: "/planner",
      element: <TravelerGuard />,
      children: [
        {
          path: "/planner/post",
          element: <PlannerPost />,
        },
      ],
    },
  ];

  const EventPath = [
    {
      path: "/events",
      element: <GuestTravelerGuard />,
      children: [
        {
          path: "/events",
          element: <Events />,
        },
        {
          path: "/events/result",
          element: <EventSearchResult />,
        },
      ],
    },
    {
      path: "/event/:eventId",
      element: <Event />,
    },
    {
      path: "/event/post",
      element: <TravelerGuard />,
      children: [
        {
          path: "/event/post",
          element: <EventPost />,
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
        {
          path: "/admin/event/request",
          element: <EventRequest />,
        },
        {
          path: "/admin/hidden-gem",
          children: [
            {
              path: "/admin/hidden-gem/request",
              element: <HiddenGemsRequest />,
            },
            {
              path: "/admin/hidden-gem/detail/:hiddenGemId",
              element: <HiddenGemsDetail />,
            },
          ],
        },
        {
          path: "/admin/user/report",
          element: <UserReportList />,
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
          element: <Planner />,
        },
        {
          path: "/traveler/events",
          element: <TravelerEvents />,
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
              path: "/traveler/article/:articleId/edit",
              element: <ArticleEdit />,
            },
            {
              path: "/traveler/event/:eventId/edit",
              element: <EventUpdate />,
            },
            {
              path: "/traveler/planner/:planId",
              element: <PlannerDetail />,
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
    ...EventPath,
    ...PlannerPath,
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
