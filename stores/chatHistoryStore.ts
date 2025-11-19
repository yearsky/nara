import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface HistoryMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
  isDisposed?: boolean
}

interface ChatHistoryState {
  // All messages including disposed ones
  allMessages: HistoryMessage[]

  // Currently visible messages (not disposed)
  visibleMessages: HistoryMessage[]

  // Disposed messages (for history sidebar)
  disposedMessages: HistoryMessage[]

  // Sidebar state
  isSidebarOpen: boolean

  // Search query
  searchQuery: string

  // Actions
  addMessage: (message: HistoryMessage) => void
  disposeMessage: (messageId: string) => void
  disposeOldMessages: (keepLastN: number) => void
  toggleSidebar: () => void
  setSearchQuery: (query: string) => void
  clearHistory: () => void
  getMessagesByDate: () => { [key: string]: HistoryMessage[] }
}

export const useChatHistoryStore = create<ChatHistoryState>()(
  persist(
    (set, get) => ({
      allMessages: [],
      visibleMessages: [],
      disposedMessages: [],
      isSidebarOpen: false,
      searchQuery: '',

      addMessage: (message: HistoryMessage) => {
        set((state) => ({
          allMessages: [...state.allMessages, message],
          visibleMessages: [...state.visibleMessages, message],
        }))
      },

      disposeMessage: (messageId: string) => {
        set((state) => {
          const messageToDispose = state.visibleMessages.find(m => m.id === messageId)
          if (!messageToDispose) return state

          const updatedMessage = { ...messageToDispose, isDisposed: true }

          return {
            visibleMessages: state.visibleMessages.filter(m => m.id !== messageId),
            disposedMessages: [...state.disposedMessages, updatedMessage],
            allMessages: state.allMessages.map(m =>
              m.id === messageId ? updatedMessage : m
            ),
          }
        })
      },

      disposeOldMessages: (keepLastN: number) => {
        const { visibleMessages } = get()
        if (visibleMessages.length <= keepLastN) return

        const messagesToDispose = visibleMessages.slice(0, -keepLastN)
        messagesToDispose.forEach(msg => get().disposeMessage(msg.id))
      },

      toggleSidebar: () => {
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen }))
      },

      setSearchQuery: (query: string) => {
        set({ searchQuery: query })
      },

      clearHistory: () => {
        set({
          allMessages: [],
          visibleMessages: [],
          disposedMessages: [],
        })
      },

      getMessagesByDate: () => {
        const { allMessages, searchQuery } = get()

        // Filter by search query if provided
        let filteredMessages = allMessages
        if (searchQuery) {
          filteredMessages = allMessages.filter(msg =>
            msg.content.toLowerCase().includes(searchQuery.toLowerCase())
          )
        }

        // Group by date
        const grouped: { [key: string]: HistoryMessage[] } = {}
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)

        filteredMessages.forEach(msg => {
          const msgDate = new Date(msg.timestamp)
          msgDate.setHours(0, 0, 0, 0)

          let key: string
          if (msgDate.getTime() === today.getTime()) {
            key = 'Today'
          } else if (msgDate.getTime() === yesterday.getTime()) {
            key = 'Yesterday'
          } else {
            key = msgDate.toLocaleDateString('id-ID', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })
          }

          if (!grouped[key]) {
            grouped[key] = []
          }
          grouped[key].push(msg)
        })

        return grouped
      },
    }),
    {
      name: 'nara-chat-history-storage',
    }
  )
)
