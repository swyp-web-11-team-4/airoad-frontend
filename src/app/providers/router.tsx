import { createBrowserRouter } from "react-router-dom";
import { MainPage } from "@/pages/main/ui";
import TripList from "@/pages/trip-list/ui";
import { PAGE_ROUTES } from "@/shared/config/page-routers";

export const router = createBrowserRouter([
  {
    path: PAGE_ROUTES.ROOT,
    element: <MainPage />,
  },
  {
    path: PAGE_ROUTES.TRIP_LIST,
    element: <TripList />,
  },
]);
