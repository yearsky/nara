"use client";

import { motion } from "framer-motion";
import { BookOpen, Music, Utensils, Palette, Languages, Sparkles } from "lucide-react";

interface Topic {
  id: string;
  label: string;
  prompt: string;
  icon: React.ReactNode;
  color: string;
}

interface TopicChipsProps {
  onTopicSelect: (prompt: string) => void;
  isVisible?: boolean;
}

const TOPICS: Topic[] = [
  {
    id: "batik",
    label: "Batik",
    prompt: "Ceritakan tentang Batik Indonesia",
    icon: <Palette className="w-4 h-4" />,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "wayang",
    label: "Wayang",
    prompt: "Apa itu Wayang?",
    icon: <Sparkles className="w-4 h-4" />,
    color: "from-amber-500 to-orange-500",
  },
  {
    id: "musik",
    label: "Musik Tradisional",
    prompt: "Jelaskan tentang musik tradisional Indonesia",
    icon: <Music className="w-4 h-4" />,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "kuliner",
    label: "Kuliner",
    prompt: "Apa makanan tradisional Indonesia yang terkenal?",
    icon: <Utensils className="w-4 h-4" />,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "aksara",
    label: "Aksara Nusantara",
    prompt: "Ceritakan tentang aksara tradisional Indonesia",
    icon: <Languages className="w-4 h-4" />,
    color: "from-rose-500 to-pink-500",
  },
  {
    id: "sastra",
    label: "Sastra",
    prompt: "Apa karya sastra Indonesia yang terkenal?",
    icon: <BookOpen className="w-4 h-4" />,
    color: "from-indigo-500 to-purple-500",
  },
];

/**
 * Topic Chips Component
 * Quick access buttons for popular cultural topics
 */
export default function TopicChips({ onTopicSelect, isVisible = true }: TopicChipsProps) {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="w-full bg-transparent"
    >
      <div className="mb-2 px-4">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Topik Populer
        </p>
      </div>
      <div className="flex overflow-x-auto gap-2 px-4 pb-2 scrollbar-thin scrollbar-thumb-gray-300">
        {TOPICS.map((topic, index) => (
          <motion.button
            key={topic.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onTopicSelect(topic.prompt)}
            className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-full
                       bg-gradient-to-r text-white shadow-lg hover:shadow-xl
                       transition-all font-medium text-sm"
            style={{
              backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))`,
            }}
          >
            <div className={`bg-gradient-to-br ${topic.color} rounded-full p-1`}>
              {topic.icon}
            </div>
            <span className="whitespace-nowrap">{topic.label}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
