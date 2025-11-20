"use client";

import { Html, useProgress } from "@react-three/drei";

interface Nara3DLoaderProps {
  variant?: "circular" | "fullscreen";
}

export function Nara3DLoader({ variant = "circular" }: Nara3DLoaderProps) {
  const { progress } = useProgress();

  if (variant === "fullscreen") {
    return (
      <Html center>
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <div className="text-white text-sm font-medium">
            Memuat Nara... {progress.toFixed(0)}%
          </div>
          <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-orange-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </Html>
    );
  }

  // Circular variant (for dashboard)
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8B4513]" />
        <p className="text-xs text-stone-600 font-medium">
          {progress < 100 ? `${progress.toFixed(0)}%` : "Hampir siap..."}
        </p>
      </div>
    </Html>
  );
}
