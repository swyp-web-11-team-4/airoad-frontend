import { createBrowserRouter } from "react-router";
import { RedirectPage } from "@/pages/redirect";
import { PAGE_ROUTES } from "@/shared/config";
import { ErrorPage } from "@/widgets/error-page";
import { MainLayout } from "@/widgets/main-layout";
import { createProtectedLoader } from "../loaders/protected-loader";
import { queryClient } from "./query-provider";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        loader: createProtectedLoader(queryClient),
        children: [
          {
            path: PAGE_ROUTES.TRIP,
            element: <div>Trip</div>,
          },
        ],
        errorElement: <ErrorPage />,
      },
      {
        children: [
          {
            path: PAGE_ROUTES.ROOT,
            element: <div>Home Page</div>,
          },
          {
            path: PAGE_ROUTES.REDIRECT,
            element: <RedirectPage />,
          },
        ],
      },
    ],
  },
]);
