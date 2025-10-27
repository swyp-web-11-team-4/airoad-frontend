import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from ".";
import "react-day-picker/dist/style.css";
import "dayjs/locale/ko";
import dayjs from "dayjs";
import "@/app/styles/global.css";
dayjs.locale("ko");

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
