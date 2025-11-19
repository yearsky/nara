/**
 * Transcription Service
 * Handles speech-to-text conversion using OpenRouter's Whisper API
 */

export interface TranscriptionResult {
  text: string
  duration: number
  language?: string
}

/**
 * Transcribe audio blob to text using Whisper API via OpenRouter
 * @param audioBlob - Audio blob to transcribe
 * @param language - Optional language code (e.g., 'en', 'id')
 * @returns Transcription result with text and duration
 */
export async function transcribeAudio(
  audioBlob: Blob,
  language?: string
): Promise<TranscriptionResult> {
  const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_KEY

  if (!apiKey || apiKey === 'sk-or-v1-xxxxxx') {
    throw new Error('OpenRouter API key not configured')
  }

  // Validate audio blob
  if (!audioBlob || audioBlob.size === 0) {
    throw new Error('Invalid audio blob: empty or null')
  }

  // Check file size (OpenAI Whisper has 25MB limit)
  const maxSize = 25 * 1024 * 1024 // 25MB
  if (audioBlob.size > maxSize) {
    throw new Error('Audio file too large. Maximum size is 25MB.')
  }

  try {
    // Create FormData for multipart upload
    const formData = new FormData()

    // Convert blob to File object with proper extension
    const audioFile = new File([audioBlob], 'audio.webm', {
      type: audioBlob.type || 'audio/webm',
    })

    formData.append('file', audioFile)
    formData.append('model', 'whisper-1')

    if (language) {
      formData.append('language', language)
    }

    const startTime = Date.now()

    // Call OpenAI-compatible Whisper API via OpenRouter
    // OpenRouter proxies to OpenAI's Whisper API
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
        throw new Error('Invalid API key for transcription')
      } else if (response.status === 413) {
        throw new Error('Audio file too large')
      } else if (response.status === 400) {
        throw new Error(errorData.error?.message || 'Invalid audio format or request')
      } else {
        throw new Error(
          errorData.error?.message || `Transcription API error: ${response.status}`
        )
      }
    }

    const data = await response.json()
    const duration = Date.now() - startTime

    return {
      text: data.text || '',
      duration,
      language: data.language,
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Failed to transcribe audio')
  }
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
