'use client'

import { motion } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import { useChatHistoryStore, type Conversation } from '@/stores/chatHistoryStore'
import { useMemo } from 'react'

interface ChatBoxViewProps {
  onBack: () => void
}

/**
 * Chat Box View Component
 * Shows a full conversation in chat box format (replaces video call)
 */
export default function ChatBoxView({ onBack }: ChatBoxViewProps) {
  const { conversations, currentConversationId, setCurrentConversation } =
    useChatHistoryStore()

  // Get current conversation
  const currentConversation = useMemo(
    () => conversations.find((conv) => conv.id === currentConversationId),
    [conversations, currentConversationId]
  )

  if (!currentConversation) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black z-50 flex items-center justify-center">
        <div className="text-white/60 text-center">
          <p className="text-sm">Percakapan tidak ditemukan</p>
          <button
            onClick={onBack}
            className="mt-4 px-4 py-2 bg-orange-500 rounded-lg text-white font-medium"
          >
            Kembali
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-black/40 backdrop-blur-md">
        {/* Back Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setCurrentConversation(null)
            onBack()
          }}
          className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
          aria-label="Back"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </motion.button>

        {/* Nara Avatar & Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-sm">N</span>
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Nara</p>
            <p className="text-white/60 text-xs">
              {currentConversation.messages.length} pesan
            </p>
          </div>
        </div>
      </div>

      {/* Conversation Title */}
      <div className="px-4 py-3 bg-orange-500/10 border-b border-orange-500/20">
        <p className="text-orange-300 text-sm font-medium">
          {currentConversation.summary}
        </p>
        <p className="text-white/50 text-xs mt-1">
          {new Date(currentConversation.startTime).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {currentConversation.messages.map((message) => {
          const time = new Date(message.timestamp).toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
          })

          return (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-orange-500/30 border border-orange-500/40'
                    : 'bg-white/10 border border-white/20'
                }`}
              >
                {message.role === 'assistant' && (
                  <p className="text-orange-300 text-xs font-bold mb-1">Nara</p>
                )}
                <p className="text-white text-sm leading-relaxed break-words">
                  {message.content}
                </p>
                <p className="text-white/40 text-xs mt-1">{time}</p>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Footer Info */}
      <div className="px-4 py-3 border-t border-white/10 bg-black/40 backdrop-blur-md">
        <p className="text-white/50 text-xs text-center">
          Anda sedang melihat riwayat percakapan
        </p>
      </div>
    </div>
  )
}
