'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useCallStore } from '@/stores/callStore'
import { useCallTimer } from '@/hooks/useCallTimer'
import { useAutoHideControls } from '@/hooks/useAutoHideControls'
import VideoPlaceholder from './VideoPlaceholder'
import CallHeader from './CallHeader'
import VideoCallControls from './VideoCallControls'
import LiveChatOverlay from './LiveChatOverlay'

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
      <CallHeader name={characterName} duration={callDuration} isVisible={isVisible} />

      {/* Live Chat Overlay - TikTok Style */}
      <LiveChatOverlay />

      {/* Bottom Control Bar */}
      <VideoCallControls
        isCameraOn={isCameraOn}
        isMicOn={isMicOn}
        isVisible={isVisible}
        onCameraToggle={toggleCamera}
        onMicToggle={toggleMic}
        onEndCall={handleEndCall}
      />
    </div>
  )
}
