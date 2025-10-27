import { createBrowserRouter } from "react-router-dom";
import { MainPage } from "@/pages/main/ui";
import { UsersPage } from "@/pages/users";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        Home Page - <a href="/users">Go to Users Page</a>
      </div>
    ),
  },
  {
    path: "/main",
    element: <MainPage />,
  },
  {
    path: "/users",
    element: <UsersPage />,
  },
]);
