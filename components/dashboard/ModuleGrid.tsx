"use client";

import { PenTool, BookOpen, Music, MapPin, ChefHat, Grid3x3, LucideIcon } from "lucide-react";
import ModuleCard from "./ModuleCard";

interface Module {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  gradientFrom: string;
  gradientTo: string;
  href: string;
  progress: number;
  isNew: boolean;
  isLocked: boolean;
  newContentCount?: number;
}

const modules: Module[] = [
  {
    id: "aksara",
    title: "Aksara Nusantara",
    subtitle: "Pelajari 8+ aksara tradisional",
    icon: PenTool,
    gradientFrom: "#3B82F6",
    gradientTo: "#1D4ED8",
    href: "/learn/aksara",
    progress: 37,
    isNew: false,
    isLocked: true,
  },
  {
    id: "verse",
    title: "Nara Verse",
    subtitle: "1000+ cerita & sastra rakyat",
    icon: BookOpen,
    gradientFrom: "#8B5CF6",
    gradientTo: "#6D28D9",
    href: "/learn/verse",
    progress: 12,
    isNew: true,
    isLocked: false,
    newContentCount: 5,
  },
  {
    id: "symphony",
    title: "Nara Symphony",
    subtitle: "Musik & lagu tradisional",
    icon: Music,
    gradientFrom: "#EC4899",
    gradientTo: "#BE185D",
    href: "/learn/symphony",
    progress: 0,
    isNew: false,
    isLocked: true,
  },
  {
    id: "map",
    title: "Nara Map",
    subtitle: "Jelajahi museum & heritage",
    icon: MapPin,
    gradientFrom: "#10B981",
    gradientTo: "#059669",
    href: "/learn/map",
    progress: 0,
    isNew: true,
    isLocked: false,
    newContentCount: 3,
  },
  {
    id: "loka",
    title: "Nara Loka",
    subtitle: "Kuliner & resep nusantara",
    icon: ChefHat,
    gradientFrom: "#F59E0B",
    gradientTo: "#D97706",
    href: "/learn/loka",
    progress: 0,
    isNew: false,
    isLocked: true, // Locked until complete Aksara basics
  },
  {
    id: "pola",
    title: "Nara Pola",
    subtitle: "Desain & motif tradisional",
    icon: Grid3x3,
    gradientFrom: "#14B8A6",
    gradientTo: "#0D9488",
    href: "/learn/pola",
    progress: 0,
    isNew: false,
    isLocked: true,
  },
];

export default function ModuleGrid() {
  return (
    <div className="px-4 md:px-6 lg:px-8 mb-12">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-xl md:text-2xl font-semibold text-stone-900 mb-4">
          Modul Pembelajaran
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {modules.map((module) => (
            <ModuleCard key={module.id} {...module} />
          ))}
        </div>
      </div>
    </div>
  );
}
