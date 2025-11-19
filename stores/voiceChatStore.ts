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
  updateMessage: (id: string, content: string) => void
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

      updateMessage: (id: string, content: string) => {
        const currentMessages = get().messages
        const updatedMessages = currentMessages.map((msg) =>
          msg.id === id ? { ...msg, content } : msg
        )
        set({ messages: updatedMessages })
      },

      clearMessages: () => set({ messages: [] }),
    }),
    {
      name: 'nara-voice-chat-storage', // localStorage key
    }
  )
)
