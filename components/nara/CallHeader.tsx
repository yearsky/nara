'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

interface CallHeaderProps {
  name: string
  duration: string
  isVisible: boolean
  onBack?: () => void
}

/**
 * Call Header Component
 * Displays back button, character name and conversation timer at the top
 * Auto-hides after period of inactivity
 */
export default function CallHeader({ name, duration, isVisible, onBack }: CallHeaderProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed top-4 left-4 right-4 md:top-8 md:left-8 md:right-8 z-40"
          style={{
            paddingTop: 'env(safe-area-inset-top, 0px)',
          }}
        >
          {/* Content Container - Floating */}
          <div className="flex items-center gap-3 md:gap-4 max-w-4xl mx-auto pointer-events-auto">
            {/* Back Button - Floating */}
            {onBack && (
              <motion.button
                onClick={onBack}
                className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/20 backdrop-blur-xl shadow-lg flex items-center justify-center hover:bg-white/30 transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Back"
              >
                <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </motion.button>
            )}

            {/* Name and Timer Container - Floating */}
            <motion.div
              className="flex-1 bg-white/20 backdrop-blur-xl rounded-full px-4 md:px-6 py-3 md:py-4 shadow-lg"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex flex-col">
                {/* Character name */}
                <h1 className="text-white text-lg md:text-xl font-bold tracking-tight">
                  {name}
                </h1>

                {/* Timer */}
                <p className="text-white/70 text-xs md:text-sm font-medium">
                  {duration}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
