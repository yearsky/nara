"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect } from "react";
import { Nara3DAvatarAnimated } from "./Nara3DAvatarAnimated";
import { Nara3DLoader } from "./Nara3DLoader";
import { NaraVideoAvatar } from "./NaraVideoAvatar";
import { detectWebGLSupport } from "@/lib/webglDetection";

/**
 * Full-screen 3D Canvas for video call/chat screen
 * With WebGL fallback to video
 */
export function Nara3DCanvasFullScreen() {
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setHasWebGL(detectWebGLSupport());
  }, []);

  // Show nothing during SSR
  if (!mounted) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFD4BA] to-[#FFB88C] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Fallback to video if WebGL not supported
  if (hasWebGL === false) {
    return (
      <div className="absolute inset-0 bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/WhatsApp Video 2025-11-18 at 17.47.34.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/40" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-yellow-200 via-yellow-100 to-orange-100">
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
        <Suspense fallback={<Nara3DLoader variant="fullscreen" />}>
          <Nara3DAvatarAnimated fullScreen={true} />
        </Suspense>
      </Canvas>
    </div>
  );
}
