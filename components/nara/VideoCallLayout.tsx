'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useCallStore } from '@/stores/callStore'
import { useCallTimer } from '@/hooks/useCallTimer'
import { useAutoHideControls } from '@/hooks/useAutoHideControls'
import VideoPlaceholder from './VideoPlaceholder'
import CallHeader from './CallHeader'
import VideoCallControls from './VideoCallControls'

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

      {/* Bottom Control Bar */}
      <VideoCallControls
        isCameraOn={isCameraOn}
        isMicOn={isMicOn}
        isVisible={isVisible}
        onCameraToggle={toggleCamera}
        onMicToggle={toggleMic}
        onEndCall={handleEndCall}
      />

      {/* Tap instruction (shows briefly on mount, optional) */}
      {isCallActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 4, times: [0, 0.1, 0.9, 1] }}
          className="absolute bottom-32 left-0 right-0 text-center pointer-events-none"
        >
          <p className="text-white/60 text-sm font-medium">Tap to show controls</p>
        </motion.div>
      )}
    </div>
  )
}
