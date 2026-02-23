import { create } from "zustand";

interface ChatState {
  activeChatId: string | null;
  setActiveChatId: (id: string | null) => void;
}

export const useChatStore = create<ChatState>((set: any) => ({
  activeChatId: null,
  setActiveChatId: (id: string | null) => set({ activeChatId: id }),
}));
