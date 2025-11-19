import { useEffect, useRef } from 'react'
import { useVoiceChatStore } from '@/stores/voiceChatStore'
import { useChatHistoryStore, type HistoryMessage } from '@/stores/chatHistoryStore'

/**
 * Hook to sync messages from voiceChatStore to chatHistoryStore
 * Ensures both stores stay in sync (including message updates)
 */
export function useSyncChatHistory() {
  const { messages: voiceMessages } = useVoiceChatStore()
  const { addMessage: addToHistory, updateMessage: updateInHistory, visibleMessages } = useChatHistoryStore()
  const lastSyncedCountRef = useRef(0)
  const messageContentsRef = useRef<Map<string, string>>(new Map())

  useEffect(() => {
    // Sync new messages
    if (voiceMessages.length > lastSyncedCountRef.current) {
      const newMessages = voiceMessages.slice(lastSyncedCountRef.current)

      newMessages.forEach((msg) => {
        // Check if message already exists in history (by ID)
        const exists = visibleMessages.some((m) => m.id === msg.id)
        if (!exists) {
          const historyMessage: HistoryMessage = {
            id: msg.id,
            role: msg.role,
            content: msg.content,
            timestamp: msg.timestamp,
            isDisposed: false,
          }
          console.log('[Sync] Adding new message to history:', { id: msg.id, role: msg.role, content: msg.content.substring(0, 20) })
          addToHistory(historyMessage)
          messageContentsRef.current.set(msg.id, msg.content)
        }
      })

      lastSyncedCountRef.current = voiceMessages.length
    }

    // Sync message content updates
    voiceMessages.forEach((msg) => {
      const lastContent = messageContentsRef.current.get(msg.id)

      // If content has changed, update it in history store
      if (lastContent !== undefined && lastContent !== msg.content) {
        console.log('[Sync] Updating message content:', { id: msg.id, from: lastContent.substring(0, 20), to: msg.content.substring(0, 20) })
        updateInHistory(msg.id, msg.content)
        messageContentsRef.current.set(msg.id, msg.content)
      }
    })
  }, [voiceMessages, addToHistory, updateInHistory, visibleMessages])
}
