"use client";

import { useRef, useEffect, useState } from "react";

interface NaraVideoAvatarProps {
  className?: string;
  videoSrc?: string;
}

export const NaraVideoAvatar = ({
  className,
  videoSrc = "/WhatsApp Video 2025-11-18 at 17.47.34.mp4"
}: NaraVideoAvatarProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setIsLoading(false);
      video.play().catch((err) => {
        console.error("Failed to autoplay video:", err);
        // Autoplay might be blocked, but video will still be available
      });
    };

    const handleError = () => {
      setError("Gagal memuat video avatar");
      setIsLoading(false);
    };

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("error", handleError);

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("error", handleError);
    };
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-red-500 p-4 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#FFD4BA] to-[#FFB88C]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8B4513]" />
        </div>
      )}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        loop
        muted
        playsInline
        autoPlay
        src={videoSrc}
      />
    </div>
  );
};
