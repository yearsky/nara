import { useEffect, useRef } from 'react'
import { useVoiceChatStore } from '@/stores/voiceChatStore'
import { useChatHistoryStore, type HistoryMessage } from '@/stores/chatHistoryStore'

/**
 * Hook to sync messages from voiceChatStore to chatHistoryStore
 * Ensures both stores stay in sync
 */
export function useSyncChatHistory() {
  const { messages: voiceMessages } = useVoiceChatStore()
  const { addMessage: addToHistory, allMessages } = useChatHistoryStore()
  const lastSyncedCountRef = useRef(0)

  useEffect(() => {
    // Only add new messages that haven't been synced yet
    if (voiceMessages.length > lastSyncedCountRef.current) {
      const newMessages = voiceMessages.slice(lastSyncedCountRef.current)

      newMessages.forEach((msg) => {
        // Check if message already exists in history (by ID)
        const exists = allMessages.some((m) => m.id === msg.id)
        if (!exists) {
          const historyMessage: HistoryMessage = {
            id: msg.id,
            role: msg.role,
            content: msg.content,
            timestamp: msg.timestamp,
            isDisposed: false,
          }
          addToHistory(historyMessage)
        }
      })

      lastSyncedCountRef.current = voiceMessages.length
    }
  }, [voiceMessages, addToHistory, allMessages])
}
