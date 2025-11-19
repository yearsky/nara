/**
 * OpenRouter Service
 * Handles communication with OpenRouter API for LLM chat completions
 * Using official @openrouter/sdk
 */

import { OpenRouter } from '@openrouter/sdk'

export interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export type OpenRouterModel =
  | 'anthropic/claude-sonnet-4-20250514'
  | 'openai/gpt-4-turbo-preview'
  | 'anthropic/claude-3.5-sonnet'
  | 'openai/gpt-4o'
  | 'google/gemini-2.0-flash-exp'
  | 'google/gemini-2.0-flash-exp:free'
  | 'google/gemini-flash-1.5'
  | string // Allow any OpenRouter model

/**
 * Create OpenRouter client instance
 */
function getOpenRouterClient(): OpenRouter {
  const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_KEY

  if (!apiKey || apiKey === 'sk-or-v1-xxxxxx') {
    throw new Error('OpenRouter API key not configured. Please set NEXT_PUBLIC_OPENROUTER_KEY in .env.local')
  }

  return new OpenRouter({
    apiKey,
  })
}

/**
 * Call OpenRouter Chat API with messages using official SDK
 * @param messages - Array of chat messages
 * @param model - LLM model to use
 * @param stream - Enable streaming responses
 * @param onChunk - Callback for streaming chunks
 * @returns Response text and token usage
 */
export async function callOpenRouterChat(
  messages: Message[],
  model: OpenRouterModel = 'google/gemini-2.0-flash-exp',
  stream: boolean = false,
  onChunk?: (chunk: string) => void
): Promise<{ response: string; tokensUsed: number }> {
  try {
    const client = getOpenRouterClient()

    // Handle non-streaming response (simpler approach)
    const completion = await client.chat.send({
      model,
      messages: messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      stream: false,
      temperature: 0.7,
      maxTokens: 1000,
    })

    const messageContent = completion.choices[0]?.message?.content

    // Handle content - it can be string or array of content items
    let responseText = ''
    if (typeof messageContent === 'string') {
      responseText = messageContent
    } else if (Array.isArray(messageContent)) {
      // Extract text from content items
      responseText = messageContent
        .filter((item: any) => item.type === 'text')
        .map((item: any) => item.text)
        .join('')
    }

    const tokensUsed = completion.usage?.totalTokens || estimateTokens(responseText)

    return {
      response: responseText,
      tokensUsed,
    }
  } catch (error) {
    if (error instanceof Error) {
      // Better error handling
      if (error.message.includes('401')) {
        throw new Error('Invalid OpenRouter API key')
      } else if (error.message.includes('429')) {
        throw new Error('Rate limit exceeded. Please try again later.')
      } else if (error.message.includes('402')) {
        throw new Error('Insufficient credits in OpenRouter account')
      }
      throw error
    }
    throw new Error('Failed to call OpenRouter API')
  }
}

/**
 * Estimate token count from text
 * Rough estimation: ~4 characters per token for English/Indonesian
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
  const pricePerMillionTokens: Record<string, number> = {
    'anthropic/claude-sonnet-4-20250514': 15, // $15 per million tokens (estimate)
    'openai/gpt-4-turbo-preview': 10,
    'anthropic/claude-3.5-sonnet': 15,
    'openai/gpt-4o': 10,
    'google/gemini-2.0-flash-exp': 0, // Free tier model
    'google/gemini-2.0-flash-exp:free': 0, // Free tier model with explicit :free suffix
    'google/gemini-flash-1.5': 0.075, // Very cheap,
  }

  // Handle :free suffix models
  const modelKey = model.includes(':free') ? model : model
  const price = pricePerMillionTokens[modelKey] || pricePerMillionTokens[model.replace(':free', '')] || 10
  const costInDollars = (tokensUsed / 1_000_000) * price

  // Convert to credits (1 credit = $0.10)
  return Math.max(1, Math.ceil(costInDollars * 10))
}
