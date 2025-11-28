import { create } from "zustand";
import type { MapPosition } from "./map.model";

interface MapState {
  center: MapPosition | null;
  level: number | null;
  setCenter: (center: MapPosition) => void;
  setLevel: (level: number) => void;
  setCenterAndLevel: (center: MapPosition, level: number) => void;
  reset: () => void;
}

const initialState = {
  center: null,
  level: null,
};

export const useMapStore = create<MapState>((set) => ({
  ...initialState,

  setCenter: (center) => set({ center }),

  setLevel: (level) => set({ level }),

  setCenterAndLevel: (center, level) => set({ center, level }),

  reset: () => set(initialState),
}));
