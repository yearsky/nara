"use client";

import { useRouter } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NaraContext {
  type: "museum" | "learn" | "general";
  id?: string;
  prompt: string;
  data?: Record<string, any>;
}

interface AskNaraButtonProps {
  context: NaraContext;
  variant?: "default" | "compact" | "icon";
  className?: string;
  children?: React.ReactNode;
}

export default function AskNaraButton({
  context,
  variant = "default",
  className,
  children,
}: AskNaraButtonProps) {
  const router = useRouter();

  const handleAskNara = () => {
    // Store context in localStorage
    localStorage.setItem("naraContext", JSON.stringify(context));

    // Navigate to chat page
    router.push("/chat");
  };

  if (variant === "icon") {
    return (
      <button
        onClick={handleAskNara}
        className={cn(
          "p-2 rounded-full bg-white/90 hover:bg-white shadow-sm hover:shadow-md transition-all",
          "flex items-center justify-center",
          className
        )}
        aria-label="Tanya Nara"
      >
        <MessageCircle className="w-4 h-4 text-orange-600" />
      </button>
    );
  }

  if (variant === "compact") {
    return (
      <button
        onClick={handleAskNara}
        className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-full",
          "bg-gradient-to-r from-orange-500 to-amber-600",
          "text-white text-sm font-semibold",
          "hover:shadow-lg transition-all",
          className
        )}
      >
        <MessageCircle className="w-4 h-4" />
        {children || "Tanya Nara"}
      </button>
    );
  }

  // Default variant
  return (
    <button
      onClick={handleAskNara}
      className={cn(
        "flex items-center justify-center gap-2 px-4 py-2.5 rounded-full",
        "bg-gradient-to-r from-orange-500 to-amber-600",
        "text-white font-semibold",
        "hover:shadow-lg transition-all",
        className
      )}
    >
      <MessageCircle className="w-5 h-5" />
      {children || "Tanya Nara"}
    </button>
  );
}
