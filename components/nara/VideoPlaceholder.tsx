'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Video Placeholder Component
 * Displays a placeholder while Live2D/actual video is being implemented
 * Uses animated gradient background as fallback
 */
export default function VideoPlaceholder() {
  const [hasVideo, setHasVideo] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if video file exists
    const checkVideo = async () => {
      try {
        const response = await fetch('/videos/nara-placeholder.mp4', { method: 'HEAD' })
        setHasVideo(response.ok)
      } catch (error) {
        setHasVideo(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkVideo()
  }, [])

  if (isLoading) {
    return (
      <div className="absolute inset-0 bg-stone-900 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (hasVideo) {
    return (
      <div className="absolute inset-0 overflow-hidden bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/nara-poster.jpg"
          className="w-full h-full object-cover"
          onError={() => setHasVideo(false)}
        >
          <source src="/videos/nara-placeholder.mp4" type="video/mp4" />
        </video>

        {/* Gradient Overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/40 pointer-events-none" />
      </div>
    )
  }

  // Fallback: Animated gradient background
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          backgroundSize: '200% 200%',
        }}
      />

      {/* Overlay gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30 pointer-events-none" />

      {/* Animated particles/circles for visual interest */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: Math.random() * 200 + 100,
              height: Math.random() * 200 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Center character placeholder (optional) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="text-white/20 text-9xl font-bold"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          N
        </motion.div>
      </div>
    </div>
  )
}
