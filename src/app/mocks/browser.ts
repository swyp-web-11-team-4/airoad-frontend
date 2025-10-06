import { setupWorker } from "msw/browser";
import { userHandlers } from "@/entities/user/mocks";
import { createUserHandlers } from "@/features/create-user/mocks";

export const worker = setupWorker(...userHandlers, ...createUserHandlers);
