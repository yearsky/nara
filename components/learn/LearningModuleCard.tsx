"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  PenTool,
  BookOpen,
  Music,
  MapPin,
  ChefHat,
  Grid3x3,
  Clock,
  BookMarked,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Module {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  difficulty: string;
  icon: string;
  gradientFrom: string;
  gradientTo: string;
  href: string;
  progress: number;
  isNew: boolean;
  isLocked: boolean;
  newContentCount?: number;
  estimatedTime: string;
  lessons: number;
  completedLessons: number;
}

interface LearningModuleCardProps {
  module: Module;
  index: number;
}

const iconMap: { [key: string]: any } = {
  PenTool,
  BookOpen,
  Music,
  MapPin,
  ChefHat,
  Grid3x3,
};

const difficultyColors = {
  pemula: "bg-green-100 text-green-700 border-green-200",
  menengah: "bg-yellow-100 text-yellow-700 border-yellow-200",
  lanjutan: "bg-red-100 text-red-700 border-red-200",
};

export default function LearningModuleCard({
  module,
  index,
}: LearningModuleCardProps) {
  const Icon = iconMap[module.icon] || BookOpen;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={module.href}>
        <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
          {/* Gradient Header */}
          <div
            className="relative h-32 p-5 flex items-start justify-between"
            style={{
              backgroundImage: `linear-gradient(to bottom right, ${module.gradientFrom}, ${module.gradientTo})`,
            }}
          >
            {/* Icon */}
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Icon className="w-7 h-7 text-white drop-shadow-lg" />
            </div>

            {/* New Badge */}
            {module.isNew && (
              <div className="flex items-center gap-1.5 bg-white/90 px-2 py-1 rounded-full">
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
                <span className="text-xs font-semibold text-stone-900">
                  Baru
                </span>
                {module.newContentCount && (
                  <span className="text-xs text-stone-600">
                    +{module.newContentCount}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5 space-y-4">
            {/* Title and Category */}
            <div>
              <h3 className="text-lg font-bold text-stone-900 mb-1 group-hover:text-brand-primary transition-colors">
                {module.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">{module.subtitle}</p>
              <p className="text-xs text-gray-500 line-clamp-2">
                {module.description}
              </p>
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Difficulty Badge */}
              <span
                className={cn(
                  "text-xs font-semibold px-2 py-1 rounded-full border",
                  difficultyColors[
                    module.difficulty as keyof typeof difficultyColors
                  ]
                )}
              >
                {module.difficulty.charAt(0).toUpperCase() +
                  module.difficulty.slice(1)}
              </span>

              {/* Category Badge */}
              <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                {module.category}
              </span>
            </div>

            {/* Lessons and Time */}
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <BookMarked className="w-4 h-4" />
                <span>
                  {module.completedLessons}/{module.lessons} pelajaran
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{module.estimatedTime}</span>
              </div>
            </div>

            {/* Progress Bar */}
            {module.progress > 0 && (
              <div>
                <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                  <span>Progress</span>
                  <span className="font-semibold">{module.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${module.progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{
                      backgroundImage: `linear-gradient(to right, ${module.gradientFrom}, ${module.gradientTo})`,
                    }}
                  />
                </div>
              </div>
            )}

            {/* CTA */}
            {module.progress === 0 ? (
              <button className="w-full bg-gradient-to-r from-brand-primary to-brand-accent text-white py-2.5 rounded-full font-semibold hover:shadow-lg transition-all">
                Mulai Belajar
              </button>
            ) : module.progress === 100 ? (
              <button className="w-full bg-green-500 text-white py-2.5 rounded-full font-semibold hover:shadow-lg transition-all">
                ✓ Selesai • Ulangi
              </button>
            ) : (
              <button className="w-full bg-gradient-to-r from-brand-primary to-brand-accent text-white py-2.5 rounded-full font-semibold hover:shadow-lg transition-all">
                Lanjutkan Belajar
              </button>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
