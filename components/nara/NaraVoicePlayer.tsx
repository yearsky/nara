"use client";

import { useEffect, useRef } from "react";
import { Howl } from "howler";
import { useNaraEmotionStore } from "@/stores/naraEmotionStore";

interface NaraVoicePlayerProps {
  audioUrl: string;
  onComplete?: () => void;
}

export const NaraVoicePlayer = ({
  audioUrl,
  onComplete,
}: NaraVoicePlayerProps) => {
  const soundRef = useRef<Howl | null>(null);
  const { setIsSpeaking } = useNaraEmotionStore();

  useEffect(() => {
    if (!audioUrl) return;

    const sound = new Howl({
      src: [audioUrl],
      format: ["mp3", "wav", "ogg"],
      onplay: () => {
        setIsSpeaking(true);
      },
      onend: () => {
        setIsSpeaking(false);
        onComplete?.();
      },
      onstop: () => {
        setIsSpeaking(false);
      },
      onloaderror: () => {
        setIsSpeaking(false);
        console.error("Failed to load audio");
      },
    });

    soundRef.current = sound;
    sound.play();

    return () => {
      sound.stop();
      sound.unload();
      setIsSpeaking(false);
    };
  }, [audioUrl, setIsSpeaking, onComplete]);

  return null;
};

