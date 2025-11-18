import { useState, useEffect } from 'react'

/**
 * Custom hook for tracking call/conversation duration
 * @param isActive - Whether the timer should be running
 * @returns Object with seconds count and formatted time string (MM:SS)
 */
export function useCallTimer(isActive: boolean) {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    if (!isActive) {
      setSeconds(0)
      return
    }

    const interval = setInterval(() => {
      setSeconds(s => s + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [isActive])

  // Format as MM:SS
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  const formatted = `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`

  return { seconds, formatted }
}
