import { setupWorker } from "msw/browser";
import { createUserHandlers, userHandlers } from "@/entities/user";

export const worker = setupWorker(...userHandlers, ...createUserHandlers);
