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
  ArrowRight,
  Play,
} from "lucide-react";

interface Module {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  gradientFrom: string;
  gradientTo: string;
  href: string;
  progress: number;
  completedLessons: number;
  lessons: number;
}

interface ContinueLearningCardProps {
  module: Module;
}

const iconMap: { [key: string]: any } = {
  PenTool,
  BookOpen,
  Music,
  MapPin,
  ChefHat,
  Grid3x3,
};

export default function ContinueLearningCard({
  module,
}: ContinueLearningCardProps) {
  const Icon = iconMap[module.icon] || BookOpen;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={module.href}>
        <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(135deg, ${module.gradientFrom}15, ${module.gradientTo}15)`,
              }}
            />
          </div>

          <div className="relative p-6">
            <div className="flex items-center gap-2 mb-3">
              <Play className="w-5 h-5 text-brand-primary" />
              <span className="text-sm font-semibold text-brand-primary">
                Lanjutkan Belajar
              </span>
            </div>

            <div className="flex items-center gap-4 mb-4">
              {/* Module Icon */}
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md"
                style={{
                  backgroundImage: `linear-gradient(to bottom right, ${module.gradientFrom}, ${module.gradientTo})`,
                }}
              >
                <Icon className="w-8 h-8 text-white" />
              </div>

              {/* Module Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-stone-900 mb-1 group-hover:text-brand-primary transition-colors">
                  {module.title}
                </h3>
                <p className="text-sm text-gray-600">{module.subtitle}</p>
              </div>

              {/* Arrow Icon */}
              <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-brand-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
            </div>

            {/* Progress Info */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  Pelajaran {module.completedLessons} dari {module.lessons}
                </span>
                <span className="font-semibold text-brand-primary">
                  {module.progress}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${module.progress}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                  className="h-full rounded-full shadow-sm"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${module.gradientFrom}, ${module.gradientTo})`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
