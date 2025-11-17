import { create } from "zustand";
import type { ChatStream, MessageType } from "./chats.model";

interface ClientChat extends Omit<ChatStream, "messageStreamType"> {
  messageType: MessageType;
}

export interface ScheduledPlaceRef {
  id: number;
  name: string;
  dayNumber: number;
  category: string;
  imageUrl: string;
}

interface ChatState {
  chats: ClientChat[];
  scheduledPlaceRefList: ScheduledPlaceRef[];
  addChat: (chat: ClientChat) => void;
  clearChats: () => void;
  addScheduledPlaceRef: (scheduledPlaceRef: ScheduledPlaceRef) => void;
  removeScheduledPlaceRef: (id: number) => void;
  resetScheduledPlaceRefList: () => void;
  reset: () => void;
}

const initialState: Pick<ChatState, "chats" | "scheduledPlaceRefList"> = {
  chats: [],
  scheduledPlaceRefList: [],
};

export const useChatStore = create<ChatState>((set) => ({
  ...initialState,

  addChat: (chat) =>
    set((state) => ({
      chats: [...state.chats, chat],
    })),

  clearChats: () => set({ chats: [] }),

  addScheduledPlaceRef: (scheduledPlaceRef) => {
    set((state) => ({
      scheduledPlaceRefList: [...state.scheduledPlaceRefList, scheduledPlaceRef],
    }));
  },

  removeScheduledPlaceRef: (id) => {
    set((state) => ({
      scheduledPlaceRefList: state.scheduledPlaceRefList.filter((ref) => ref.id !== id),
    }));
  },

  resetScheduledPlaceRefList: () => {
    set({ scheduledPlaceRefList: initialState.scheduledPlaceRefList });
  },

  reset: () => set(initialState),
}));
