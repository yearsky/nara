/**
 * Configuration for disposable chat messages
 * Instagram Stories-style auto-disposal
 */

export const DISPOSAL_CONFIG = {
  // Keep only the last N messages visible (Desktop)
  MAX_VISIBLE_MESSAGES: 4,

  // Keep only the last N messages visible (Mobile)
  // Mobile limit: 2 messages (1 user + 1 Nara response)
  MAX_VISIBLE_MESSAGES_MOBILE: 2,

  // Delay before disposing old messages (in ms)
  DISPOSAL_DELAY: 3000, // 3 seconds after new message

  // Animation duration for disposal
  ANIMATION_DURATION: 600, // 600ms fade out

  // Enable/disable auto-disposal
  AUTO_DISPOSAL_ENABLED: true,

  // Haptic feedback on disposal (mobile only)
  HAPTIC_FEEDBACK_ENABLED: true,
} as const

export type DisposalConfig = typeof DISPOSAL_CONFIG
