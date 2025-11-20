"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Nara3DAvatar } from "./Nara3DAvatar";

interface Nara3DCanvasProps {
  className?: string;
}

function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#FFD4BA] to-[#FFB88C]">
      <div className="flex flex-col items-center gap-3">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8B4513]" />
        <p className="text-xs text-stone-600 font-medium">Memuat Nara...</p>
      </div>
    </div>
  );
}

export function Nara3DCanvas({ className }: Nara3DCanvasProps) {
  return (
    <div className={`relative ${className}`}>
      <Canvas
        className="w-full h-full"
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]} // Responsive pixel ratio for performance
        shadows
      >
        <Suspense fallback={null}>
          <Nara3DAvatar />
        </Suspense>
      </Canvas>

      {/* Loading overlay - will be shown until model loads */}
      <Suspense fallback={<LoadingFallback />}>
        <div style={{ display: "none" }} />
      </Suspense>
    </div>
  );
}
