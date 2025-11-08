import { setupWorker } from "msw/browser";
import { userHandlers } from "@/entities/member/api";

export const worker = setupWorker(...userHandlers);
