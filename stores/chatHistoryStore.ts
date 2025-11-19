import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface HistoryMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
  isDisposed?: boolean
}

export interface Conversation {
  id: string
  summary: string // Generated summary or first user message
  messages: HistoryMessage[]
  startTime: number
  lastMessageTime: number
}

interface ChatHistoryState {
  // All messages including disposed ones
  allMessages: HistoryMessage[]

  // Currently visible messages (not disposed)
  visibleMessages: HistoryMessage[]

  // Disposed messages (for history sidebar)
  disposedMessages: HistoryMessage[]

  // Grouped conversations with summaries
  conversations: Conversation[]

  // Current conversation being viewed in chat box
  currentConversationId: string | null

  // Sidebar state
  isSidebarOpen: boolean

  // Search query
  searchQuery: string

  // Actions
  addMessage: (message: HistoryMessage) => void
  updateMessage: (id: string, content: string) => void
  disposeMessage: (messageId: string) => void
  disposeOldMessages: (keepLastN: number) => void
  toggleSidebar: () => void
  setSearchQuery: (query: string) => void
  clearHistory: () => void
  setCurrentConversation: (conversationId: string | null) => void
  getMessagesByDate: () => { [key: string]: HistoryMessage[] }
  getConversationSummaries: () => Conversation[]
  generateConversations: () => void
}

export const useChatHistoryStore = create<ChatHistoryState>()(
  persist(
    (set, get) => ({
      allMessages: [],
      visibleMessages: [],
      disposedMessages: [],
      conversations: [],
      currentConversationId: null,
      isSidebarOpen: false,
      searchQuery: '',

      addMessage: (message: HistoryMessage) => {
        set((state) => ({
          allMessages: [...state.allMessages, message],
          visibleMessages: [...state.visibleMessages, message],
        }))
      },

      updateMessage: (id: string, content: string) => {
        set((state) => ({
          allMessages: state.allMessages.map((msg) =>
            msg.id === id ? { ...msg, content } : msg
          ),
          visibleMessages: state.visibleMessages.map((msg) =>
            msg.id === id ? { ...msg, content } : msg
          ),
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
          conversations: [],
          currentConversationId: null,
        })
      },

      setCurrentConversation: (conversationId: string | null) => {
        set({ currentConversationId: conversationId })
      },

      generateConversations: () => {
        const { disposedMessages, visibleMessages } = get()

        // Only create conversations from disposed messages
        // Visible messages are part of current active session, not history yet
        if (disposedMessages.length === 0) {
          set({ conversations: [] })
          return
        }

        const conversations: Conversation[] = []
        let currentConv: HistoryMessage[] = []

        // Time gap threshold: 30 minutes (in milliseconds)
        const TIME_GAP_THRESHOLD = 30 * 60 * 1000

        disposedMessages.forEach((msg, index) => {
          // Check if we should start a new conversation based on time gap
          const shouldStartNew = currentConv.length > 0 &&
            (msg.timestamp - currentConv[currentConv.length - 1].timestamp) > TIME_GAP_THRESHOLD

          if (shouldStartNew) {
            // Save current conversation
            const firstUserMsg = currentConv.find(m => m.role === 'user')
            const summary = firstUserMsg?.content.slice(0, 50) || 'Percakapan'

            conversations.push({
              id: `conv-${Date.now()}-${conversations.length}`,
              summary: summary.length < (firstUserMsg?.content.length || 0) ? summary + '...' : summary,
              messages: [...currentConv],
              startTime: currentConv[0].timestamp,
              lastMessageTime: currentConv[currentConv.length - 1].timestamp,
            })

            // Start new conversation
            currentConv = [msg]
          } else {
            // Add to current conversation
            currentConv.push(msg)
          }
        })

        // Add remaining messages as final conversation
        if (currentConv.length > 0) {
          const firstUserMsg = currentConv.find(m => m.role === 'user')
          const summary = firstUserMsg?.content.slice(0, 50) || 'Percakapan'

          conversations.push({
            id: `conv-${Date.now()}-${conversations.length}`,
            summary: summary.length < (firstUserMsg?.content.length || 0) ? summary + '...' : summary,
            messages: [...currentConv],
            startTime: currentConv[0].timestamp,
            lastMessageTime: currentConv[currentConv.length - 1].timestamp,
          })
        }

        console.log('[History] Generated conversations:', conversations.length, 'from', disposedMessages.length, 'disposed messages')
        set({ conversations })
      },

      getConversationSummaries: () => {
        const { conversations, searchQuery } = get()

        if (!searchQuery) return conversations

        // Filter by search query
        return conversations.filter(conv =>
          conv.summary.toLowerCase().includes(searchQuery.toLowerCase())
        )
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
