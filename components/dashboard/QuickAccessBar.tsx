"use client";

import { useState } from "react";
import { PlayCircle, Calendar, TrendingUp, Trophy, MessageCircle, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickAccessItem {
  id: string;
  label: string;
  icon: LucideIcon;
  action: "continue" | "daily" | "popular" | "challenge" | "askNara";
}

const quickAccessItems: QuickAccessItem[] = [
  {
    id: "continue",
    label: "Lanjutkan Belajar",
    icon: PlayCircle,
    action: "continue",
  },
  {
    id: "askNara",
    label: "Tanya Nara",
    icon: MessageCircle,
    action: "askNara",
  },
  {
    id: "daily",
    label: "Aksara Hari Ini",
    icon: Calendar,
    action: "daily",
  },
  {
    id: "popular",
    label: "Cerita Populer",
    icon: TrendingUp,
    action: "popular",
  },
  {
    id: "challenge",
    label: "Challenge",
    icon: Trophy,
    action: "challenge",
  },
];

interface QuickAccessBarProps {
  onItemClick?: (action: string) => void;
}

export default function QuickAccessBar({ onItemClick }: QuickAccessBarProps) {
  const [activeId, setActiveId] = useState<string>("continue");

  const handleClick = (item: QuickAccessItem) => {
    setActiveId(item.id);
    onItemClick?.(item.action);
  };

  return (
    <div className="px-4 mb-6 overflow-hidden">
      <div className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2">
        {quickAccessItems.map((item) => {
          const isActive = activeId === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => handleClick(item)}
              className={cn(
                "flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full shadow-sm transition-all snap-start",
                isActive
                  ? "bg-brand-primary text-white font-semibold"
                  : "bg-white text-stone-700 hover:bg-stone-50"
              )}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm whitespace-nowrap">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
