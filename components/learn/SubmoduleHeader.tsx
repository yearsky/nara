"use client";

import { ArrowLeft, LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface SubmoduleHeaderProps {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  gradientFrom: string;
  gradientTo: string;
  backHref?: string;
  children?: React.ReactNode;
}

export default function SubmoduleHeader({
  title,
  subtitle,
  icon: Icon,
  gradientFrom,
  gradientTo,
  backHref = "/learn",
  children,
}: SubmoduleHeaderProps) {
  const router = useRouter();

  return (
    <header className="sticky top-4 z-40 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Glass morphism container */}
        <div
          className="backdrop-blur-xl bg-white/70 rounded-3xl shadow-xl border border-white/30 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${gradientFrom}15 0%, ${gradientTo}10 100%)`,
          }}
        >
          <div className="p-4 md:p-5">
            {/* Top Row - Back button and Icon */}
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={() => router.push(backHref)}
                className="flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
                  <ArrowLeft className="w-4 h-4" />
                </div>
                <span className="font-medium text-sm hidden sm:inline">
                  Kembali
                </span>
              </button>

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
                }}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Title Section */}
            <div className="text-center mb-3">
              <h1 className="text-2xl md:text-3xl font-bold text-stone-900 mb-1">
                {title}
              </h1>
              {subtitle && (
                <p className="text-sm md:text-base text-stone-600">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Additional Content */}
            {children}
          </div>
        </div>
      </div>
    </header>
  );
}
