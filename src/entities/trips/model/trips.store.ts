import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { CreateTrip, TripId } from "./trips.model";

const STORAGE_KEY = "tripPlanData";

export type TripPlanDataState = {
  tripMetaData: CreateTrip | null;
  updateTripMetaData: (params: CreateTrip) => void;
  removeTripMetaData: () => void;

  tripIdData: TripId | null;
  updateTripIdData: (params: TripId) => void;
  removeTripIdData: () => void;
};

export const useTripPlanStore = create<TripPlanDataState>()(
  persist(
    (set) => ({
      tripMetaData: null,
      tripIdData: null,

      updateTripMetaData: (params) => set({ tripMetaData: params }),
      removeTripMetaData: () => set({ tripMetaData: null }),

      updateTripIdData: (params) => set({ tripIdData: params }),
      removeTripIdData: () => set({ tripIdData: null }),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
