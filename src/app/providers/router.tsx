import { createBrowserRouter } from "react-router-dom";
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
    path: "/users",
    element: <UsersPage />,
  },
]);
