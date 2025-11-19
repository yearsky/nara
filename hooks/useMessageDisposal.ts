import { useEffect, useCallback, useRef } from 'react'
import { useChatHistoryStore } from '@/stores/chatHistoryStore'
import { DISPOSAL_CONFIG } from '@/config/disposalConfig'

/**
 * Hook for managing message disposal logic
 * Auto-dispose old messages keeping only last N visible
 */
export function useMessageDisposal() {
  const { visibleMessages, disposeOldMessages } = useChatHistoryStore()
  const disposalTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Trigger haptic feedback on disposal (mobile only)
  const triggerHaptic = useCallback(() => {
    if (
      DISPOSAL_CONFIG.HAPTIC_FEEDBACK_ENABLED &&
      typeof window !== 'undefined' &&
      'vibrate' in navigator
    ) {
      navigator.vibrate(50) // 50ms vibration
    }
  }, [])

  // Auto-dispose old messages
  const scheduleDisposal = useCallback(() => {
    if (!DISPOSAL_CONFIG.AUTO_DISPOSAL_ENABLED) return

    // Clear existing timeout
    if (disposalTimeoutRef.current) {
      clearTimeout(disposalTimeoutRef.current)
    }

    // Schedule new disposal
    disposalTimeoutRef.current = setTimeout(() => {
      const messagesToDispose =
        visibleMessages.length - DISPOSAL_CONFIG.MAX_VISIBLE_MESSAGES

      if (messagesToDispose > 0) {
        triggerHaptic()
        disposeOldMessages(DISPOSAL_CONFIG.MAX_VISIBLE_MESSAGES)
      }
    }, DISPOSAL_CONFIG.DISPOSAL_DELAY)
  }, [visibleMessages.length, disposeOldMessages, triggerHaptic])

  // Schedule disposal when new messages arrive
  useEffect(() => {
    scheduleDisposal()

    return () => {
      if (disposalTimeoutRef.current) {
        clearTimeout(disposalTimeoutRef.current)
      }
    }
  }, [scheduleDisposal])

  return {
    visibleMessages,
    maxVisibleMessages: DISPOSAL_CONFIG.MAX_VISIBLE_MESSAGES,
  }
}
