'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface CallHeaderProps {
  name: string
  duration: string
  isVisible: boolean
}

/**
 * Call Header Component
 * Displays character name and conversation timer at the top
 * Auto-hides after period of inactivity
 */
export default function CallHeader({ name, duration, isVisible }: CallHeaderProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed top-0 left-0 right-0 z-40 pointer-events-none"
          style={{
            paddingTop: 'env(safe-area-inset-top, 0px)',
          }}
        >
          {/* Gradient background fade from top */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />

          {/* Content */}
          <div className="relative flex flex-col items-center justify-center pt-4 pb-6 px-4">
            {/* Character name */}
            <h1 className="text-white text-2xl md:text-3xl font-bold tracking-tight drop-shadow-lg">
              {name}
            </h1>

            {/* Timer */}
            <p className="text-white/80 text-base md:text-lg font-medium mt-1 drop-shadow">
              {duration}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
