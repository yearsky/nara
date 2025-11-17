"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useNaraEmotionStore } from "@/stores/naraEmotionStore";
import { useCreditStore } from "@/stores/creditStore";
import dynamic from "next/dynamic";

// Dynamic import untuk voice player
const NaraVoicePlayer = dynamic(
  () => import("./NaraVoicePlayer").then((mod) => ({ default: mod.NaraVoicePlayer })),
  { ssr: false }
);

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  audioUrl?: string;
}

interface NaraChatBoxProps {
  context?: string;
  onCreditWarning?: () => void;
}

export const NaraChatBox = ({
  context = "Kamu adalah Nara, AI companion yang membantu belajar budaya Indonesia.",
  onCreditWarning,
}: NaraChatBoxProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentAudioUrl, setCurrentAudioUrl] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { setEmotion } = useNaraEmotionStore();
  const { credits, useCredit, hasCredits, isLowCredits } = useCreditStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isLowCredits() && onCreditWarning) {
      onCreditWarning();
    }
  }, [credits, isLowCredits, onCreditWarning]);

  const handleSend = async () => {
    if (!input.trim() || !hasCredits() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setEmotion("thinking");

    try {
      const response = await fetch("/api/nara/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          context,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      if (!useCredit(data.creditsUsed || 1)) {
        throw new Error("Insufficient credits");
      }

      // Generate TTS
      const ttsResponse = await fetch("/api/tts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: data.message }),
      });

      const ttsData = await ttsResponse.json();
      const audioUrl = ttsData.audioUrl;

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message,
        audioUrl,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setCurrentAudioUrl(audioUrl);
      setEmotion("happy");
    } catch (error) {
      console.error("Chat error:", error);
      setEmotion("neutral");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex flex-col h-full max-h-[600px]">
      <div className="flex-1 overflow-y-auto mb-4 space-y-3">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.role === "user"
                    ? "bg-nusantara.jawa.primary text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-gray-100 rounded-lg px-4 py-2">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                />
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                />
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="Tanya Nara..."
          disabled={!hasCredits() || isLoading}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B4513] disabled:opacity-50"
        />
        <Button
          onClick={handleSend}
          disabled={!hasCredits() || isLoading || !input.trim()}
          size="md"
        >
          Kirim
        </Button>
      </div>

      {isLowCredits() && (
        <div className="mt-2 text-sm text-orange-600">
          Credits tersisa: {credits}
        </div>
      )}

      {currentAudioUrl && (
        <NaraVoicePlayer
          audioUrl={currentAudioUrl}
          onComplete={() => setCurrentAudioUrl(null)}
        />
      )}
    </Card>
  );
};

