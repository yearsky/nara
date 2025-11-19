/**
 * Chat Service
 * Orchestrates chat flow with Nara AI
 */

import { callOpenRouterChat, calculateCredits, type OpenRouterModel } from './openrouterService'
import type { Message } from '@/stores/voiceChatStore'

export interface ChatResponse {
  response: string
  creditsUsed: number
  tokensUsed: number
}

/**
 * Get AI model from environment variable or use default
 */
function getAIModel(): OpenRouterModel {
  const envModel = process.env.NEXT_PUBLIC_AI_MODEL as OpenRouterModel
  return envModel || 'google/gemini-2.0-flash-exp'
}

/**
 * Get system prompt from environment variable or use default
 */
function getSystemPrompt(): string {
  const envPrompt = process.env.NEXT_PUBLIC_SYSTEM_PROMPT

  // Default system prompt if not set
  const defaultPrompt = `You are Nara, an enthusiastic and supportive AI learning companion. Your personality:
- Warm, encouraging, and friendly
- Patient and understanding with learners
- Use casual, conversational language
- Keep responses concise (2-3 sentences unless explaining something complex)
- Show genuine interest in the user's learning journey
- Use emojis occasionally to express emotion (but not excessively)
- When user seems stuck, ask guiding questions instead of giving direct answers

Your goal is to make learning enjoyable and keep users motivated.`

  return envPrompt || defaultPrompt
}

/**
 * Send a message to Nara and get response
 * @param userMessage - User's message text
 * @param chatHistory - Previous chat messages for context
 * @param onChunk - Optional callback for streaming responses
 * @param model - Optional OpenRouter model to use (overrides env variable)
 * @returns Chat response with credits used
 */
export async function sendMessageToNara(
  userMessage: string,
  chatHistory: Message[] = [],
  onChunk?: (chunk: string) => void,
  model?: OpenRouterModel
): Promise<ChatResponse> {
  if (!userMessage.trim()) {
    throw new Error('Message cannot be empty')
  }

  // Use provided model or get from env
  const selectedModel = model || getAIModel()

  // Build conversation context from chat history
  const contextMessages = chatHistory
    .slice(-10) // Keep last 10 messages for context (to avoid token limits)
    .map((msg) => ({
      role: msg.role as 'user' | 'assistant' | 'system',
      content: msg.content,
    }))

  // Get system prompt from env or use default
  const systemPrompt = {
    role: 'system' as const,
    content: getSystemPrompt(),
  }

  // Combine system prompt, context, and new message
  const messages = [
    systemPrompt,
    ...contextMessages,
    {
      role: 'user' as const,
      content: userMessage,
    },
  ]

  try {
    const enableStreaming = !!onChunk

    const { response, tokensUsed } = await callOpenRouterChat(
      messages,
      selectedModel,
      enableStreaming,
      onChunk
    )

    const creditsUsed = calculateCredits(tokensUsed, selectedModel)

    return {
      response,
      creditsUsed,
      tokensUsed,
    }
  } catch (error) {
    if (error instanceof Error) {
      // Re-throw with more context
      throw new Error(`Failed to send message to Nara: ${error.message}`)
    }
    throw new Error('Unknown error occurred while chatting with Nara')
  }
}

/**
 * Analyze user's emotion/intent from message
 * Can be used to adjust Nara's response tone
 */
export function analyzeUserEmotion(message: string): {
  emotion: 'frustrated' | 'curious' | 'excited' | 'confused' | 'neutral'
  confidence: number
} {
  const lowercased = message.toLowerCase()

  // Simple keyword-based emotion detection
  const frustrationKeywords = ['stuck', 'help', "don't understand", 'confused', "can't", 'difficult']
  const excitementKeywords = ['amazing', 'cool', 'awesome', 'love', 'great', '!']
  const curiosityKeywords = ['how', 'why', 'what', 'when', 'where', '?']
  const confusionKeywords = ['huh', 'what', 'unclear', "don't get", 'confused']

  const scores = {
    frustrated: frustrationKeywords.filter((kw) => lowercased.includes(kw)).length,
    excited: excitementKeywords.filter((kw) => lowercased.includes(kw)).length,
    curious: curiosityKeywords.filter((kw) => lowercased.includes(kw)).length,
    confused: confusionKeywords.filter((kw) => lowercased.includes(kw)).length,
  }

  const maxScore = Math.max(...Object.values(scores))

  if (maxScore === 0) {
    return { emotion: 'neutral', confidence: 1.0 }
  }

  const emotion = Object.entries(scores).find(
    ([_, score]) => score === maxScore
  )?.[0] as 'frustrated' | 'curious' | 'excited' | 'confused'

  return {
    emotion: emotion || 'neutral',
    confidence: Math.min(maxScore / 3, 1.0), // Normalize confidence
  }
}

/**
 * Generate conversation starters for Nara
 */
export function getConversationStarters(): string[] {
  return [
    "Hi! I'm Nara, your learning buddy. What would you like to learn today?",
    "Hey there! 👋 Ready to explore something new?",
    "Welcome! I'm excited to help you learn. What's on your mind?",
    "Hi! Let's make learning fun today. What are you curious about?",
    "Hello! I'm here to support your learning journey. How can I help?",
  ]
}

/**
 * Get a random conversation starter
 */
export function getRandomStarter(): string {
  const starters = getConversationStarters()
  return starters[Math.floor(Math.random() * starters.length)]
}
