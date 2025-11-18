"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import VideoCallLayout from "@/components/nara/VideoCallLayout";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Dedicated Full-Screen Video Call Page
 * Clean route for immersive video chat experience with Nara
 */
export default function ChatPage() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Small delay for smooth mount animation
    const timer = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleEndCall = () => {
    // Navigate back to home or previous page
    router.push("/");
  };

  return (
    <AnimatePresence>
      {isReady && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <VideoCallLayout characterName="Nara" onEndCall={handleEndCall} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
