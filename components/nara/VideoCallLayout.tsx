'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCallStore } from '@/stores/callStore'
import { useCallTimer } from '@/hooks/useCallTimer'
import { useAutoHideControls } from '@/hooks/useAutoHideControls'
import { useNaraChat } from '@/hooks/useNaraChat'
import VideoPlaceholder from './VideoPlaceholder'
import CallHeader from './CallHeader'
import ChatMessagesOverlay from './ChatMessagesOverlay'
import BottomControlsBar from './BottomControlsBar'

interface VideoCallLayoutProps {
  characterName?: string
  onEndCall?: () => void
}

/**
 * Video Call Layout Component
 * Full-screen immersive video call interface
 * Features:
 * - Full-screen video/character background
 * - Auto-hiding controls
 * - Conversation timer
 * - Camera, mic, and end call controls
 * - iOS-style design
 */
export default function VideoCallLayout({
  characterName = 'Nara',
  onEndCall,
}: VideoCallLayoutProps) {
  const {
    isCallActive,
    isMicOn,
    isCameraOn,
    startCall,
    endCall,
    toggleMic,
    toggleCamera,
  } = useCallStore()

  const { formatted: callDuration } = useCallTimer(isCallActive)
  const { isVisible, showControls } = useAutoHideControls(3000)

  // Use new Nara Chat hook for message orchestration
  const { messages, isLoading } = useNaraChat()

  // Ref for auto-scrolling chat in desktop mode
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive (desktop mode)
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Start call on mount
  useEffect(() => {
    startCall()
    return () => {
      endCall()
    }
  }, [startCall, endCall])

  // Handle end call
  const handleEndCall = () => {
    endCall()
    if (onEndCall) {
      onEndCall()
    }
  }

  // Handle screen tap to show controls
  const handleScreenTap = () => {
    showControls()
  }

  return (
    <div
      className="fixed inset-0 bg-black z-50 overflow-hidden"
      onClick={handleScreenTap}
      onTouchStart={handleScreenTap}
    >
      {/* Mobile Layout: Full-screen with overlay (< md) */}
      <div className="md:hidden w-full h-full">
        {/* Video/Character Background - Full Screen */}
        <VideoPlaceholder />

        {/* Top Header Overlay (Name + Timer) */}
        <CallHeader
          name={characterName}
          duration={callDuration}
          isVisible={isVisible}
          onBack={handleEndCall}
        />

        {/* Chat Messages Overlay - TikTok Style */}
        <ChatMessagesOverlay messages={messages} isLoading={isLoading} />

        {/* Bottom Controls Bar - Combined Mic, Camera, and Chat Input */}
        <BottomControlsBar
          isCameraOn={isCameraOn}
          isMicOn={isMicOn}
          onCameraToggle={toggleCamera}
          onMicToggle={toggleMic}
        />
      </div>

      {/* Desktop/Tablet Layout: Split-screen (>= md) */}
      <div className="hidden md:flex w-full h-full">
        {/* Left Side: Character/Video (50%) */}
        <div className="w-1/2 h-full relative">
          <VideoPlaceholder />

          {/* Top Header for Character Side */}
          <CallHeader
            name={characterName}
            duration={callDuration}
            isVisible={isVisible}
            onBack={handleEndCall}
          />
        </div>

        {/* Right Side: Chat Panel (50%) */}
        <div className="w-1/2 h-full bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 flex flex-col">
          {/* Chat Header */}
          <div className="flex-shrink-0 p-6 border-b border-white/10">
            <h2 className="text-xl font-semibold text-white">Chat dengan Nara</h2>
            <p className="text-sm text-white/60 mt-1">Sedang berbicara...</p>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-orange-500 text-white'
                        : 'bg-white/10 text-white backdrop-blur-sm'
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <p className="text-xs font-bold text-orange-300 mb-1">Nara</p>
                    )}
                    <p className="text-sm leading-relaxed break-words">{message.content}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3">
                  <p className="text-xs font-bold text-orange-300 mb-1">Nara</p>
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

          {/* Bottom Controls for Desktop */}
          <div className="flex-shrink-0 p-6 border-t border-white/10">
            <BottomControlsBar
              isCameraOn={isCameraOn}
              isMicOn={isMicOn}
              onCameraToggle={toggleCamera}
              onMicToggle={toggleMic}
              isDesktopMode={true}
            />
          </div>
        </div>
      </div>

      {/* Custom scrollbar styles for desktop chat */}
      <style jsx global>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  )
}
