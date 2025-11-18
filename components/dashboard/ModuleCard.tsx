"use client";

import Link from "next/link";
import { Lock, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModuleCardProps {
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

export default function ModuleCard({
  id,
  title,
  subtitle,
  icon: Icon,
  gradientFrom,
  gradientTo,
  href,
  progress,
  isNew,
  isLocked,
  newContentCount,
}: ModuleCardProps) {
  const cardContent = (
    <div
      className={cn(
        "relative h-40 md:h-48 rounded-xl p-5 shadow-md transition-all duration-300",
        "bg-gradient-to-br",
        !isLocked && "hover:scale-105 hover:shadow-card-hover cursor-pointer",
        isLocked && "opacity-60 cursor-not-allowed"
      )}
      style={{
        backgroundImage: `linear-gradient(to bottom right, ${gradientFrom}, ${gradientTo})`,
      }}
    >
        {/* New Badge */}
        {isNew && !isLocked && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/90 px-2 py-1 rounded-full">
            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-xs font-semibold text-stone-900">Baru</span>
            {newContentCount && (
              <span className="text-xs text-stone-600">+{newContentCount}</span>
            )}
          </div>
        )}

        {/* Lock Overlay */}
        {isLocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-xl backdrop-blur-[2px]">
            <div className="text-center">
              <Lock className="w-8 h-8 text-white/90 mx-auto mb-2" />
              <p className="text-xs text-white/90 font-medium">Terkunci</p>
            </div>
          </div>
        )}

        {/* Content */}
        <div
          className={cn("h-full flex flex-col", isLocked && "filter blur-[1px]")}
        >
          {/* Icon */}
          <div className="mb-3 group-hover:scale-110 transition-transform">
            <Icon className="w-10 h-10 md:w-12 md:h-12 text-white drop-shadow-lg" />
          </div>

          {/* Text Content */}
          <div className="mt-auto">
            <h3 className="text-base md:text-lg font-semibold text-white mb-1 drop-shadow-md">
              {title}
            </h3>
            <p className="text-xs md:text-sm text-white/95 line-clamp-1 drop-shadow-sm">
              {subtitle}
            </p>
          </div>

          {/* Progress Bar */}
          {progress > 0 && !isLocked && (
            <div className="mt-3 bg-white/30 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-white h-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      </div>
  );

  if (isLocked) {
    return <div className="block group">{cardContent}</div>;
  }

  return (
    <Link href={href} className="block group">
      {cardContent}
    </Link>
  );
}
