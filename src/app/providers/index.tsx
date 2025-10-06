import { RouterProvider } from "react-router-dom";
import { QueryProvider } from "./query-provider";
import { router } from "./router";

export function AppProvider() {
  return (
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  );
}
