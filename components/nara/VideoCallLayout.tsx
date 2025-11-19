'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
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
  )
}
