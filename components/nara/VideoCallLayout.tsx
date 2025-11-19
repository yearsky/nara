'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCallStore } from '@/stores/callStore'
import { useCallTimer } from '@/hooks/useCallTimer'
import { useAutoHideControls } from '@/hooks/useAutoHideControls'
import { useNaraChat } from '@/hooks/useNaraChat'
import { useChatHistoryStore } from '@/stores/chatHistoryStore'
import { useSyncChatHistory } from '@/hooks/useSyncChatHistory'
import { useMessageDisposal } from '@/hooks/useMessageDisposal'
import { formatMessage } from '@/lib/formatMessage'
import VideoPlaceholder from './VideoPlaceholder'
import CallHeader from './CallHeader'
import ChatMessagesOverlay from './ChatMessagesOverlay'
import BottomControlsBar from './BottomControlsBar'
import NaraTypingIndicator from './NaraTypingIndicator'
import EnhancedHeader from './mobile/EnhancedHeader'
import ChatHistorySidebar from './mobile/ChatHistorySidebar'
import DisposableMessage from './mobile/DisposableMessage'
import ChatBoxView from './mobile/ChatBoxView'

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
  const { messages, isLoading, streamingResponse, handleSendMessage } = useNaraChat()

  // Sync messages to history store
  useSyncChatHistory()

  // Get visible messages with disposal logic
  const { visibleMessages } = useMessageDisposal()

  // History sidebar state
  const { isSidebarOpen, toggleSidebar, disposedMessages, currentConversationId } =
    useChatHistoryStore()

  // Refs for auto-scrolling chat
  const messagesEndRef = useRef<HTMLDivElement>(null) // Desktop
  const mobileMessagesEndRef = useRef<HTMLDivElement>(null) // Mobile

  // Auto-scroll to bottom when new messages arrive (both desktop and mobile)
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    mobileMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, visibleMessages])

  // Start call on mount
  useEffect(() => {
    startCall()
    return () => {
      endCall()
    }
  }, [startCall, endCall])

  // Check for context from external navigation (e.g., museum, learn modules)
  useEffect(() => {
    const checkAndSendContext = async () => {
      try {
        const contextData = localStorage.getItem('naraContext')
        if (contextData) {
          const context = JSON.parse(contextData)

          // Clear context immediately to prevent re-sending
          localStorage.removeItem('naraContext')

          // Wait a bit for component to fully mount
          await new Promise(resolve => setTimeout(resolve, 500))

          // Prepare additional context for system prompt (invisible to user)
          const additionalContext = context.type && context.data
            ? { type: context.type, data: context.data }
            : undefined

          // Auto-send the prompt with context
          if (context.prompt && handleSendMessage) {
            await handleSendMessage(context.prompt, additionalContext)
          }
        }
      } catch (error) {
        console.error('Error processing naraContext:', error)
        // Clear invalid context
        localStorage.removeItem('naraContext')
      }
    }

    checkAndSendContext()
  }, [handleSendMessage])

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

  // Show ChatBoxView when viewing conversation history
  if (currentConversationId) {
    return <ChatBoxView onBack={() => {}} />
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

        {/* Enhanced Header with History Toggle */}
        <EnhancedHeader
          characterName={characterName}
          onBack={handleEndCall}
          onToggleSidebar={toggleSidebar}
          hasUnreadHistory={disposedMessages.length > 0}
          isVisible={isVisible}
        />

        {/* Disposable Chat Messages - Instagram Stories Style */}
        <div className="absolute left-4 bottom-24 md:bottom-28 max-w-xs md:max-w-sm w-full pointer-events-none z-30">
          <div className="space-y-2 max-h-[45vh] overflow-y-auto pointer-events-auto scrollbar-hide">
            <AnimatePresence mode="popLayout">
              {visibleMessages.map((message) => {
                // Check if this is a placeholder message
                if (message.role === 'assistant' && message.content === '...') {
                  // Show thinking indicator
                  return (
                    <motion.div
                      key={message.id}
                      layout
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -30, scale: 0.85 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    >
                      {streamingResponse ? (
                        <div className="rounded-2xl px-4 py-2 backdrop-blur-md bg-orange-500/30 text-white shadow-lg">
                          <div className="flex items-start gap-2">
                            <span className="text-xs font-bold text-orange-200">Nara:</span>
                            <p className="text-sm font-medium leading-snug flex-1 break-words">
                              {formatMessage(streamingResponse)}
                              <span className="inline-block w-1 h-4 bg-orange-300 ml-1 animate-pulse" />
                            </p>
                          </div>
                        </div>
                      ) : (
                        <NaraTypingIndicator variant="thinking" mode="mobile" />
                      )}
                    </motion.div>
                  )
                }

                // Regular message
                return (
                  <DisposableMessage
                    key={message.id}
                    message={message}
                    showNaraLabel={true}
                  />
                )
              })}
            </AnimatePresence>
            {/* Auto-scroll anchor for mobile */}
            <div ref={mobileMessagesEndRef} />
          </div>
        </div>

        {/* Chat History Sidebar */}
        <ChatHistorySidebar
          isOpen={isSidebarOpen}
          onClose={toggleSidebar}
        />

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
            <AnimatePresence mode="popLayout">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {/* Check if this is a placeholder message */}
                  {message.role === 'assistant' && message.content === '...' ? (
                    // Show streaming response if available, otherwise show typing indicator
                    streamingResponse ? (
                      <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-white/10 text-white backdrop-blur-sm">
                        <p className="text-xs font-bold text-orange-300 mb-1">Nara</p>
                        <p className="text-sm leading-relaxed break-words">
                          {formatMessage(streamingResponse)}
                          <span className="inline-block w-1 h-4 bg-orange-300 ml-1 animate-pulse" />
                        </p>
                      </div>
                    ) : (
                      <NaraTypingIndicator variant="thinking" />
                    )
                  ) : (
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
                      <p className="text-sm leading-relaxed break-words">{formatMessage(message.content)}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
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
