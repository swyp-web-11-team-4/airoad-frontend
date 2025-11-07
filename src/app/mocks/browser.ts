import { setupWorker } from "msw/browser";
import { userHandlers } from "@/entities/member/api";
import { deleteTripHandlers, getTripsListHandlers } from "@/entities/trips/api";

export const worker = setupWorker(...userHandlers, ...getTripsListHandlers, ...deleteTripHandlers);
