"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterPanelProps {
  categories: string[];
  difficulties: string[];
  progressOptions: { value: string; label: string }[];
  selectedCategory: string;
  selectedDifficulty: string;
  selectedProgress: string;
  onCategoryChange: (category: string) => void;
  onDifficultyChange: (difficulty: string) => void;
  onProgressChange: (progress: string) => void;
  onReset: () => void;
}

export default function FilterPanel({
  categories,
  difficulties,
  progressOptions,
  selectedCategory,
  selectedDifficulty,
  selectedProgress,
  onCategoryChange,
  onDifficultyChange,
  onProgressChange,
  onReset,
}: FilterPanelProps) {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="border-t border-gray-200 bg-white/95 backdrop-blur-sm overflow-hidden"
    >
      <div className="max-w-screen-xl mx-auto px-4 py-4 space-y-4">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Kategori
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  selectedCategory === category
                    ? "bg-brand-primary text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
              >
                {category === "semua"
                  ? "Semua Kategori"
                  : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Tingkat Kesulitan
          </label>
          <div className="flex flex-wrap gap-2">
            {difficulties.map((difficulty) => (
              <button
                key={difficulty}
                onClick={() => onDifficultyChange(difficulty)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  selectedDifficulty === difficulty
                    ? "bg-brand-primary text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
              >
                {difficulty === "semua"
                  ? "Semua Level"
                  : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Progress Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Status Progress
          </label>
          <div className="flex flex-wrap gap-2">
            {progressOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onProgressChange(option.value)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  selectedProgress === option.value
                    ? "bg-brand-primary text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Reset Button */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" />
            Reset Filter
          </button>
        </div>
      </div>
    </motion.div>
  );
}
