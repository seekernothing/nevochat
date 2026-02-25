import { create } from "zustand";

interface ChatState {
  chats: any[];
  activeChatId: string | null;
  messages: any[];
  triggeredChats: Set<string>;
  setChats: (chats: any[]) => void;
  setActiveChatId: (chatId: string | null) => void;
  setMessages: (messages: any[]) => void;
  addChat: (chat: any) => void;
  addMessage: (message: any) => void;
  clearMessages: () => void;
  markChatAsTriggered: (chatId: string) => void;
  hasChatBeenTriggered: (chatId: string) => boolean;
}

export const useChatStore = create<ChatState>((set, get) => ({
  chats: [],
  activeChatId: null,
  messages: [],
  triggeredChats: new Set(),

  setChats: (chats) => set({ chats }),
  setActiveChatId: (chatId) => set({ activeChatId: chatId }),
  setMessages: (messages) => set({ messages }),

  // ➕ Add new chat (on create)
  addChat: (chat) => set({ chats: [chat, ...get().chats] }),

  // 💬 Append a new message (user or assistant)
  addMessage: (message) => set({ messages: [...get().messages, message] }),

  // 🧹 Clear messages when switching chat
  clearMessages: () => set({ messages: [] }),

  markChatAsTriggered: (chatId) => {
    const triggered = new Set(get().triggeredChats);
    triggered.add(chatId);
    set({ triggeredChats: triggered });
  },

  hasChatBeenTriggered: (chatId) => {
    return get().triggeredChats.has(chatId);
  },
}));
