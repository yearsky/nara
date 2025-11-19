/**
 * Transcription Service
 * Handles speech-to-text conversion using Whisper API or browser's Web Speech API
 */

export interface TranscriptionResult {
  text: string
  duration: number
  language?: string
  method?: 'whisper' | 'browser' // Track which method was used
}

/**
 * Transcribe audio blob to text
 * Falls back to browser's Web Speech API if OpenAI key not configured
 * @param audioBlob - Audio blob to transcribe
 * @param language - Optional language code (e.g., 'en', 'id')
 * @returns Transcription result with text and duration
 */
export async function transcribeAudio(
  audioBlob: Blob,
  language: string = 'id-ID'
): Promise<TranscriptionResult> {
  const openaiKey = process.env.OPENAI_API_KEY

  // Validate audio blob
  if (!audioBlob || audioBlob.size === 0) {
    throw new Error('Invalid audio blob: empty or null')
  }

  // Use Whisper API if OpenAI key is available
  if (openaiKey && openaiKey !== 'sk-your-openai-key-here') {
    return transcribeWithWhisper(audioBlob, language, openaiKey)
  }

  // Fallback to browser's Web Speech API
  console.log('📢 Using browser Web Speech API (no OpenAI key configured)')
  return transcribeWithBrowser(audioBlob, language)
}

/**
 * Transcribe using OpenAI Whisper API
 */
async function transcribeWithWhisper(
  audioBlob: Blob,
  language: string,
  apiKey: string
): Promise<TranscriptionResult> {
  // Check file size (OpenAI Whisper has 25MB limit)
  const maxSize = 25 * 1024 * 1024 // 25MB
  if (audioBlob.size > maxSize) {
    throw new Error('Audio file too large. Maximum size is 25MB.')
  }

  try {
    const formData = new FormData()
    const audioFile = new File([audioBlob], 'audio.webm', {
      type: audioBlob.type || 'audio/webm',
    })

    formData.append('file', audioFile)
    formData.append('model', 'whisper-1')

    // Convert language code (id-ID -> id, en-US -> en)
    const langCode = language.split('-')[0]
    if (langCode) {
      formData.append('language', langCode)
    }

    const startTime = Date.now()

    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))

      if (response.status === 401) {
        throw new Error('Invalid OpenAI API key')
      } else if (response.status === 413) {
        throw new Error('Audio file too large')
      } else {
        throw new Error(
          errorData.error?.message || `Whisper API error: ${response.status}`
        )
      }
    }

    const data = await response.json()
    const duration = Date.now() - startTime

    return {
      text: data.text || '',
      duration,
      language: data.language,
      method: 'whisper',
    }
  } catch (error) {
    // Fallback to browser if Whisper fails
    console.warn('Whisper API failed, falling back to browser:', error)
    return transcribeWithBrowser(audioBlob, language)
  }
}

/**
 * Transcribe using browser's Web Speech API (fallback, free)
 */
async function transcribeWithBrowser(
  audioBlob: Blob,
  language: string = 'id-ID'
): Promise<TranscriptionResult> {
  // Check if Web Speech API is supported
  if (typeof window === 'undefined') {
    throw new Error('Browser environment required for Web Speech API')
  }

  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

  if (!SpeechRecognition) {
    throw new Error('Web Speech API not supported in this browser. Please use Chrome, Edge, or Safari.')
  }

  const startTime = Date.now()

  return new Promise((resolve, reject) => {
    try {
      const recognition = new SpeechRecognition()
      recognition.lang = language
      recognition.continuous = false
      recognition.interimResults = false
      recognition.maxAlternatives = 1

      // Convert blob to audio element to play it
      const audioUrl = URL.createObjectURL(audioBlob)
      const audio = new Audio(audioUrl)

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        const duration = Date.now() - startTime

        URL.revokeObjectURL(audioUrl)

        resolve({
          text: transcript,
          duration,
          language,
          method: 'browser',
        })
      }

      recognition.onerror = (event: any) => {
        URL.revokeObjectURL(audioUrl)
        reject(new Error(`Speech recognition error: ${event.error}`))
      }

      // Start recognition and play audio
      recognition.start()
      audio.play()

      // Stop recognition when audio ends
      audio.onended = () => {
        setTimeout(() => {
          recognition.stop()
        }, 500)
      }
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * Convert audio blob to different format if needed
 * Some formats are better supported by Whisper (e.g., MP3, WAV)
 */
export async function convertAudioFormat(
  blob: Blob,
  targetFormat: 'wav' | 'mp3' = 'wav'
): Promise<Blob> {
  // This is a placeholder - actual conversion would require Web Audio API
  // or a library like lamejs for MP3 encoding

  // For now, return the original blob
  // In production, you might want to use Web Audio API to convert to WAV
  return blob
}

/**
 * Check if audio format is supported by Whisper API
 */
export function isSupportedAudioFormat(mimeType: string): boolean {
  const supported = [
    'audio/webm',
    'audio/mp3',
    'audio/mpeg',
    'audio/wav',
    'audio/ogg',
    'audio/flac',
    'audio/m4a',
  ]

  return supported.some((type) => mimeType.includes(type))
}
