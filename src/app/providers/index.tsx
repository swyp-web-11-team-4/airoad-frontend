import { Theme } from "@radix-ui/themes";
import { RouterProvider } from "react-router-dom";

import { QueryProvider } from "./query-provider";
import { router } from "./router";

import "@radix-ui/themes/styles.css";

export function AppProvider() {
  return (
    <QueryProvider>
      <Theme>
        <RouterProvider router={router} />
      </Theme>
    </QueryProvider>
  );
}
