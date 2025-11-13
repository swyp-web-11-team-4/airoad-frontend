import { create } from "zustand";
import type { ChatStream, MessageType } from "./chats.model";

interface ClientChat extends Omit<ChatStream, "messageStreamType"> {
  messageType: MessageType;
}

interface ChatState {
  chats: ClientChat[];
  isWaitingResponse: boolean;
  addChat: (chat: ClientChat) => void;
  setWaitingResponse: (isWaiting: boolean) => void;
  clearChats: () => void;
  reset: () => void;
}

const initialState = {
  chats: [],
  isWaitingResponse: false,
};

export const useChatStore = create<ChatState>((set) => ({
  ...initialState,

  addChat: (chat) =>
    set((state) => ({
      chats: [...state.chats, chat],
    })),
  setWaitingResponse: (isWaiting) => set({ isWaitingResponse: isWaiting }),
  clearChats: () => set({ chats: [] }),
  reset: () => set(initialState),
}));
