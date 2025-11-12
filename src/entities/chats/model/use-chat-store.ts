import { create } from "zustand";
import type { Chat, ErrorMessage } from "./chat.types";

interface ChatState {
  chats: Chat[];
  error: ErrorMessage | null;
  addChat: (chat: Chat) => void;
  setError: (error: ErrorMessage | null) => void;
  clearChats: () => void;
  reset: () => void;
}

const initialState = {
  chats: [],
  error: null,
};

export const useChatStore = create<ChatState>((set) => ({
  ...initialState,

  addChat: (chat) =>
    set((state) => ({
      chats: [...state.chats, chat],
    })),

  setError: (error) => set({ error }),

  clearChats: () => set({ chats: [] }),

  reset: () => set(initialState),
}));
