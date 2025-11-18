'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Mic, MicOff, Video, VideoOff } from 'lucide-react'
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

interface BottomControlsBarProps {
  isCameraOn: boolean
  isMicOn: boolean
  onCameraToggle: () => void
  onMicToggle: () => void
  messages: Message[]
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * Bottom Controls Bar Component
 * Unified control bar with 3 equal-sized items:
 * 1. Voice control (mic)
 * 2. Camera control (camera)
 * 3. Chat input
 */
export default function BottomControlsBar({
  isCameraOn,
  isMicOn,
  onCameraToggle,
  onMicToggle,
  messages,
  setMessages,
  isLoading,
  setIsLoading,
}: BottomControlsBarProps) {
  const [input, setInput] = useState('')
  const [currentAudioUrl, setCurrentAudioUrl] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { setEmotion } = useNaraEmotionStore()
  const { credits, useCredit, hasCredits } = useCreditStore()

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
      {/* Bottom Controls Container - 3 Equal Sections */}
      <div className="absolute bottom-0 left-0 right-0 z-50 pointer-events-auto">
        <div className="bg-black/50 backdrop-blur-xl border-t border-white/10">
          <div className="flex items-stretch" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
            {/* Voice Control - 1/3 */}
            <div className="flex-1 flex items-center justify-center p-4 border-r border-white/10">
              <motion.button
                onClick={onMicToggle}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 ${
                  isMicOn
                    ? 'bg-white/30 hover:bg-white/40'
                    : 'bg-white/20 hover:bg-white/30'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={isMicOn ? 'Mic On' : 'Mic Off'}
              >
                {isMicOn ? (
                  <Mic className="w-6 h-6 text-white" />
                ) : (
                  <MicOff className="w-6 h-6 text-white" />
                )}
              </motion.button>
            </div>

            {/* Camera Control - 1/3 */}
            <div className="flex-1 flex items-center justify-center p-4 border-r border-white/10">
              <motion.button
                onClick={onCameraToggle}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 ${
                  isCameraOn
                    ? 'bg-white/30 hover:bg-white/40'
                    : 'bg-white/20 hover:bg-white/30'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={isCameraOn ? 'Camera On' : 'Camera Off'}
              >
                {isCameraOn ? (
                  <Video className="w-6 h-6 text-white" />
                ) : (
                  <VideoOff className="w-6 h-6 text-white" />
                )}
              </motion.button>
            </div>

            {/* Chat Input - 1/3 */}
            <div className="flex-1 flex items-center p-4">
              <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 w-full">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Tanya..."
                  disabled={!hasCredits() || isLoading}
                  className="flex-1 bg-transparent text-white placeholder-white/50 outline-none text-sm disabled:opacity-50"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!hasCredits() || isLoading || !input.trim()}
                  className="p-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-orange-500 hover:scale-110 active:scale-95"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Credit indicator */}
          {credits <= 5 && (
            <div className="pb-2 text-center">
              <span className="text-xs text-white/60 bg-black/40 px-3 py-1 rounded-full">
                Credits: {credits}
              </span>
            </div>
          )}
        </div>
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
    </>
  )
}
