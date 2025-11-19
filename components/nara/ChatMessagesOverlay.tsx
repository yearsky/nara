'use client'

import { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import NaraTypingIndicator from './NaraTypingIndicator'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  audioUrl?: string
  timestamp: number
}

interface ChatMessagesOverlayProps {
  messages: Message[]
  isLoading: boolean
}

/**
 * Chat Messages Overlay Component
 * TikTok live-style chat interface showing messages only
 */
export default function ChatMessagesOverlay({
  messages,
  isLoading,
}: ChatMessagesOverlayProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <>
      {/* Messages Overlay - TikTok Live Style (Left Side) */}
      <div className="absolute left-4 bottom-24 md:bottom-28 max-w-xs md:max-w-sm w-full pointer-events-none z-30">
        <div className="space-y-2 max-h-[45vh] overflow-y-auto pointer-events-auto scrollbar-hide">
          <AnimatePresence>
            {messages.slice(-10).map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, x: -20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className={`
                  rounded-2xl px-4 py-2 backdrop-blur-md
                  ${
                    message.role === 'user'
                      ? 'bg-white/25 text-white ml-8'
                      : 'bg-orange-500/30 text-white'
                  }
                  shadow-lg
                `}
              >
                <div className="flex items-start gap-2">
                  {message.role === 'assistant' && (
                    <span className="text-xs font-bold text-orange-200">Nara:</span>
                  )}
                  <p className="text-sm font-medium leading-snug flex-1 break-words">
                    {message.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <AnimatePresence>
            {isLoading && <NaraTypingIndicator variant="thinking" mode="mobile" />}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Custom scrollbar hide */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  )
}
