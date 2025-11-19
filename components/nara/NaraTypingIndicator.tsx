'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

interface NaraTypingIndicatorProps {
  variant?: 'thinking' | 'typing'
  mode?: 'desktop' | 'mobile'
}

// Claude-style thinking phases
const thinkingPhases = [
  'Membaca pesan...',
  'Memahami konteks...',
  'Memikirkan respons...',
  'Menyusun jawaban...',
]

/**
 * Nara Typing Indicator Component
 * Claude-style thinking animation with cycling text and progress bar
 */
export default function NaraTypingIndicator({
  variant = 'typing',
  mode = 'desktop'
}: NaraTypingIndicatorProps) {
  const [phaseIndex, setPhaseIndex] = useState(0)

  // Cycle through thinking phases
  useEffect(() => {
    const interval = setInterval(() => {
      setPhaseIndex((prev) => (prev + 1) % thinkingPhases.length)
    }, 2000) // Change phase every 2 seconds

    return () => clearInterval(interval)
  }, [])

  // Different styling for mobile overlay vs desktop panel
  const bubbleClass = mode === 'mobile'
    ? 'bg-orange-500/30 backdrop-blur-md rounded-2xl px-4 py-3 shadow-lg'
    : 'bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg'

  const labelClass = mode === 'mobile' ? 'text-xs font-bold text-orange-200' : 'text-xs font-bold text-orange-300'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={mode === 'desktop' ? 'flex justify-start' : ''}
    >
      <div className={`relative overflow-hidden ${bubbleClass}`}>
        {/* Nara Label */}
        <p className={`${labelClass} ${mode === 'desktop' ? 'mb-2' : 'mb-1.5'}`}>Nara</p>

        {/* Animated Thinking Text */}
        <div className="relative h-6 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={phaseIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={mode === 'desktop' ? 'text-sm text-white/90' : 'text-xs text-white/80'}
            >
              {thinkingPhases[phaseIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Progress Bar */}
        <div className="mt-3 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-orange-400 to-orange-500"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{ width: '50%' }}
          />
        </div>

        {/* Shimmer Overlay Effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.08) 50%, transparent 100%)',
          }}
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>
    </motion.div>
  )
}
