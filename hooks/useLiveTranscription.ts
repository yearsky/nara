import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * Custom hook for live speech recognition
 * Uses browser's Web Speech API for real-time transcription
 */
export function useLiveTranscription(language: string = 'id-ID') {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [interimTranscript, setInterimTranscript] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSupported, setIsSupported] = useState(false)

  const recognitionRef = useRef<any>(null)

  // Check browser support on mount
  useEffect(() => {
    if (typeof window === 'undefined') {
      setIsSupported(false)
      return
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

    if (SpeechRecognition) {
      setIsSupported(true)
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true // Keep listening
      recognitionRef.current.interimResults = true // Show interim results
      recognitionRef.current.lang = language
      recognitionRef.current.maxAlternatives = 1

      // Setup event handlers
      recognitionRef.current.onresult = (event: any) => {
        let interim = ''
        let final = ''

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript

          if (event.results[i].isFinal) {
            final += transcript + ' '
          } else {
            interim += transcript
          }
        }

        if (final) {
          setTranscript((prev) => prev + final)
          setInterimTranscript('')
        } else {
          setInterimTranscript(interim)
        }
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)

        // Handle specific errors
        if (event.error === 'no-speech') {
          setError('No speech detected. Please try again.')
        } else if (event.error === 'audio-capture') {
          setError('Microphone not found or not permitted.')
        } else if (event.error === 'not-allowed') {
          setError('Microphone permission denied.')
        } else if (event.error === 'aborted') {
          // Don't show error for aborted (user stopped)
          setError(null)
        } else {
          setError(`Speech recognition error: ${event.error}`)
        }

        setIsListening(false)
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    } else {
      setIsSupported(false)
      setError('Speech recognition not supported in this browser. Please use Chrome, Edge, or Safari.')
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [language])

  /**
   * Start listening to speech
   */
  const startListening = useCallback(() => {
    if (!recognitionRef.current || !isSupported) {
      setError('Speech recognition not available')
      return
    }

    try {
      setTranscript('')
      setInterimTranscript('')
      setError(null)
      recognitionRef.current.start()
      setIsListening(true)
    } catch (err) {
      console.error('Failed to start recognition:', err)
      setError('Failed to start speech recognition')
    }
  }, [isSupported])

  /**
   * Stop listening to speech
   */
  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return

    try {
      recognitionRef.current.stop()
      setIsListening(false)
    } catch (err) {
      console.error('Failed to stop recognition:', err)
    }
  }, [])

  /**
   * Reset transcript
   */
  const resetTranscript = useCallback(() => {
    setTranscript('')
    setInterimTranscript('')
  }, [])

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
