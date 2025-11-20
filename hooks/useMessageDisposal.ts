import { useEffect, useCallback, useRef, useState } from 'react'
import { useChatHistoryStore } from '@/stores/chatHistoryStore'
import { DISPOSAL_CONFIG } from '@/config/disposalConfig'

/**
 * Hook for managing message disposal logic
 * Auto-dispose old messages keeping only last N visible
 */
export function useMessageDisposal() {
  const { visibleMessages, disposeOldMessages } = useChatHistoryStore()
  const disposalTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile/desktop based on Tailwind's md breakpoint (768px)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)')

    // Set initial value
    setIsMobile(mediaQuery.matches)

    // Listen for changes
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mediaQuery.addEventListener('change', handler)

    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

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

    // Use mobile or desktop limit based on screen size
    const maxMessages = isMobile
      ? DISPOSAL_CONFIG.MAX_VISIBLE_MESSAGES_MOBILE
      : DISPOSAL_CONFIG.MAX_VISIBLE_MESSAGES

    // Schedule new disposal
    disposalTimeoutRef.current = setTimeout(() => {
      const messagesToDispose = visibleMessages.length - maxMessages

      if (messagesToDispose > 0) {
        triggerHaptic()
        disposeOldMessages(maxMessages)
      }
    }, DISPOSAL_CONFIG.DISPOSAL_DELAY)
  }, [visibleMessages.length, disposeOldMessages, triggerHaptic, isMobile])

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
    maxVisibleMessages: isMobile
      ? DISPOSAL_CONFIG.MAX_VISIBLE_MESSAGES_MOBILE
      : DISPOSAL_CONFIG.MAX_VISIBLE_MESSAGES,
    isMobile,
  }
}
