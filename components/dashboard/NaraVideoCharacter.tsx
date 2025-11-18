"use client";

import { useState } from "react";
import { Mic } from "lucide-react";
import dynamic from "next/dynamic";
import { CharacterSkeleton } from "@/components/skeletons";

// Dynamic import for Video character
const NaraVideoAvatar = dynamic(
  () => import("@/components/nara/NaraVideoAvatar").then((mod) => ({ default: mod.NaraVideoAvatar })),
  {
    ssr: false,
    loading: () => <CharacterSkeleton />,
  }
);

interface NaraVideoCharacterProps {
  showSpeech?: boolean;
  speechText?: string;
  onVoiceClick: () => void;
  isListening?: boolean;
}

export default function NaraVideoCharacter({
  showSpeech = true,
  speechText = "Mau belajar apa hari ini?",
  onVoiceClick,
  isListening = false,
}: NaraVideoCharacterProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <section className="flex justify-center my-8 md:my-12">
      <div className="relative">
        {/* Character Circle Container */}
        <div className="w-60 h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden shadow-character bg-gradient-to-br from-[#FFD4BA] to-[#FFB88C]">
          {/* Video Character */}
          <NaraVideoAvatar className="w-full h-full" />
        </div>

        {/* Speech Bubble (Conditional) */}
        {showSpeech && (
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white px-6 py-3 rounded-full shadow-lg whitespace-nowrap max-w-[280px] md:max-w-none">
            <p className="text-sm font-medium text-stone-700 truncate">
              {speechText}
            </p>
          </div>
        )}

        {/* Voice Button */}
        <button
          onClick={onVoiceClick}
          className="absolute bottom-4 right-4 w-12 h-12 bg-brand-primary rounded-full shadow-lg hover:bg-brand-dark transition-all flex items-center justify-center group active:scale-95"
          aria-label="Aktifkan voice assistant"
        >
          <Mic className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
          {isListening && (
            <span className="absolute inset-0 rounded-full bg-brand-primary animate-ping opacity-75" />
          )}
        </button>
      </div>
    </section>
  );
}
