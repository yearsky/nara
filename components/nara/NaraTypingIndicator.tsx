'use client'

import { motion } from 'framer-motion'

interface NaraTypingIndicatorProps {
  variant?: 'thinking' | 'typing'
  mode?: 'desktop' | 'mobile'
}

/**
 * Nara Typing Indicator Component
 * Shows an animated bubble when Nara is processing a response
 */
export default function NaraTypingIndicator({
  variant = 'typing',
  mode = 'desktop'
}: NaraTypingIndicatorProps) {
  const text = variant === 'thinking' ? 'Nara sedang berpikir' : 'Nara sedang mengetik'

  // Different styling for mobile overlay vs desktop panel
  const bubbleClass = mode === 'mobile'
    ? 'bg-orange-500/30 backdrop-blur-md rounded-2xl px-4 py-2 shadow-lg'
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
      <motion.div
        className={bubbleClass}
        animate={{
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Nara Label */}
        <p className={`${labelClass} ${mode === 'desktop' ? 'mb-2' : 'mb-1'}`}>Nara</p>

        {/* Status Text and Dots Container */}
        <div className="flex items-center gap-2">
          <span className={mode === 'desktop' ? 'text-sm text-white/80 italic' : 'text-xs text-white/70 italic'}>{text}</span>

          {/* Animated Typing Dots */}
          <div className="flex gap-1">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="w-2 h-2 bg-orange-400 rounded-full"
                animate={{
                  y: [0, -8, 0],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.15,
                }}
              />
            ))}
          </div>
        </div>

        {/* Shimmer Effect Overlay */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
          }}
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>
    </motion.div>
  )
}
