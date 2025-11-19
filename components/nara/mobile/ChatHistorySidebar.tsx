'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Search, Trash2 } from 'lucide-react'
import { useChatHistoryStore, type HistoryMessage } from '@/stores/chatHistoryStore'
import { useState, memo, useMemo } from 'react'

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
  const { searchQuery, setSearchQuery, getMessagesByDate, clearHistory, allMessages } =
    useChatHistoryStore()
  const [showClearConfirm, setShowClearConfirm] = useState(false)

  // Memoize expensive computation of grouping messages by date
  const messagesByDate = useMemo(() => getMessagesByDate(), [allMessages, searchQuery])

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
              {allMessages.length} pesan total
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

        {/* Messages List - Optimized for smooth scrolling */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6" style={{ willChange: 'scroll-position', contain: 'layout style paint' }}>
          {Object.keys(messagesByDate).length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-white/40 py-12">
              <p className="text-sm">Tidak ada pesan</p>
            </div>
          ) : (
            Object.entries(messagesByDate).map(([date, messages]) => (
              <div key={date} className="space-y-2">
                {/* Date Header */}
                <div className="sticky top-0 bg-gradient-to-r from-orange-500/20 to-pink-500/20 backdrop-blur-sm px-3 py-1 rounded-full inline-block">
                  <p className="text-white/80 text-xs font-semibold">{date}</p>
                </div>

                {/* Messages */}
                <div className="space-y-2">
                  {messages.map((message) => (
                    <HistoryMessageItem key={message.id} message={message} />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer: Clear History */}
        {allMessages.length > 0 && (
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
 * Individual History Message Component
 * Memoized to prevent unnecessary re-renders for performance
 */
const HistoryMessageItem = memo(function HistoryMessageItem({ message }: { message: HistoryMessage }) {
  const time = useMemo(
    () =>
      new Date(message.timestamp).toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    [message.timestamp]
  )

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-3 py-2 ${
          message.role === 'user'
            ? 'bg-orange-500/30 border border-orange-500/40'
            : 'bg-white/10 border border-white/20'
        } ${message.isDisposed ? 'opacity-60' : 'opacity-100'}`}
      >
        {message.role === 'assistant' && (
          <p className="text-orange-300 text-[10px] font-bold mb-0.5">Nara</p>
        )}
        <p className="text-white text-xs leading-relaxed break-words">
          {message.content}
        </p>
        <p className="text-white/40 text-[10px] mt-1">{time}</p>
      </div>
    </motion.div>
  )
})
