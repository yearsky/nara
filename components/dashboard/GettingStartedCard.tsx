"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Trophy,
  Target,
  CheckCircle,
} from "lucide-react";

interface GettingStartedCardProps {
  onDismiss?: () => void;
}

export default function GettingStartedCard({
  onDismiss,
}: GettingStartedCardProps) {
  const router = useRouter();

  const steps = [
    {
      id: 1,
      title: "Pilih modul pertama",
      description: "Mulai dengan Aksara Nusantara untuk pemula",
      icon: BookOpen,
      action: () => router.push("/learn/aksara"),
      completed: false,
    },
    {
      id: 2,
      title: "Selesaikan lesson pertama",
      description: "Pelajari dasar-dasar dan dapatkan 50 XP",
      icon: Target,
      action: () => router.push("/learn/aksara/lesson/1"),
      completed: false,
    },
    {
      id: 3,
      title: "Ikuti quiz",
      description: "Uji pemahamanmu dan raih badge pertama",
      icon: Trophy,
      action: () => router.push("/learn/aksara/quiz"),
      completed: false,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-6 md:p-8 text-white shadow-2xl mb-6 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Mulai Perjalananmu!</h3>
              <p className="text-blue-100 text-sm">
                Ikuti langkah-langkah berikut untuk memulai
              </p>
            </div>
          </div>
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="text-blue-100 hover:text-white transition-colors text-sm font-semibold"
            >
              Tutup
            </button>
          )}
        </div>

        {/* Steps */}
        <div className="space-y-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.button
                key={step.id}
                onClick={step.action}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="w-full bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 rounded-2xl p-4 transition-all text-left group"
              >
                <div className="flex items-center gap-4">
                  {/* Step Number */}
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold flex-shrink-0">
                    {step.completed ? (
                      <CheckCircle className="w-5 h-5 fill-current" />
                    ) : (
                      step.id
                    )}
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-lg mb-1">{step.title}</h4>
                    <p className="text-sm text-blue-100">{step.description}</p>
                  </div>

                  {/* Arrow */}
                  <div className="flex-shrink-0 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 pt-6 border-t border-white/20"
        >
          <div className="flex items-center justify-between">
            <div className="text-sm text-blue-100">
              <p className="font-semibold">💡 Tips untuk pemula:</p>
              <p>Belajar minimal 10 menit setiap hari untuk hasil terbaik!</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
