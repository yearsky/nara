'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Video, VideoOff, Mic, MicOff, Phone } from 'lucide-react'

interface VideoCallControlsProps {
  isCameraOn: boolean
  isMicOn: boolean
  isVisible: boolean
  onCameraToggle: () => void
  onMicToggle: () => void
  onEndCall: () => void
}

/**
 * Video Call Controls Component
 * Bottom control bar with camera, microphone, and end call buttons
 * iOS-style design with center mic button larger
 */
export default function VideoCallControls({
  isCameraOn,
  isMicOn,
  isVisible,
  onCameraToggle,
  onMicToggle,
  onEndCall,
}: VideoCallControlsProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed bottom-0 left-0 right-0 z-40"
          style={{
            paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          }}
        >
          {/* Background with backdrop blur */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-md rounded-t-3xl" />

          {/* Controls container */}
          <div className="relative px-8 py-6">
            <div className="flex items-center justify-between max-w-md mx-auto">
              {/* Camera Button (Left) */}
              <ControlButton
                onClick={onCameraToggle}
                isActive={isCameraOn}
                size="medium"
                icon={isCameraOn ? Video : VideoOff}
                label={isCameraOn ? 'Camera On' : 'Camera Off'}
              />

              {/* Microphone Button (Center - Larger) */}
              <ControlButton
                onClick={onMicToggle}
                isActive={isMicOn}
                size="large"
                icon={isMicOn ? Mic : MicOff}
                label={isMicOn ? 'Mic On' : 'Mic Off'}
              />

              {/* End Call Button (Right) */}
              <ControlButton
                onClick={onEndCall}
                isActive={false}
                size="medium"
                icon={Phone}
                label="End Call"
                variant="danger"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Control Button Component
interface ControlButtonProps {
  onClick: () => void
  isActive: boolean
  size: 'medium' | 'large'
  icon: React.ComponentType<{ className?: string }>
  label: string
  variant?: 'default' | 'danger'
}

function ControlButton({
  onClick,
  isActive,
  size,
  icon: Icon,
  label,
  variant = 'default',
}: ControlButtonProps) {
  const sizeClasses = size === 'large' ? 'w-16 h-16' : 'w-14 h-14'

  const bgClasses =
    variant === 'danger'
      ? 'bg-red-500 hover:bg-red-600'
      : isActive
        ? 'bg-white/30 hover:bg-white/40'
        : 'bg-white/20 hover:bg-white/30'

  return (
    <motion.button
      onClick={onClick}
      className={`${sizeClasses} ${bgClasses} rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={label}
      title={label}
    >
      <Icon className="w-6 h-6 text-white" />
    </motion.button>
  )
}
