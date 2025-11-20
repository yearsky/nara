import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * Custom hook for live speech recognition
 * Uses browser's Web Speech API for real-time transcription
 * Features:
 * - Real-time transcription with interim results
 * - Silence detection (auto-send after X seconds of no speech)
 * - Error handling and browser compatibility
 */
export function useLiveTranscription(
  language: string = 'id-ID',
  silenceTimeout: number = 5000, // Auto-send after 5 seconds of silence
  onAutoSend?: (transcript: string) => void
) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [interimTranscript, setInterimTranscript] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSupported, setIsSupported] = useState(false)

  const recognitionRef = useRef<any>(null)
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null)
  const lastSpeechTimeRef = useRef<number>(0)
  const isManualStopRef = useRef<boolean>(false)
  const shouldBeListeningRef = useRef<boolean>(false)

  // Clear silence timer helper
  const clearSilenceTimer = useCallback(() => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current)
      silenceTimerRef.current = null
    }
  }, [])

  // Start silence detection timer
  const startSilenceTimer = useCallback(() => {
    clearSilenceTimer()

    silenceTimerRef.current = setTimeout(() => {
      const fullTranscript = (transcript + ' ' + interimTranscript).trim()

      console.log('[useLiveTranscription] Silence detected, auto-sending:', fullTranscript)

      if (fullTranscript && onAutoSend) {
        onAutoSend(fullTranscript)
      }

      // Stop listening after auto-send (mark as manual stop to prevent restart)
      if (recognitionRef.current) {
        try {
          isManualStopRef.current = true
          shouldBeListeningRef.current = false
          recognitionRef.current.stop()
        } catch (err) {
          console.error('[useLiveTranscription] Error stopping recognition:', err)
        }
      }
    }, silenceTimeout)
  }, [transcript, interimTranscript, silenceTimeout, onAutoSend, clearSilenceTimer])

  // Check browser support on mount
  useEffect(() => {
    if (typeof window === 'undefined') {
      setIsSupported(false)
      console.log('[useLiveTranscription] Not in browser environment')
      return
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

    if (SpeechRecognition) {
      setIsSupported(true)
      console.log('[useLiveTranscription] Web Speech API supported')

      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true // Keep listening
      recognitionRef.current.interimResults = true // Show interim results
      recognitionRef.current.lang = language
      recognitionRef.current.maxAlternatives = 1

      // Setup event handlers
      recognitionRef.current.onstart = () => {
        console.log('[useLiveTranscription] Recognition started')
        setIsListening(true)
        setError(null)
      }

      recognitionRef.current.onresult = (event: any) => {
        let interim = ''
        let final = ''

        console.log('[useLiveTranscription] Got result, resultIndex:', event.resultIndex, 'total:', event.results.length)

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptText = event.results[i][0].transcript

          if (event.results[i].isFinal) {
            final += transcriptText + ' '
            console.log('[useLiveTranscription] Final transcript:', transcriptText)
          } else {
            interim += transcriptText
            console.log('[useLiveTranscription] Interim transcript:', transcriptText)
          }
        }

        // Update last speech time
        lastSpeechTimeRef.current = Date.now()

        if (final) {
          setTranscript((prev) => prev + final)
          setInterimTranscript('')
        } else {
          setInterimTranscript(interim)
        }

        // Restart silence timer on every speech
        startSilenceTimer()
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error('[useLiveTranscription] Speech recognition error:', event.error)

        clearSilenceTimer()

        // Handle specific errors - DON'T auto-stop for no-speech on mobile
        if (event.error === 'no-speech') {
          console.warn('[useLiveTranscription] No speech detected - will keep trying')
          // Don't set error or stop listening - just log it
          // Mobile browsers are sensitive and may trigger this falsely
          return
        } else if (event.error === 'audio-capture') {
          console.error('[useLiveTranscription] Microphone not accessible')
          setError('Mikrofon tidak ditemukan atau tidak diizinkan.')
          setIsListening(false)
        } else if (event.error === 'not-allowed') {
          console.error('[useLiveTranscription] Microphone permission denied')
          setError('Izin mikrofon ditolak. Mohon izinkan akses mikrofon.')
          setIsListening(false)
        } else if (event.error === 'aborted') {
          console.log('[useLiveTranscription] Recognition aborted by user')
          // Don't show error for aborted (user stopped)
          setError(null)
          setIsListening(false)
        } else if (event.error === 'network') {
          console.error('[useLiveTranscription] Network error')
          setError('Kesalahan jaringan. Periksa koneksi internet.')
          setIsListening(false)
        } else {
          console.error('[useLiveTranscription] Unknown error:', event.error)
          setError(`Error: ${event.error}`)
          setIsListening(false)
        }
      }

      recognitionRef.current.onend = () => {
        console.log('[useLiveTranscription] Recognition ended')
        console.log('  - isManualStop:', isManualStopRef.current)
        console.log('  - shouldBeListening:', shouldBeListeningRef.current)

        clearSilenceTimer()

        // If this was a manual stop, update state and exit
        if (isManualStopRef.current) {
          console.log('[useLiveTranscription] Manual stop detected, updating state')
          setIsListening(false)
          isManualStopRef.current = false
          shouldBeListeningRef.current = false
          return
        }

        // If recognition ended unexpectedly but we should still be listening, try to restart
        if (shouldBeListeningRef.current) {
          console.log('[useLiveTranscription] Unexpected end, attempting to restart...')

          // Wait a bit before restarting to avoid rapid restart loops
          setTimeout(() => {
            if (shouldBeListeningRef.current && recognitionRef.current) {
              try {
                console.log('[useLiveTranscription] Restarting recognition...')
                recognitionRef.current.start()
              } catch (err) {
                console.error('[useLiveTranscription] Failed to restart:', err)
                setIsListening(false)
                shouldBeListeningRef.current = false
              }
            }
          }, 200)
        } else {
          // Normal end, update state
          setIsListening(false)
        }
      }

      recognitionRef.current.onspeechstart = () => {
        console.log('[useLiveTranscription] Speech started')
      }

      recognitionRef.current.onspeechend = () => {
        console.log('[useLiveTranscription] Speech ended')
      }
    } else {
      setIsSupported(false)
      console.error('[useLiveTranscription] Web Speech API not supported')
      setError('Peramban tidak mendukung speech recognition. Gunakan Chrome, Edge, atau Safari.')
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop()
        } catch (err) {
          console.log('[useLiveTranscription] Cleanup: recognition already stopped')
        }
      }
      clearSilenceTimer()
    }
  }, [language, clearSilenceTimer, startSilenceTimer])

  /**
   * Start listening to speech
   */
  const startListening = useCallback(() => {
    if (!recognitionRef.current || !isSupported) {
      console.error('[useLiveTranscription] Cannot start - recognition not available')
      setError('Speech recognition tidak tersedia')
      return
    }

    try {
      console.log('[useLiveTranscription] Starting recognition...')
      setTranscript('')
      setInterimTranscript('')
      setError(null)
      lastSpeechTimeRef.current = Date.now()

      // Mark that we want to be listening (for auto-restart on unexpected end)
      shouldBeListeningRef.current = true
      isManualStopRef.current = false

      recognitionRef.current.start()
      // Note: setIsListening(true) akan dipanggil di onstart handler
    } catch (err: any) {
      console.error('[useLiveTranscription] Failed to start recognition:', err)

      // Handle case where recognition is already running
      if (err.message && err.message.includes('already started')) {
        console.log('[useLiveTranscription] Recognition already running')
        setIsListening(true)
        shouldBeListeningRef.current = true
      } else {
        setError('Gagal memulai speech recognition')
        shouldBeListeningRef.current = false
      }
    }
  }, [isSupported])

  /**
   * Stop listening to speech
   */
  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return

    try {
      console.log('[useLiveTranscription] Stopping recognition (manual)...')

      // Mark this as a manual stop (don't auto-restart)
      isManualStopRef.current = true
      shouldBeListeningRef.current = false

      clearSilenceTimer()
      recognitionRef.current.stop()
      // Note: setIsListening(false) akan dipanggil di onend handler
    } catch (err) {
      console.error('[useLiveTranscription] Failed to stop recognition:', err)
      setIsListening(false)
      shouldBeListeningRef.current = false
    }
  }, [clearSilenceTimer])

  /**
   * Reset transcript
   */
  const resetTranscript = useCallback(() => {
    console.log('[useLiveTranscription] Resetting transcript')
    setTranscript('')
    setInterimTranscript('')
    clearSilenceTimer()
  }, [clearSilenceTimer])

  /**
   * Get full transcript (final + interim)
   */
  const getFullTranscript = useCallback(() => {
    return (transcript + ' ' + interimTranscript).trim()
  }, [transcript, interimTranscript])

  return {
    isListening,
    transcript, // Final confirmed transcript
    interimTranscript, // Interim (being spoken) transcript
    fullTranscript: getFullTranscript(),
    error,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
  }
}
