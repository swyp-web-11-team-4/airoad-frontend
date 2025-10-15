import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from ".";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

(async () => {
  const { initMocks } = await import("../app/mocks");
  await initMocks();

  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
})();
