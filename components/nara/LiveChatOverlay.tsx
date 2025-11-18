'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Mic } from 'lucide-react'
import { useNaraEmotionStore } from '@/stores/naraEmotionStore'
import { useCreditStore } from '@/stores/creditStore'
import dynamic from 'next/dynamic'

const NaraVoicePlayer = dynamic(
  () => import('./NaraVoicePlayer').then((mod) => ({ default: mod.NaraVoicePlayer })),
  { ssr: false }
)

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  audioUrl?: string
  timestamp: number
}

/**
 * Live Chat Overlay Component
 * TikTok live-style chat interface with:
 * - Messages overlay on left side
 * - Input box at bottom
 * - Semi-transparent background
 * - Auto-scrolling messages
 */
export default function LiveChatOverlay() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentAudioUrl, setCurrentAudioUrl] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { setEmotion } = useNaraEmotionStore()
  const { credits, useCredit, hasCredits } = useCreditStore()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (messageContent?: string) => {
    const content = messageContent || input.trim()
    if (!content || !hasCredits() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: Date.now(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setEmotion('thinking')

    try {
      const response = await fetch('/api/nara/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          context: 'Kamu adalah Nara, AI companion yang membantu belajar budaya Indonesia.',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()

      if (!useCredit(data.creditsUsed || 1)) {
        throw new Error('Insufficient credits')
      }

      // Generate TTS
      const ttsResponse = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: data.message }),
      })

      const ttsData = await ttsResponse.json()
      const audioUrl = ttsData.audioUrl

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        audioUrl,
        timestamp: Date.now(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setCurrentAudioUrl(audioUrl)
      setEmotion('happy')
    } catch (error) {
      console.error('Chat error:', error)
      setEmotion('neutral')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Messages Overlay - TikTok Live Style (Left Side) */}
      <div className="absolute left-4 bottom-24 md:bottom-32 max-w-xs md:max-w-sm w-full pointer-events-none z-30">
        <div className="space-y-2 max-h-[50vh] overflow-y-auto pointer-events-auto scrollbar-hide">
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
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-orange-500/30 backdrop-blur-md rounded-2xl px-4 py-2 shadow-lg"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-orange-200">Nara:</span>
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" />
                  <div
                    className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
                    style={{ animationDelay: '0.1s' }}
                  />
                  <div
                    className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  />
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Box - Bottom Center (TikTok Style) */}
      <div className="absolute bottom-4 left-4 right-4 md:left-8 md:right-8 z-30 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 bg-black/40 backdrop-blur-xl rounded-full px-4 py-3 shadow-2xl border border-white/10"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Tanya Nara..."
            disabled={!hasCredits() || isLoading}
            className="flex-1 bg-transparent text-white placeholder-white/50 outline-none text-sm md:text-base disabled:opacity-50"
          />

          <button
            onClick={() => handleSend()}
            disabled={!hasCredits() || isLoading || !input.trim()}
            className="p-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-orange-500 hover:scale-110 active:scale-95"
            aria-label="Send message"
          >
            <Send className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </motion.div>

        {/* Credit indicator */}
        {credits <= 5 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-2 text-center"
          >
            <span className="text-xs text-white/60 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full">
              Credits: {credits}
            </span>
          </motion.div>
        )}
      </div>

      {/* Voice Player (hidden but functional) */}
      {currentAudioUrl && (
        <div className="hidden">
          <NaraVoicePlayer
            audioUrl={currentAudioUrl}
            onComplete={() => setCurrentAudioUrl(null)}
          />
        </div>
      )}

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
