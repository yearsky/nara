'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Search, Trash2, MessageCircle } from 'lucide-react'
import { useChatHistoryStore, type Conversation } from '@/stores/chatHistoryStore'
import { useState, memo, useMemo, useEffect } from 'react'

interface ChatHistorySidebarProps {
  isOpen: boolean
  onClose: () => void
}

/**
 * Chat History Sidebar Component
 * Sliding sidebar showing all chat history (including disposed messages)
 */
export default function ChatHistorySidebar({
  isOpen,
  onClose,
}: ChatHistorySidebarProps) {
  const {
    searchQuery,
    setSearchQuery,
    clearHistory,
    conversations,
    generateConversations,
    getConversationSummaries,
    setCurrentConversation,
    disposedMessages,
  } = useChatHistoryStore()
  const [showClearConfirm, setShowClearConfirm] = useState(false)

  // Generate conversations when disposed messages change
  useEffect(() => {
    generateConversations()
  }, [disposedMessages.length, generateConversations])

  // Get filtered conversations
  const filteredConversations = useMemo(
    () => getConversationSummaries(),
    [conversations, searchQuery, getConversationSummaries]
  )

  const handleClearHistory = () => {
    clearHistory()
    setShowClearConfirm(false)
    onClose()
  }

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80]"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed right-0 top-0 bottom-0 w-[85%] max-w-md bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 z-[90] shadow-2xl"
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
          <div>
            <h2 className="text-white font-bold text-lg">Riwayat Chat</h2>
            <p className="text-white/60 text-xs">
              {conversations.length} percakapan
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </motion.button>
        </div>

        {/* Search Bar */}
        <div className="px-4 py-3 border-b border-white/10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari pesan..."
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-full text-white placeholder-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Conversation List - Optimized for smooth scrolling */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ willChange: 'scroll-position', contain: 'layout style paint' }}>
          {filteredConversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-white/40 py-12">
              <MessageCircle className="w-12 h-12 mb-3 opacity-40" />
              <p className="text-sm">Tidak ada percakapan</p>
            </div>
          ) : (
            filteredConversations.map((conversation) => (
              <ConversationSummaryItem
                key={conversation.id}
                conversation={conversation}
                onClick={() => {
                  setCurrentConversation(conversation.id)
                  onClose()
                }}
              />
            ))
          )}
        </div>

        {/* Footer: Clear History */}
        {disposedMessages.length > 0 && (
          <div className="px-4 py-3 border-t border-white/10">
            {!showClearConfirm ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowClearConfirm(true)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 rounded-lg text-red-400 text-sm font-medium transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Hapus Semua Riwayat
              </motion.button>
            ) : (
              <div className="space-y-2">
                <p className="text-white/80 text-xs text-center">
                  Yakin ingin menghapus semua riwayat?
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowClearConfirm(false)}
                    className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm font-medium transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleClearHistory}
                    className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white text-sm font-medium transition-colors"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </>
  )
}

/**
 * Conversation Summary Item Component
 * Shows summary with click to view full conversation
 */
const ConversationSummaryItem = memo(function ConversationSummaryItem({
  conversation,
  onClick,
}: {
  conversation: Conversation
  onClick: () => void
}) {
  const time = useMemo(
    () =>
      new Date(conversation.lastMessageTime).toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    [conversation.lastMessageTime]
  )

  const date = useMemo(() => {
    const msgDate = new Date(conversation.lastMessageTime)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    msgDate.setHours(0, 0, 0, 0)

    if (msgDate.getTime() === today.getTime()) return 'Hari ini'
    if (msgDate.getTime() === yesterday.getTime()) return 'Kemarin'
    return msgDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
  }, [conversation.lastMessageTime])

  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full text-left px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 transition-colors"
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="flex-shrink-0 mt-0.5">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-white font-medium text-sm leading-snug mb-1 truncate">
            {conversation.summary}
          </p>
          <p className="text-white/50 text-xs">
            {conversation.messages.length} pesan • {date} • {time}
          </p>
        </div>
      </div>
    </motion.button>
  )
})
