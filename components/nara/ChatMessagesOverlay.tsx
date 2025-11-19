'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import NaraTypingIndicator from './NaraTypingIndicator'
import SuggestedReplies from './SuggestedReplies'
import { useNaraChat } from '@/hooks/useNaraChat'

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
  const [showSuggestions, setShowSuggestions] = useState(false)
  const { handleSendMessage, streamingResponse } = useNaraChat()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Show suggestions after Nara's response
  useEffect(() => {
    if (messages.length === 0) {
      setShowSuggestions(false)
      return
    }

    const lastMessage = messages[messages.length - 1]

    // Show suggestions only after assistant's complete message (not placeholder)
    if (
      lastMessage &&
      lastMessage.role === 'assistant' &&
      lastMessage.content !== '...' &&
      lastMessage.content.length > 10 && // Ensure it's a real message, not just placeholder
      !isLoading
    ) {
      // Small delay to ensure message is fully rendered
      const showTimer = setTimeout(() => setShowSuggestions(true), 300)

      // Auto-hide after 10 seconds
      const hideTimer = setTimeout(() => setShowSuggestions(false), 10000)

      return () => {
        clearTimeout(showTimer)
        clearTimeout(hideTimer)
      }
    } else {
      setShowSuggestions(false)
    }
  }, [messages, isLoading])

  // Generate contextual suggestions based on last message
  const generateSuggestions = (): string[] => {
    const lastMessage = messages[messages.length - 1]
    if (!lastMessage || lastMessage.role !== 'assistant') return []

    const content = lastMessage.content.toLowerCase()

    // Contextual suggestions based on keywords
    if (content.includes('batik')) {
      return ['Bagaimana cara membuat batik?', 'Ceritakan lebih lanjut', 'Apa jenis batik lainnya?']
    } else if (content.includes('wayang')) {
      return ['Siapa tokoh wayang terkenal?', 'Jelaskan lebih detail', 'Bagaimana pertunjukannya?']
    } else if (content.includes('musik') || content.includes('gamelan')) {
      return ['Alat musik apa saja?', 'Bagaimana cara memainkannya?', 'Ceritakan lebih banyak']
    } else if (content.includes('kuliner') || content.includes('makanan')) {
      return ['Bagaimana cara membuatnya?', 'Apa makanan lainnya?', 'Ceritakan sejarahnya']
    } else if (content.includes('aksara') || content.includes('huruf')) {
      return ['Bagaimana cara menulisnya?', 'Apa aksara lainnya?', 'Jelaskan lebih lanjut']
    }

    // Default suggestions
    return ['Ceritakan lebih lanjut', 'Apa contohnya?', 'Jelaskan lebih detail']
  }

  const handleSuggestionSelect = async (suggestion: string) => {
    setShowSuggestions(false)
    await handleSendMessage(suggestion)
  }

  return (
    <>
      {/* Messages Overlay - TikTok Live Style (Left Side) */}
      <div className="absolute left-4 bottom-24 md:bottom-28 max-w-xs md:max-w-sm w-full pointer-events-none z-30">
        <div className="space-y-2 max-h-[45vh] overflow-y-auto pointer-events-auto scrollbar-hide">
          <AnimatePresence mode="popLayout">
            {messages.slice(-10).map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, x: -20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className={
                  // Check if this is a placeholder message
                  message.role === 'assistant' && message.content === '...'
                    ? ''
                    : `rounded-2xl px-4 py-2 backdrop-blur-md
                      ${
                        message.role === 'user'
                          ? 'bg-white/25 text-white ml-8'
                          : 'bg-orange-500/30 text-white'
                      }
                      shadow-lg`
                }
              >
                {/* Check if this is a placeholder message */}
                {message.role === 'assistant' && message.content === '...' ? (
                  // Show streaming response if available, otherwise show typing indicator
                  streamingResponse ? (
                    <div className="rounded-2xl px-4 py-2 backdrop-blur-md bg-orange-500/30 text-white shadow-lg">
                      <div className="flex items-start gap-2">
                        <span className="text-xs font-bold text-orange-200">Nara:</span>
                        <p className="text-sm font-medium leading-snug flex-1 break-words">
                          {streamingResponse}
                          <span className="inline-block w-1 h-4 bg-orange-300 ml-1 animate-pulse" />
                        </p>
                      </div>
                    </div>
                  ) : (
                    <NaraTypingIndicator variant="thinking" mode="mobile" />
                  )
                ) : (
                  <div className="flex items-start gap-2">
                    {message.role === 'assistant' && (
                      <span className="text-xs font-bold text-orange-200">Nara:</span>
                    )}
                    <p className="text-sm font-medium leading-snug flex-1 break-words">
                      {message.content}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Replies - Below messages */}
        {showSuggestions && !isLoading && messages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-2"
          >
            <SuggestedReplies
              suggestions={generateSuggestions()}
              onSelect={handleSuggestionSelect}
              isVisible={showSuggestions}
            />
          </motion.div>
        )}
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
