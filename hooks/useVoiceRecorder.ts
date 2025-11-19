import { useState, useEffect, useRef, useCallback } from 'react'
import { AudioRecorder } from '@/lib/audioRecorder'

/**
 * Custom hook for voice recording with Web Audio API
 * Wrapper around AudioRecorder class with React state management
 */
export function useVoiceRecorder() {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  const recorderRef = useRef<AudioRecorder | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize recorder on mount
  useEffect(() => {
    const initRecorder = async () => {
      if (!AudioRecorder.isSupported()) {
        setError('Audio recording is not supported in this browser')
        return
      }

      try {
        const recorder = new AudioRecorder({
          onError: (err) => setError(err.message),
        })
        await recorder.initialize()
        recorderRef.current = recorder
        setIsInitialized(true)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize recorder')
      }
    }

    initRecorder()

    // Cleanup on unmount
    return () => {
      if (recorderRef.current) {
        recorderRef.current.destroy()
        recorderRef.current = null
      }
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  /**
   * Start recording audio
   */
  const startRecording = useCallback(async (): Promise<void> => {
    if (!recorderRef.current) {
      setError('Recorder not initialized')
      return
    }

    if (isRecording) {
      return // Already recording
    }

    try {
      recorderRef.current.startRecording()
      setIsRecording(true)
      setRecordingTime(0)
      setError(null)

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start recording')
    }
  }, [isRecording])

  /**
   * Stop recording and return audio blob
   */
  const stopRecording = useCallback(async (): Promise<Blob | null> => {
    if (!recorderRef.current || !isRecording) {
      return null
    }

    try {
      const blob = await recorderRef.current.stopRecording()
      setIsRecording(false)

      // Stop timer
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }

      return blob
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to stop recording')
      setIsRecording(false)
      return null
    }
  }, [isRecording])

  /**
   * Get current audio waveform data for visualization
   */
  const getWaveformData = useCallback((): Uint8Array => {
    if (!recorderRef.current) {
      return new Uint8Array(0)
    }
    return recorderRef.current.getTimeDomainData()
  }, [])

  /**
   * Get current audio volume level (0-100)
   */
  const getVolume = useCallback((): number => {
    if (!recorderRef.current) {
      return 0
    }
    return recorderRef.current.getVolume()
  }, [])

  return {
    isRecording,
    recordingTime,
    error,
    isInitialized,
    startRecording,
    stopRecording,
    getWaveformData,
    getVolume,
  }
}
