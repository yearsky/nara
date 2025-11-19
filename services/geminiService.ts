/**
 * Gemini Service
 * Handles communication with Google Gemini API for LLM chat completions
 */

export interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}

/**
 * Call Google Gemini API with messages
 * @param messages - Array of chat messages
 * @param stream - Enable streaming responses
 * @param onChunk - Callback for streaming chunks
 * @returns Response text
 */
export async function callGeminiChat(
  messages: Message[],
  stream: boolean = false,
  onChunk?: (chunk: string) => void
): Promise<{ response: string; tokensUsed: number }> {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY

  if (!apiKey || apiKey === 'your-gemini-api-key-here') {
    throw new Error('Gemini API key not configured. Please set NEXT_PUBLIC_GEMINI_API_KEY')
  }

  try {
    // Convert messages to Gemini format
    const geminiMessages = convertToGeminiFormat(messages)

    // Gemini API endpoint
    const endpoint = stream
      ? `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:streamGenerateContent?key=${apiKey}`
      : `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: geminiMessages,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1000,
          topP: 0.95,
          topK: 40,
        },
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))

      // Handle specific error cases
      if (response.status === 401 || response.status === 403) {
        throw new Error('Invalid Gemini API key')
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.')
      } else {
        throw new Error(
          errorData.error?.message || `Gemini API error: ${response.status}`
        )
      }
    }

    // Handle streaming response
    if (stream && response.body) {
      return handleGeminiStreamingResponse(response.body, onChunk)
    }

    // Handle non-streaming response
    const data = await response.json()
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || ''
    const tokensUsed = estimateTokens(responseText)

    return {
      response: responseText,
      tokensUsed,
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Failed to call Gemini API')
  }
}

/**
 * Convert OpenAI-style messages to Gemini format
 */
function convertToGeminiFormat(messages: Message[]) {
  const systemMessage = messages.find((m) => m.role === 'system')
  const conversationMessages = messages.filter((m) => m.role !== 'system')

  const geminiContents = conversationMessages.map((msg) => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }],
  }))

  // If there's a system message, prepend it as the first user message
  if (systemMessage) {
    geminiContents.unshift({
      role: 'user',
      parts: [{ text: systemMessage.content }],
    })
    geminiContents.splice(1, 0, {
      role: 'model',
      parts: [{ text: 'Understood. I will follow these instructions.' }],
    })
  }

  return geminiContents
}

/**
 * Handle streaming response from Gemini
 */
async function handleGeminiStreamingResponse(
  body: ReadableStream<Uint8Array>,
  onChunk?: (chunk: string) => void
): Promise<{ response: string; tokensUsed: number }> {
  const reader = body.getReader()
  const decoder = new TextDecoder()
  let fullResponse = ''

  try {
    while (true) {
      const { done, value } = await reader.read()

      if (done) break

      const chunk = decoder.decode(value)
      const lines = chunk.split('\n').filter((line) => line.trim() !== '')

      for (const line of lines) {
        try {
          const data = JSON.parse(line)
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text

          if (text) {
            fullResponse += text
            onChunk?.(text)
          }
        } catch (e) {
          // Skip malformed JSON
          console.warn('Failed to parse Gemini streaming chunk:', e)
        }
      }
    }

    const tokensUsed = estimateTokens(fullResponse)

    return {
      response: fullResponse,
      tokensUsed,
    }
  } finally {
    reader.releaseLock()
  }
}

/**
 * Estimate token count from text
 * Rough estimation: ~4 characters per token
 */
export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4)
}

/**
 * Calculate credits used based on tokens
 * Gemini 2.5 Flash is very cheap/free tier available
 */
export function calculateCredits(tokensUsed: number): number {
  // Gemini Flash is very cheap - 1 credit per request for simplicity
  return 1
}
