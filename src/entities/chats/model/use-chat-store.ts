import { create } from "zustand";
import type { Chat, ErrorMessage } from "./chat.types";

interface ChatState {
  chats: Chat[];
  error: ErrorMessage | null;
  isWaitingResponse: boolean;
  addChat: (chat: Chat) => void;
  setError: (error: ErrorMessage | null) => void;
  setWaitingResponse: (isWaiting: boolean) => void;
  clearChats: () => void;
  reset: () => void;
}

const initialState = {
  chats: [],
  error: null,
  isWaitingResponse: false,
};

export const useChatStore = create<ChatState>((set) => ({
  ...initialState,

  addChat: (chat) =>
    set((state) => ({
      chats: [...state.chats, chat],
    })),

  setError: (error) => set({ error }),

  setWaitingResponse: (isWaiting) => set({ isWaitingResponse: isWaiting }),

  clearChats: () => set({ chats: [] }),

  reset: () => set(initialState),
}));
