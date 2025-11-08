import { createBrowserRouter } from "react-router";
import { MainPage } from "@/pages/main/ui";
import { RedirectPage } from "@/pages/redirect/ui";
import { TripChatPage } from "@/pages/trip-chat/ui";
import { TripListPage } from "@/pages/trip-list/ui";
import { PAGE_ROUTES } from "@/shared/config";
import { ChatLayout } from "@/widgets/chat-layout";
import { ErrorPage } from "@/widgets/error-page";
import { MainLayout } from "@/widgets/main-layout";
import { createProtectedLoader } from "../loaders/protected-loader";
import { queryClient } from "./query-provider";

export const router = createBrowserRouter([
  /* Public */
  {
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: PAGE_ROUTES.ROOT,
            element: <MainPage />,
          },
          {
            path: PAGE_ROUTES.REDIRECT,
            element: <RedirectPage />,
          },
        ],
      },
    ],
  },
  /* Protected */
  {
    loader: createProtectedLoader(queryClient),
    errorElement: <ErrorPage />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: PAGE_ROUTES.TRIP_LIST,
            element: <TripListPage />,
          },
        ],
      },
      {
        element: <ChatLayout />,
        children: [
          {
            path: PAGE_ROUTES.TRIP_PLAN,
            element: <TripChatPage />,
          },
        ],
      },
    ],
  },
]);
