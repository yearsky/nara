"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect } from "react";
import { Nara3DAvatarAnimated } from "./Nara3DAvatarAnimated";
import { Nara3DLoader } from "./Nara3DLoader";
import { NaraVideoAvatar } from "./NaraVideoAvatar";
import { detectWebGLSupport } from "@/lib/webglDetection";

interface Nara3DCanvasProps {
  className?: string;
}

/**
 * Circular 3D Canvas for dashboard
 * With WebGL fallback to video
 */
export function Nara3DCanvas({ className }: Nara3DCanvasProps) {
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setHasWebGL(detectWebGLSupport());
  }, []);

  // Loading state during SSR/mount
  if (!mounted || hasWebGL === null) {
    return (
      <div className={`relative ${className} flex items-center justify-center bg-gradient-to-br from-[#FFD4BA] to-[#FFB88C]`}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8B4513]" />
      </div>
    );
  }

  // Fallback to video if WebGL not supported
  if (hasWebGL === false) {
    return (
      <div className={`relative ${className}`}>
        <NaraVideoAvatar className="w-full h-full" />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Canvas
        className="w-full h-full"
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
        shadows
      >
        <Suspense fallback={<Nara3DLoader variant="circular" />}>
          <Nara3DAvatarAnimated fullScreen={false} />
        </Suspense>
      </Canvas>
    </div>
  );
}
