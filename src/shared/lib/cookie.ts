import { getCookie, removeCookie, setCookie } from "typescript-cookie";
import type { PersistStorage, StorageValue } from "zustand/middleware";

export const createCookiesStorage = <T>(): PersistStorage<T> => ({
  getItem: (name: string): StorageValue<T> | null => {
    const value = getCookie(name);
    return value ? JSON.parse(value) : null;
  },

  setItem: (name: string, value: StorageValue<T>): void => {
    setCookie(name, JSON.stringify(value), { expires: 1 });
  },

  removeItem: (name: string): void => {
    removeCookie(name);
  },
});
