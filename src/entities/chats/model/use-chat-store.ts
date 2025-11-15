import { create } from "zustand";
import type { ChatStream, MessageType } from "./chats.model";

interface ClientChat extends Omit<ChatStream, "messageStreamType"> {
  messageType: MessageType;
}

interface ChatState {
  chats: ClientChat[];
  addChat: (chat: ClientChat) => void;
  clearChats: () => void;
  reset: () => void;
}

const initialState: Pick<ChatState, "chats"> = {
  chats: [],
};

export const useChatStore = create<ChatState>((set) => ({
  ...initialState,

  addChat: (chat) =>
    set((state) => ({
      chats: [...state.chats, chat],
    })),
  clearChats: () => set({ chats: [] }),
  reset: () => set(initialState),
}));
