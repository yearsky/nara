'use client'

import dynamic from 'next/dynamic'

// Dynamically import 3D Canvas (SSR disabled)
const Nara3DCanvasFullScreen = dynamic(
  () => import('./Nara3DCanvasFullScreen').then((mod) => ({ default: mod.Nara3DCanvasFullScreen })),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1410] to-[#2d1810] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <div className="text-white text-sm font-medium">Memuat Nara...</div>
        </div>
      </div>
    ),
  }
)

/**
 * Video Placeholder Component - Now with 3D Character!
 * Uses 3D character model with automatic fallback to video if WebGL not supported
 * Fallback chain: 3D → Video → Animated Gradient
 */
export default function VideoPlaceholder() {
  return <Nara3DCanvasFullScreen />
}
