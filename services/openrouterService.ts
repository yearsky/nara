/**
 * OpenRouter Service
 * Handles communication with OpenRouter API for LLM chat completions
 */

export interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export type OpenRouterModel =
  | 'anthropic/claude-sonnet-4-20250514'
  | 'openai/gpt-4-turbo-preview'
  | 'anthropic/claude-3.5-sonnet'
  | 'openai/gpt-4o'

export interface OpenRouterResponse {
  id: string
  choices: Array<{
    message: {
      role: string
      content: string
    }
    finish_reason: string
  }>
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

export interface StreamChunk {
  id: string
  choices: Array<{
    delta: {
      role?: string
      content?: string
    }
    finish_reason: string | null
  }>
}

/**
 * Call OpenRouter Chat API with messages
 * @param messages - Array of chat messages
 * @param model - LLM model to use
 * @param stream - Enable streaming responses
 * @param onChunk - Callback for streaming chunks
 * @returns Response text
 */
export async function callOpenRouterChat(
  messages: Message[],
  model: OpenRouterModel = 'anthropic/claude-3.5-sonnet',
  stream: boolean = false,
  onChunk?: (chunk: string) => void
): Promise<{ response: string; tokensUsed: number }> {
  const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_KEY

  if (!apiKey || apiKey === 'sk-or-v1-xxxxxx') {
    throw new Error('OpenRouter API key not configured. Please set NEXT_PUBLIC_OPENROUTER_KEY in .env.local')
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'HTTP-Referer': typeof window !== 'undefined' ? window.location.origin : '',
        'X-Title': 'Nara.ai Voice Chat',
      },
      body: JSON.stringify({
        model,
        messages,
        stream,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))

      // Handle specific error cases
      if (response.status === 401) {
        throw new Error('Invalid OpenRouter API key')
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.')
      } else if (response.status === 402) {
        throw new Error('Insufficient credits in OpenRouter account')
      } else {
        throw new Error(
          errorData.error?.message || `OpenRouter API error: ${response.status}`
        )
      }
    }

    // Handle streaming response
    if (stream && response.body) {
      return handleStreamingResponse(response.body, onChunk)
    }

    // Handle non-streaming response
    const data: OpenRouterResponse = await response.json()
    const responseText = data.choices[0]?.message?.content || ''
    const tokensUsed = data.usage?.total_tokens || 0

    return {
      response: responseText,
      tokensUsed,
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Failed to call OpenRouter API')
  }
}

/**
 * Handle streaming response from OpenRouter
 */
async function handleStreamingResponse(
  body: ReadableStream<Uint8Array>,
  onChunk?: (chunk: string) => void
): Promise<{ response: string; tokensUsed: number }> {
  const reader = body.getReader()
  const decoder = new TextDecoder()
  let fullResponse = ''
  let tokensUsed = 0

  try {
    while (true) {
      const { done, value } = await reader.read()

      if (done) break

      const chunk = decoder.decode(value)
      const lines = chunk.split('\n').filter((line) => line.trim() !== '')

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6)

          if (data === '[DONE]') {
            continue
          }

          try {
            const parsed: StreamChunk = JSON.parse(data)
            const content = parsed.choices[0]?.delta?.content

            if (content) {
              fullResponse += content
              onChunk?.(content)
            }
          } catch (e) {
            // Skip malformed JSON
            console.warn('Failed to parse streaming chunk:', e)
          }
        }
      }
    }

    // Estimate tokens (rough estimation: ~4 chars per token)
    tokensUsed = estimateTokens(fullResponse)

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
 * Rough estimation: ~4 characters per token for English
 * More accurate for production: use tiktoken library
 */
export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4)
}

/**
 * Calculate credits used based on tokens
 * OpenRouter pricing varies by model, this is a rough estimate
 */
export function calculateCredits(tokensUsed: number, model: OpenRouterModel): number {
  // Rough pricing (adjust based on actual OpenRouter pricing)
  const pricePerMillionTokens: Record<OpenRouterModel, number> = {
    'anthropic/claude-sonnet-4-20250514': 15, // $15 per million tokens (estimate)
    'openai/gpt-4-turbo-preview': 10,
    'anthropic/claude-3.5-sonnet': 15,
    'openai/gpt-4o': 10,
  }

  const price = pricePerMillionTokens[model] || 10
  const costInDollars = (tokensUsed / 1_000_000) * price

  // Convert to credits (1 credit = $0.10)
  return Math.max(1, Math.ceil(costInDollars * 10))
}
