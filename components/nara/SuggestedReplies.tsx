"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface SuggestedRepliesProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
  isVisible?: boolean;
}

/**
 * Suggested Replies Component
 * Shows quick reply buttons after Nara's response to reduce user typing effort
 */
export default function SuggestedReplies({
  suggestions,
  onSelect,
  isVisible = true,
}: SuggestedRepliesProps) {
  if (!isVisible || suggestions.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="flex flex-wrap gap-2 px-4 py-2"
    >
      {suggestions.map((suggestion, index) => (
        <motion.button
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(suggestion)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                     bg-white/80 backdrop-blur-sm border border-orange-200
                     hover:bg-orange-50 hover:border-orange-300
                     text-sm font-medium text-gray-700 hover:text-orange-600
                     transition-all shadow-sm hover:shadow-md"
        >
          <Sparkles className="w-3 h-3" />
          {suggestion}
        </motion.button>
      ))}
    </motion.div>
  );
}
