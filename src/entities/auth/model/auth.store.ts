import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createCookiesStorage } from "@/shared/lib";
import type { TokenData } from "@/shared/type";
import { logout, refreshAccessToken } from "../api";

export interface AuthState extends TokenData {
  setTokens: (tokenData: TokenData) => void;
  logout: () => Promise<void>;
  reissue: () => Promise<TokenData>;
}

const authStoreStorage = createCookiesStorage<AuthState>();

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: "",
      refreshToken: "",

      setTokens: (tokenData: TokenData) => {
        set((prev) => ({ ...prev, ...tokenData }));
      },

      reissue: async () => {
        const refreshToken = get().refreshToken;
        const { data } = await refreshAccessToken({ refreshToken });
        set((prev) => ({ ...prev, ...data }));
        return data;
      },

      logout: async () => {
        await logout();
        set({ accessToken: "", refreshToken: "" });
      },
    }),
    {
      name: "auth-storage",
      storage: authStoreStorage,
    },
  ),
);
