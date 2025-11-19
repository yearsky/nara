"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { Bell, User, Home, Mic } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import ProgressCard from "@/components/dashboard/ProgressCard";
import QuickAccessBar from "@/components/dashboard/QuickAccessBar";
import ModuleGrid from "@/components/dashboard/ModuleGrid";
import GlassFooter from "@/components/learn/GlassFooter";
import {
  ProgressSkeleton,
  ModuleGridSkeleton,
} from "@/components/skeletons";
import { useUserStore } from "@/stores/userStore";

export default function DashboardPage() {
  const router = useRouter();
  const { user, stats } = useUserStore();
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNotificationClick = () => {
    console.log("Notifications clicked");
    // TODO: Open notification modal/page
  };

  const handleProfileClick = () => {
    router.push("/profile");
  };

  const handleVoiceClick = () => {
    router.push("/chat");
  };

  const handleQuickAccessClick = (action: string) => {
    console.log("Quick access action:", action);

    switch (action) {
      case "continue":
        // Navigate to last learning session
        break;
      case "askNara":
        // Navigate to chat with general context
        router.push("/chat");
        break;
      case "daily":
        // Show daily aksara
        break;
      case "popular":
        // Show popular stories
        break;
      case "challenge":
        // Show daily challenge
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/30 to-amber-50/30 pb-32 pt-6">
      {/* Header - Sticky Glass Morphism */}
      <header className="sticky top-4 z-40 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Glass morphism container */}
          <motion.div
            className="backdrop-blur-xl bg-white/70 rounded-3xl shadow-xl border border-white/30 overflow-hidden"
            animate={{
              height: isScrolled ? "auto" : "auto"
            }}
            transition={{ duration: 0.3 }}
          >
            <div className={cn(
              "transition-all duration-300",
              isScrolled ? "p-3" : "p-4 md:p-5"
            )}>
              {/* Scrolled State - Compact */}
              {isScrolled ? (
                <div className="flex items-center justify-between">
                  {/* Left: Home icon */}
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg bg-gradient-to-br from-orange-500 to-amber-600">
                    <Home className="w-5 h-5 text-white" />
                  </div>

                  {/* Right: Notification + Profile */}
                  <div className="flex items-center gap-2">
                    {/* Notification Button */}
                    <button
                      onClick={handleNotificationClick}
                      className="relative p-2 hover:bg-white/50 rounded-xl transition-colors"
                      aria-label="Notifications"
                    >
                      <Bell className="w-5 h-5 text-stone-700" />
                      {3 > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-orange-500 to-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-md">
                          {3 > 9 ? "9+" : 3}
                        </span>
                      )}
                    </button>

                    {/* Profile Avatar */}
                    <button
                      onClick={handleProfileClick}
                      className="w-8 h-8 rounded-full overflow-hidden border-2 border-white/50 hover:border-orange-400 transition-colors shadow-sm"
                      aria-label="Profile"
                    >
                      {user?.avatar ? (
                        <Image
                          src={user.avatar}
                          alt="Profile"
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white font-semibold text-xs">
                          {(user?.name || "P").charAt(0).toUpperCase()}
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                /* Default State - Full */
                <>
                  {/* Top Row */}
                  <div className="flex items-center justify-between mb-3">
                    {/* Home Icon */}
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg bg-gradient-to-br from-orange-500 to-amber-600">
                      <Home className="w-6 h-6 text-white" />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                      {/* Notification Button */}
                      <button
                        onClick={handleNotificationClick}
                        className="relative p-2 hover:bg-white/50 rounded-xl transition-colors"
                        aria-label="Notifications"
                      >
                        <Bell className="w-6 h-6 text-stone-700" />
                        {3 > 0 && (
                          <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-orange-500 to-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse shadow-md">
                            {3 > 9 ? "9+" : 3}
                          </span>
                        )}
                      </button>

                      {/* Profile Avatar */}
                      <button
                        onClick={handleProfileClick}
                        className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/50 hover:border-orange-400 transition-colors shadow-sm"
                        aria-label="Profile"
                      >
                        {user?.avatar ? (
                          <Image
                            src={user.avatar}
                            alt="Profile"
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white font-semibold">
                            {(user?.name || "P").charAt(0).toUpperCase()}
                          </div>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Welcome Section */}
                  <div className="text-center">
                    <h1 className="text-2xl md:text-3xl font-bold text-stone-900 mb-1">
                      Selamat datang, {user?.name || "Pengguna"}!
                    </h1>
                    <p className="text-sm md:text-base text-stone-600">
                      Ayo jelajahi warisan budaya Indonesia hari ini
                    </p>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-screen-xl mx-auto px-4 py-6">
        {/* Nara Video Character */}
        <section className="flex justify-center my-8 md:my-12">
          <div className="relative">
            {/* Video Container */}
            <div className="w-60 h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden shadow-2xl bg-gradient-to-br from-orange-100 to-amber-100 border-4 border-white/50">
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/WhatsApp Video 2025-11-18 at 17.47.34.mp4" type="video/mp4" />
                {/* Fallback placeholder */}
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-200 to-amber-200">
                  <span className="text-6xl">👋</span>
                </div>
              </video>
            </div>

            {/* Speech Bubble */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 backdrop-blur-xl bg-white/70 px-6 py-3 rounded-full shadow-lg border border-white/30 whitespace-nowrap max-w-[280px] md:max-w-none">
              <p className="text-sm font-medium text-stone-700 truncate">
                Mau belajar apa hari ini?
              </p>
            </div>

            {/* Voice Button */}
            <button
              onClick={handleVoiceClick}
              className="absolute bottom-4 right-4 w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center group active:scale-95"
              aria-label="Aktifkan voice assistant"
            >
              <Mic className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </section>

        {/* Progress Card with Suspense */}
        <Suspense fallback={<ProgressSkeleton />}>
          <ProgressCard
            streakDays={stats.streakDays}
            xpPoints={stats.xpPoints}
            userLevel={stats.level}
            xpProgress={stats.xpProgress}
            xpToNextLevel={stats.xpToNextLevel}
          />
        </Suspense>

        {/* Quick Access Bar */}
        <QuickAccessBar onItemClick={handleQuickAccessClick} />

        {/* Learning Modules Grid */}
        <Suspense fallback={<ModuleGridSkeleton />}>
          <ModuleGrid />
        </Suspense>
      </main>

      {/* Glass Footer */}
      <GlassFooter />
    </div>
  );
}
