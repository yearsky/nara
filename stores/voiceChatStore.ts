import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  audioUrl?: string
  timestamp: number
}

interface VoiceChatState {
  messages: Message[]
  addMessage: (message: Message) => void
  clearMessages: () => void
}

export const useVoiceChatStore = create<VoiceChatState>()(
  persist(
    (set, get) => ({
      messages: [],

      addMessage: (message: Message) => {
        const currentMessages = get().messages
        // Limit to max 50 messages
        const newMessages = [...currentMessages, message].slice(-50)
        set({ messages: newMessages })
      },

      clearMessages: () => set({ messages: [] }),
    }),
    {
      name: 'nara-voice-chat-storage', // localStorage key
    }
  )
)
