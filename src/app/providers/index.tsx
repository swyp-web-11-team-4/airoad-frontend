import { RouterProvider } from "react-router-dom";
import { QueryProvider } from "./query";
import { router } from "./router";

export function AppProvider() {
  return (
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  );
}
