import { useState, useCallback } from 'react'
import { useVoiceChatStore, type Message } from '@/stores/voiceChatStore'
import { useCreditStore } from '@/stores/creditStore'
import { useNaraEmotionStore } from '@/stores/naraEmotionStore'
import { sendMessageToNara, type AdditionalContext } from '@/services/chatService'
import { transcribeAudio } from '@/services/transcriptionService'

/**
 * Main orchestrator hook for Nara voice chat
 * Handles the complete flow: voice → transcription → chat → response
 */
export function useNaraChat() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [streamingResponse, setStreamingResponse] = useState('')

  // Zustand stores
  const { messages, addMessage, updateMessage, clearMessages } = useVoiceChatStore()
  const { credits, useCredit, hasCredits, isLowCredits } = useCreditStore()
  const { setEmotion, setIsSpeaking } = useNaraEmotionStore()

  /**
   * Get Nara's response without adding user message (for when user message already exists)
   */
  const getNaraResponse = useCallback(
    async (text: string): Promise<void> => {
      if (!text.trim()) {
        setError('Message cannot be empty')
        return
      }

      // Check credits
      if (!hasCredits()) {
        setError('Insufficient credits. Please add more credits to continue.')
        return
      }

      setIsLoading(true)
      setError(null)
      setStreamingResponse('')

      // Create placeholder message ID
      const placeholderMessageId = `assistant-${Date.now()}`

      try {
        // Set Nara to thinking state
        setEmotion('thinking')

        // Add placeholder "thinking" message
        const placeholderMessage: Message = {
          id: placeholderMessageId,
          role: 'assistant',
          content: '...', // Placeholder content
          timestamp: Date.now(),
        }
        addMessage(placeholderMessage)

        // Send message to Nara (without streaming for now)
        const { response, creditsUsed } = await sendMessageToNara(
          text,
          messages
        )

        // Deduct credits
        const success = useCredit(creditsUsed)
        if (!success) {
          setError('Insufficient credits for this request')
          return
        }

        // Artificial delay to show typing indicator (1.5 seconds)
        // This makes the interaction feel more natural
        await new Promise(resolve => setTimeout(resolve, 1500))

        // Update placeholder message with actual response
        updateMessage(placeholderMessageId, response)

        // Set Nara to happy state after response
        setEmotion('happy')
        setIsSpeaking(true)

        // Reset speaking state after a delay (simulate speaking time)
        setTimeout(() => {
          setIsSpeaking(false)
          setEmotion('neutral')
        }, response.length * 50) // Rough estimate: 50ms per character

        // Show low credit warning
        if (isLowCredits()) {
          console.warn('Low credits! Only', credits - creditsUsed, 'credits remaining')
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to send message'
        setError(errorMessage)
        setEmotion('neutral')
      } finally {
        setIsLoading(false)
        setStreamingResponse('')
      }
    },
    [
      messages,
      hasCredits,
      useCredit,
      addMessage,
      updateMessage,
      setEmotion,
      setIsSpeaking,
      isLowCredits,
      credits,
    ]
  )

  /**
   * Handle sending a text message to Nara
   */
  const handleSendMessage = useCallback(
    async (text: string, additionalContext?: AdditionalContext): Promise<void> => {
      if (!text.trim()) {
        setError('Message cannot be empty')
        return
      }

      // Check credits
      if (!hasCredits()) {
        setError('Insufficient credits. Please add more credits to continue.')
        return
      }

      setIsLoading(true)
      setError(null)
      setStreamingResponse('')

      // Create placeholder message ID
      const placeholderMessageId = `assistant-${Date.now()}`

      try {
        // Add user message to chat history
        const userMessage: Message = {
          id: `user-${Date.now()}`,
          role: 'user',
          content: text,
          timestamp: Date.now(),
        }
        addMessage(userMessage)

        // Set Nara to thinking state
        setEmotion('thinking')

        // Add placeholder "thinking" message
        const placeholderMessage: Message = {
          id: placeholderMessageId,
          role: 'assistant',
          content: '...', // Placeholder content
          timestamp: Date.now(),
        }
        addMessage(placeholderMessage)

        // Send message to Nara (without streaming for now)
        const { response, creditsUsed } = await sendMessageToNara(
          text,
          messages,
          undefined, // onChunk
          undefined, // model
          additionalContext // pass additional context
        )

        // Deduct credits
        const success = useCredit(creditsUsed)
        if (!success) {
          setError('Insufficient credits for this request')
          return
        }

        // Artificial delay to show typing indicator (1.5 seconds)
        // This makes the interaction feel more natural
        await new Promise(resolve => setTimeout(resolve, 1500))

        // Update placeholder message with actual response
        updateMessage(placeholderMessageId, response)

        // Set Nara to happy state after response
        setEmotion('happy')
        setIsSpeaking(true)

        // Reset speaking state after a delay (simulate speaking time)
        setTimeout(() => {
          setIsSpeaking(false)
          setEmotion('neutral')
        }, response.length * 50) // Rough estimate: 50ms per character

        // Show low credit warning
        if (isLowCredits()) {
          console.warn('Low credits! Only', credits - creditsUsed, 'credits remaining')
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to send message'
        setError(errorMessage)
        setEmotion('neutral')
      } finally {
        setIsLoading(false)
        setStreamingResponse('')
      }
    },
    [
      messages,
      hasCredits,
      useCredit,
      addMessage,
      updateMessage,
      setEmotion,
      setIsSpeaking,
      isLowCredits,
      credits,
    ]
  )

  /**
   * Handle voice recording and transcription
   * Flow: Audio Blob → Whisper API → Text → Send to Nara
   */
  const handleVoiceRecord = useCallback(
    async (audioBlob: Blob): Promise<void> => {
      if (!audioBlob || audioBlob.size === 0) {
        setError('Invalid audio recording')
        return
      }

      // Check credits (voice uses more credits due to transcription)
      if (!hasCredits()) {
        setError('Insufficient credits. Please add more credits to continue.')
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        // Set Nara to thinking state
        setEmotion('thinking')

        // Step 1: Transcribe audio to text
        const { text: transcribedText } = await transcribeAudio(audioBlob)

        if (!transcribedText.trim()) {
          setError('Could not transcribe audio. Please try again.')
          setEmotion('neutral')
          setIsLoading(false)
          return
        }

        // Step 2: Send transcribed text to Nara
        await handleSendMessage(transcribedText)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to process voice recording'
        setError(errorMessage)
        setEmotion('neutral')
        setIsLoading(false)
      }
    },
    [hasCredits, handleSendMessage, setEmotion]
  )

  /**
   * Clear chat history
   */
  const clearChat = useCallback(() => {
    clearMessages()
    setError(null)
    setStreamingResponse('')
    setEmotion('neutral')
  }, [clearMessages, setEmotion])

  return {
    // State
    messages,
    isLoading,
    error,
    streamingResponse,
    credits,
    isLowCredits: isLowCredits(),

    // Actions
    handleSendMessage,
    getNaraResponse, // Get response without adding user message
    handleVoiceRecord,
    clearChat,
  }
}
