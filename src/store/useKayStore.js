import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Counter untuk unique IDs
let messageIdCounter = 0;

export const useKayStore = create(
    persist(
        (set, get) => ({
            // State
            isOpen: false,
            isMinimized: false,
            chatHistory: [
                {
                    id: `msg-${++messageIdCounter}`,
                    sender: 'kay',
                    text: "Halo! Selamat datang di Bali! Aku KAY, pemandu virtual kamu 🌺",
                    timestamp: Date.now(),
                    type: 'text'
                }
            ],
            avatarState: 'neutral', // 'neutral' | 'happy' | 'excited' | 'thinking' | 'surprised'
            isSpeaking: false,
            unreadCount: 1,

            // Actions
            setOpen: (isOpen) => set({ isOpen, unreadCount: isOpen ? 0 : get().unreadCount }),
            toggleOpen: () => set((state) => ({ isOpen: !state.isOpen, unreadCount: !state.isOpen ? 0 : state.unreadCount })),
            minimize: (isMinimized) => set({ isMinimized }),

            addMessage: (message) => set((state) => {
                const newMsg = {
                    id: `msg-${++messageIdCounter}`,
                    timestamp: Date.now(),
                    ...message
                };

                return {
                    chatHistory: [...state.chatHistory, newMsg],
                    unreadCount: state.isOpen ? 0 : state.unreadCount + 1,
                    avatarState: message.sender === 'kay' ? 'speaking' : 'thinking'
                };
            }),

            clearHistory: () => set({ chatHistory: [] }),

            setAvatarState: (state) => set({ avatarState: state }),
            setSpeaking: (isSpeaking) => set({ isSpeaking }),
        }),
        {
            name: 'kay-storage',
            partialize: (state) => ({ chatHistory: state.chatHistory }), // Only persist history
        }
    )
);
