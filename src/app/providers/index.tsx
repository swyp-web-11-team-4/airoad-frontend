import { Theme } from "@radix-ui/themes";
import { RouterProvider } from "react-router";

import { QueryProvider } from "./query-provider";
import { router } from "./router";

import "@radix-ui/themes/styles.css";

export function AppProvider() {
  return (
    <QueryProvider>
      <Theme grayColor="gray">
        <RouterProvider router={router} />
      </Theme>
    </QueryProvider>
  );
}
