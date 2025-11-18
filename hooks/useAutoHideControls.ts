import { useState, useEffect, useCallback } from 'react'

/**
 * Custom hook for auto-hiding UI controls after period of inactivity
 * @param delay - Delay in milliseconds before hiding controls (default: 3000ms)
 * @returns Object with visibility state and function to show controls
 */
export function useAutoHideControls(delay: number = 3000) {
  const [isVisible, setIsVisible] = useState(true)
  const [lastActivityTime, setLastActivityTime] = useState(Date.now())

  // Function to show controls and reset timer
  const showControls = useCallback(() => {
    setIsVisible(true)
    setLastActivityTime(Date.now())
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      const timeSinceActivity = Date.now() - lastActivityTime
      if (timeSinceActivity >= delay) {
        setIsVisible(false)
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [lastActivityTime, delay])

  // Reset visibility on mount
  useEffect(() => {
    setIsVisible(true)
    setLastActivityTime(Date.now())
  }, [])

  return { isVisible, showControls }
}
