import { setupWorker } from "msw/browser";
import { userHandlers } from "@/entities/member";

export const worker = setupWorker(...userHandlers);
