'use client'

import { motion } from 'framer-motion'
import { type HistoryMessage } from '@/stores/chatHistoryStore'
import { DISPOSAL_CONFIG } from '@/config/disposalConfig'
import { formatMessage } from '@/lib/formatMessage'

interface DisposableMessageProps {
  message: HistoryMessage
  isDisposing?: boolean
  showNaraLabel?: boolean
}

/**
 * Disposable Message Component
 * Auto-dispose with smooth fade + slide animation
 */
export default function DisposableMessage({
  message,
  isDisposing = false,
  showNaraLabel = true,
}: DisposableMessageProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{
        opacity: isDisposing ? 0 : 1,
        y: isDisposing ? -30 : 0,
        scale: isDisposing ? 0.85 : 1,
      }}
      exit={{
        opacity: 0,
        y: -30,
        scale: 0.85,
        transition: { duration: DISPOSAL_CONFIG.ANIMATION_DURATION / 1000 },
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`rounded-2xl px-4 py-2 backdrop-blur-md shadow-lg ${
          message.role === 'user'
            ? 'bg-white/25 text-white ml-8'
            : 'bg-orange-500/30 text-white'
        } ${isDisposing ? 'opacity-60' : 'opacity-100'}`}
      >
        <div className="flex items-start gap-2">
          {message.role === 'assistant' && showNaraLabel && (
            <span className="text-xs font-bold text-orange-200">Nara:</span>
          )}
          <p className="text-sm font-medium leading-snug flex-1 break-words">
            {formatMessage(message.content)}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
