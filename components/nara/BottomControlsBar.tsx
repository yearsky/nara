'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Mic, MicOff, Video, VideoOff, Square } from 'lucide-react'
import { useNaraChat } from '@/hooks/useNaraChat'
import { useLiveTranscription } from '@/hooks/useLiveTranscription'

interface BottomControlsBarProps {
  isCameraOn: boolean
  isMicOn: boolean
  onCameraToggle: () => void
  onMicToggle: () => void
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
}: BottomControlsBarProps) {
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // Use Nara Chat hook for message orchestration
  const { handleSendMessage, isLoading, credits, isLowCredits, error } = useNaraChat()

  // Use Live Transcription hook for real-time speech-to-text
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
  } = useLiveTranscription('id-ID')

  // Handle text message send
  const handleSend = async () => {
    const content = input.trim()
    if (!content || isLoading) return

    setInput('')
    await handleSendMessage(content)
  }

  // Handle voice/mic toggle - now uses live transcription
  const handleMicClick = async () => {
    if (isListening) {
      // Stop listening and send transcript
      stopListening()

      const finalTranscript = fullTranscript.trim()
      if (finalTranscript) {
        await handleSendMessage(finalTranscript)
        resetTranscript()
      }
    } else {
      // Start listening
      resetTranscript()
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
      {/* Bottom Controls Container - 3 Floating Sections */}
      <div
        className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 z-50 pointer-events-auto"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <div className="flex items-center gap-3 md:gap-4 max-w-4xl mx-auto">
          {/* Voice/Mic Control - 1/3 (Live Transcription) */}
          <motion.button
            onClick={handleMicClick}
            disabled={isLoading || !isSupported}
            className={`flex-1 h-14 md:h-16 rounded-full flex items-center justify-center gap-2 transition-all duration-200 backdrop-blur-xl shadow-lg ${
              isListening
                ? 'bg-red-500/80 hover:bg-red-600/80 animate-pulse'
                : 'bg-white/30 hover:bg-white/40'
            } ${isLoading || !isSupported ? 'opacity-50 cursor-not-allowed' : ''}`}
            whileHover={{ scale: isLoading || !isSupported ? 1 : 1.05 }}
            whileTap={{ scale: isLoading || !isSupported ? 1 : 0.95 }}
            aria-label={isListening ? 'Stop Listening' : 'Start Voice Input'}
            title={!isSupported ? 'Speech recognition not supported in this browser' : ''}
          >
            {isListening ? (
              <>
                <Square className="w-4 h-4 md:w-5 md:h-5 text-white fill-white" />
                <span className="text-xs text-white font-medium">Listening...</span>
              </>
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

        {/* Live Transcript Display (Google Meet style) */}
        <AnimatePresence>
          {isListening && (transcript || interimTranscript) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-3 max-w-4xl mx-auto"
            >
              <div className="bg-black/60 backdrop-blur-md rounded-2xl px-4 py-3 border border-white/10">
                <p className="text-sm text-white leading-relaxed">
                  {/* Final transcript (confirmed) */}
                  {transcript && <span className="text-white">{transcript}</span>}
                  {/* Interim transcript (being spoken, lighter color) */}
                  {interimTranscript && (
                    <span className="text-white/60 italic">{interimTranscript}</span>
                  )}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
