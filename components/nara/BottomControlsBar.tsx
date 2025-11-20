'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Mic, MicOff, Video, VideoOff, Square } from 'lucide-react'
import { useNaraChat } from '@/hooks/useNaraChat'
import { useLiveTranscription } from '@/hooks/useLiveTranscription'
import { useVoiceChatStore } from '@/stores/voiceChatStore'
import TopicChips from './TopicChips'

interface BottomControlsBarProps {
  isCameraOn: boolean
  isMicOn: boolean
  onCameraToggle: () => void
  onMicToggle: () => void
  isDesktopMode?: boolean
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
  isDesktopMode = false,
}: BottomControlsBarProps) {
  const [input, setInput] = useState('')
  const [showTopicChips, setShowTopicChips] = useState(true)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [micPermissionStatus, setMicPermissionStatus] = useState<'granted' | 'denied' | 'prompt' | 'checking'>('checking')
  const inputRef = useRef<HTMLInputElement>(null)
  const currentUserMessageIdRef = useRef<string | null>(null)

  // Use Nara Chat hook for message orchestration
  const { handleSendMessage, getNaraResponse, isLoading, credits, isLowCredits, error, messages } = useNaraChat()

  // Check microphone permission on mount
  useEffect(() => {
    const checkMicPermission = async () => {
      try {
        if (navigator.permissions) {
          const result = await navigator.permissions.query({ name: 'microphone' as PermissionName })
          setMicPermissionStatus(result.state as 'granted' | 'denied' | 'prompt')

          console.log('[BottomControlsBar] Microphone permission:', result.state)

          // Listen for permission changes
          result.onchange = () => {
            setMicPermissionStatus(result.state as 'granted' | 'denied' | 'prompt')
            console.log('[BottomControlsBar] Microphone permission changed:', result.state)
          }
        } else {
          // Fallback: assume prompt if Permissions API not available
          setMicPermissionStatus('prompt')
        }
      } catch (err) {
        console.error('[BottomControlsBar] Error checking mic permission:', err)
        setMicPermissionStatus('prompt')
      }
    }

    checkMicPermission()
  }, [])

  // Auto-hide TopicChips if there are existing messages (from localStorage)
  useEffect(() => {
    if (messages.length > 0) {
      setHasInteracted(true)
      setShowTopicChips(false)
    }
  }, []) // Run only on mount

  // Handle auto-send when silence is detected (5 seconds)
  const handleAutoSend = async (finalTranscript: string) => {
    console.log('[BottomControlsBar] Auto-send triggered:', finalTranscript)

    // Reset the current message ref
    currentUserMessageIdRef.current = null

    // Send to Nara
    if (finalTranscript && finalTranscript.trim()) {
      if (!hasInteracted) {
        setHasInteracted(true)
        setShowTopicChips(false)
      }
      await getNaraResponse(finalTranscript)
    }
  }

  // Use Live Transcription hook for real-time speech-to-text
  // with 5-second silence detection for auto-send
  const {
    isListening,
    transcript,
    interimTranscript,
    fullTranscript,
    error: transcriptError,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
  } = useLiveTranscription('id-ID', 5000, handleAutoSend)

  // Access store directly for real-time updates
  const { addMessage, updateMessage } = useVoiceChatStore()

  // Real-time transcript update: Update user message as they speak
  useEffect(() => {
    if (!isListening) return

    const transcriptText = (transcript + ' ' + interimTranscript).trim()

    if (transcriptText) {
      if (!currentUserMessageIdRef.current) {
        // Create new user message
        const messageId = `user-${Date.now()}`
        currentUserMessageIdRef.current = messageId

        addMessage({
          id: messageId,
          role: 'user',
          content: transcriptText,
          timestamp: Date.now(),
        })
      } else {
        // Update existing user message
        updateMessage(currentUserMessageIdRef.current, transcriptText)
      }
    }
  }, [transcript, interimTranscript, isListening, addMessage, updateMessage])

  // Handle text message send
  const handleSend = async () => {
    const content = input.trim()
    if (!content || isLoading) return

    setInput('')
    if (!hasInteracted) {
      setHasInteracted(true)
      setShowTopicChips(false) // Hide topic chips after first interaction
    }
    await handleSendMessage(content)
  }

  // Handle topic chip selection
  const handleTopicSelect = async (prompt: string) => {
    setHasInteracted(true)
    setShowTopicChips(false)
    await handleSendMessage(prompt)
  }

  // Handle voice/mic toggle - now uses live transcription with real-time chat bubbles
  // Auto-send akan triggered setelah 5 detik silence
  const handleMicClick = async (e: React.MouseEvent | React.TouchEvent) => {
    // Prevent event bubbling to parent containers (fixes mobile auto-cancel bug)
    e.stopPropagation()
    e.preventDefault()

    console.log('[BottomControlsBar] Mic button clicked, isListening:', isListening)

    if (isListening) {
      // Manual stop listening (user clicks stop button)
      console.log('[BottomControlsBar] User manually stopped listening')
      stopListening()

      const finalTranscript = fullTranscript.trim()

      // Reset the current message ref
      currentUserMessageIdRef.current = null

      // Send to Nara immediately if there's content (manual stop)
      if (finalTranscript) {
        if (!hasInteracted) {
          setHasInteracted(true)
          setShowTopicChips(false)
        }
        console.log('[BottomControlsBar] Sending transcript (manual stop):', finalTranscript)
        await getNaraResponse(finalTranscript)
      }

      resetTranscript()
    } else {
      // Start listening - reset transcript and message ref
      console.log('[BottomControlsBar] Starting to listen...')
      resetTranscript()
      currentUserMessageIdRef.current = null
      startListening()
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
      {/* Topic Chips - Show before first message - HIGHER Z-INDEX */}
      {showTopicChips && !isDesktopMode && (
        <div className="absolute bottom-20 left-0 right-0 z-[60] pointer-events-none">
          <div className="pointer-events-auto">
            <TopicChips onTopicSelect={handleTopicSelect} />
          </div>
        </div>
      )}

      {/* Bottom Controls Container - 3 Floating Sections */}
      <div
        className={isDesktopMode ? "relative w-full z-50 pointer-events-auto" : "absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 z-50 pointer-events-auto"}
        style={isDesktopMode ? {} : { paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 md:gap-4 max-w-4xl mx-auto">
          {/* Voice/Mic Control - 1/3 (Live Transcription) */}
          <motion.button
            onClick={handleMicClick}
            onTouchEnd={handleMicClick}
            disabled={isLoading || !isSupported || micPermissionStatus === 'denied'}
            className={`flex-1 h-14 md:h-16 rounded-full flex items-center justify-center gap-2 transition-all duration-200 backdrop-blur-xl shadow-lg relative overflow-hidden pointer-events-auto ${
              isListening
                ? 'bg-red-500/90 hover:bg-red-600/90 active:bg-red-700/90'
                : micPermissionStatus === 'denied'
                ? 'bg-gray-500/50'
                : 'bg-white/30 hover:bg-white/40 active:bg-white/50'
            } ${isLoading || !isSupported || micPermissionStatus === 'denied' ? 'opacity-50 cursor-not-allowed' : ''}`}
            whileHover={{ scale: isLoading || !isSupported || micPermissionStatus === 'denied' ? 1 : 1.05 }}
            whileTap={{ scale: isLoading || !isSupported || micPermissionStatus === 'denied' ? 1 : 0.95 }}
            aria-label={isListening ? 'Stop Listening (atau otomatis kirim setelah 5 detik diam)' : 'Start Voice Input'}
            title={
              !isSupported
                ? 'Speech recognition tidak didukung browser ini. Gunakan Chrome/Edge/Safari.'
                : micPermissionStatus === 'denied'
                ? 'Izin mikrofon ditolak. Mohon izinkan di pengaturan browser.'
                : isListening
                ? 'Klik untuk stop, atau otomatis kirim setelah 5 detik diam'
                : 'Klik untuk mulai bicara'
            }
          >
            {/* Pulsing animation for listening state */}
            {isListening && (
              <motion.div
                className="absolute inset-0 bg-red-400/30 rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}

            {isListening ? (
              <>
                <Square className="w-4 h-4 md:w-5 md:h-5 text-white fill-white z-10" />
                <span className="text-xs text-white font-medium z-10">Mendengarkan...</span>
              </>
            ) : micPermissionStatus === 'denied' ? (
              <MicOff className="w-5 h-5 md:w-6 md:h-6 text-white" />
            ) : (
              <Mic className="w-5 h-5 md:w-6 md:h-6 text-white" />
            )}
          </motion.button>

          {/* Camera Control - 1/3 */}
          <motion.button
            onClick={onCameraToggle}
            className={`flex-1 h-14 md:h-16 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-xl shadow-lg ${
              isCameraOn
                ? 'bg-white/30 hover:bg-white/40'
                : 'bg-white/20 hover:bg-white/30'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isCameraOn ? 'Camera On' : 'Camera Off'}
          >
            {isCameraOn ? (
              <Video className="w-5 h-5 md:w-6 md:h-6 text-white" />
            ) : (
              <VideoOff className="w-5 h-5 md:w-6 md:h-6 text-white" />
            )}
          </motion.button>

          {/* Chat Input - 1/3 */}
          <motion.div
            className="flex-1 h-14 md:h-16 flex items-center gap-2 bg-white/20 backdrop-blur-xl rounded-full px-3 md:px-4 shadow-lg"
            whileHover={{ scale: 1.02 }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={isListening ? 'Listening...' : 'Tanya...'}
              disabled={isLoading || isListening}
              className="flex-1 bg-transparent text-white placeholder-white/50 outline-none text-xs md:text-sm disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || isListening || !input.trim()}
              className="p-1.5 md:p-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-orange-500 hover:scale-110 active:scale-95 flex-shrink-0"
              aria-label="Send message"
            >
              <Send className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </button>
          </motion.div>
        </div>

        {/* Live Transcript Display (Google Meet style) with Auto-send indicator */}
        {/* Only show on DESKTOP mode - on mobile, transcript appears directly in chat bubbles */}
        {isDesktopMode && (
          <AnimatePresence>
            {isListening && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mt-3 max-w-4xl mx-auto space-y-2"
              >
                {/* Transcript display */}
                {(transcript || interimTranscript) && (
                  <div className="bg-black/60 backdrop-blur-md rounded-2xl px-4 py-3 border border-white/10">
                    <p className="text-sm text-white leading-relaxed">
                      {/* Final transcript (confirmed) */}
                      {transcript && <span className="text-white">{transcript}</span>}
                      {/* Interim transcript (being spoken, lighter color) */}
                      {interimTranscript && (
                        <span className="text-white/60 italic"> {interimTranscript}</span>
                      )}
                    </p>
                  </div>
                )}

                {/* Auto-send hint */}
                <div className="flex items-center justify-center gap-2">
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-2 h-2 rounded-full bg-red-400"
                  />
                  <span className="text-xs text-white/70">
                    Otomatis kirim setelah 5 detik diam atau klik Stop
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* Credit indicator & Error messages */}
        {(isLowCredits || error || transcriptError) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-2 text-center space-y-1"
          >
            {isLowCredits && (
              <span className="block text-xs text-white/60 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full">
                Credits: {credits}
              </span>
            )}
            {(error || transcriptError) && (
              <span className="block text-xs text-red-400 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full">
                {error || transcriptError}
              </span>
            )}
          </motion.div>
        )}
      </div>
    </>
  )
}
