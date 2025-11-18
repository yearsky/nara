"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Modal } from "@/components/ui/Modal";
import { useState } from "react";
import { useCreditStore } from "@/stores/creditStore";
import { ArrowRight, LayoutDashboard } from "lucide-react";

// Dynamic imports untuk code splitting
const NaraAvatar = dynamic(() => import("@/components/nara/NaraAvatar").then((mod) => ({ default: mod.NaraAvatar })), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8B4513]" />
    </div>
  ),
});

const NaraChatBox = dynamic(() => import("@/components/nara/NaraChatBox").then((mod) => ({ default: mod.NaraChatBox })), {
  ssr: false,
});

export default function Home() {
  const [showCreditModal, setShowCreditModal] = useState(false);
  const { isLowCredits } = useCreditStore();

  const handleCreditWarning = () => {
    if (isLowCredits()) {
      setShowCreditModal(true);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-[#8B4513] mb-2">
            Nara.ai
          </h1>
          <p className="text-gray-600 mb-4">
            Belajar Budaya Indonesia dengan AI Companion
          </p>

          {/* Dashboard Link */}
          <div className="flex justify-center gap-4 mb-6">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-dark text-white px-6 py-3 rounded-full font-semibold transition-all shadow-md hover:shadow-lg"
            >
              <LayoutDashboard className="w-5 h-5" />
              Dashboard Live2D
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/dashboard-video"
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-semibold transition-all shadow-md hover:shadow-lg"
            >
              <LayoutDashboard className="w-5 h-5" />
              Dashboard Video
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* NARA Avatar Section */}
          <div className="h-[400px] md:h-[500px]">
            <NaraAvatar className="w-full h-full" />
          </div>

          {/* Chat Section */}
          <div className="h-[400px] md:h-[500px]">
            <NaraChatBox onCreditWarning={handleCreditWarning} />
          </div>
        </div>
      </div>

      <Modal
        isOpen={showCreditModal}
        onClose={() => setShowCreditModal(false)}
        title="Credits Hampir Habis"
      >
        <p className="text-gray-700">
          Credits kamu hampir habis. Silakan top up untuk melanjutkan percakapan
          dengan Nara.
        </p>
      </Modal>
    </main>
  );
}

