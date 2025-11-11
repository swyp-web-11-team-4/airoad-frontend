import { setupWorker } from "msw/browser";
import { userHandlers } from "@/entities/members/api";

export const worker = setupWorker(...userHandlers);
