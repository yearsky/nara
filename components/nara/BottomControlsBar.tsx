'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Send, Mic, MicOff, Video, VideoOff, Square } from 'lucide-react'
import { useNaraChat } from '@/hooks/useNaraChat'
import { useVoiceRecorder } from '@/hooks/useVoiceRecorder'

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
  const { handleSendMessage, handleVoiceRecord, isLoading, credits, isLowCredits, error } =
    useNaraChat()

  // Use Voice Recorder hook for voice recording
  const {
    isRecording,
    recordingTime,
    startRecording,
    stopRecording,
    error: recorderError,
  } = useVoiceRecorder()

  // Handle text message send
  const handleSend = async () => {
    const content = input.trim()
    if (!content || isLoading) return

    setInput('')
    await handleSendMessage(content)
  }

  // Handle voice recording toggle
  const handleMicClick = async () => {
    if (isRecording) {
      // Stop recording and send
      const audioBlob = await stopRecording()
      if (audioBlob) {
        await handleVoiceRecord(audioBlob)
      }
    } else {
      // Start recording
      await startRecording()
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
          {/* Voice Recording Control - 1/3 */}
          <motion.button
            onClick={handleMicClick}
            disabled={isLoading}
            className={`flex-1 h-14 md:h-16 rounded-full flex items-center justify-center gap-2 transition-all duration-200 backdrop-blur-xl shadow-lg ${
              isRecording
                ? 'bg-red-500/80 hover:bg-red-600/80'
                : 'bg-white/30 hover:bg-white/40'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            whileHover={{ scale: isLoading ? 1 : 1.05 }}
            whileTap={{ scale: isLoading ? 1 : 0.95 }}
            aria-label={isRecording ? 'Stop Recording' : 'Start Recording'}
          >
            {isRecording ? (
              <>
                <Square className="w-4 h-4 md:w-5 md:h-5 text-white fill-white" />
                <span className="text-xs text-white font-mono">{recordingTime}s</span>
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
              placeholder={isRecording ? 'Recording...' : 'Tanya...'}
              disabled={isLoading || isRecording}
              className="flex-1 bg-transparent text-white placeholder-white/50 outline-none text-xs md:text-sm disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || isRecording || !input.trim()}
              className="p-1.5 md:p-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-orange-500 hover:scale-110 active:scale-95 flex-shrink-0"
              aria-label="Send message"
            >
              <Send className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </button>
          </motion.div>
        </div>

        {/* Credit indicator & Error messages */}
        {(isLowCredits || error || recorderError) && (
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
            {(error || recorderError) && (
              <span className="block text-xs text-red-400 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full">
                {error || recorderError}
              </span>
            )}
          </motion.div>
        )}
      </div>
    </>
  )
}
