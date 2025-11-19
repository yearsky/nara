'use client'

import { motion } from 'framer-motion'
import { ChevronLeft, Menu, Clock } from 'lucide-react'
import { useEffect, useState } from 'react'

interface EnhancedHeaderProps {
  characterName?: string
  onBack?: () => void
  onToggleSidebar?: () => void
  hasUnreadHistory?: boolean
  isVisible?: boolean
}

/**
 * Enhanced Header Component
 * 3-section header: Back button | Nara Info + Time | History Menu
 */
export default function EnhancedHeader({
  characterName = 'Nara',
  onBack,
  onToggleSidebar,
  hasUnreadHistory = false,
  isVisible = true,
}: EnhancedHeaderProps) {
  const [currentTime, setCurrentTime] = useState('')

  // Update time every minute
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
        })
      )
    }

    updateTime()
    const interval = setInterval(updateTime, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="absolute top-0 left-0 right-0 z-[70]"
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
    >
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left: Back Button - Individual Glass */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="p-2 rounded-full bg-black/40 backdrop-blur-md hover:bg-black/50 transition-colors shadow-lg border border-white/10"
          aria-label="Back"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </motion.button>

        {/* Center: Nara Info + Time - Individual Glass */}
        <div className="flex items-center gap-3 px-3 py-2 rounded-full bg-black/40 backdrop-blur-md shadow-lg border border-white/10">
          {/* Nara Avatar */}
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">{characterName[0]}</span>
            </div>
            {/* Online indicator */}
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-black/60"></div>
          </div>

          {/* Name + Status */}
          <div className="text-left">
            <p className="text-white font-semibold text-sm leading-tight">
              {characterName}
            </p>
            <p className="text-green-400 text-xs font-medium leading-tight">
              ● Online
            </p>
          </div>

          {/* Time */}
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/20">
            <Clock className="w-3 h-3 text-white/80" />
            <span className="text-white/90 text-xs font-medium">
              {currentTime}
            </span>
          </div>
        </div>

        {/* Right: History Sidebar Toggle - Individual Glass */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggleSidebar}
          className="relative p-2 rounded-full bg-black/40 backdrop-blur-md hover:bg-black/50 transition-colors shadow-lg border border-white/10"
          aria-label="Open history"
        >
          <Menu className="w-6 h-6 text-white" />

          {/* Unread badge */}
          {hasUnreadHistory && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
            >
              <span className="text-white text-[10px] font-bold">!</span>
            </motion.div>
          )}
        </motion.button>
      </div>
    </motion.div>
  )
}
