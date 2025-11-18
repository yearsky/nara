"use client";

import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import VideoCallLayout from "./VideoCallLayout";

interface FullScreenChatProps {
  isOpen: boolean;
  onClose: () => void;
  avatarType?: "live2d" | "video";
}

/**
 * Full Screen Chat Component
 * Now uses the new full-screen video call interface by default
 * For classic WhatsApp-style layout, use FullScreenChatClassic component
 */
export default function FullScreenChat({
  isOpen,
  onClose,
  avatarType = "video",
}: FullScreenChatProps) {
  // Prevent body scroll when fullscreen chat is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <VideoCallLayout
          characterName="Nara"
          onEndCall={onClose}
        />
      )}
    </AnimatePresence>
  );
}
