"use client";

import { Suspense } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/dashboard/Header";
import NaraCharacter from "@/components/dashboard/NaraCharacter";
import ProgressCard from "@/components/dashboard/ProgressCard";
import QuickAccessBar from "@/components/dashboard/QuickAccessBar";
import ModuleGrid from "@/components/dashboard/ModuleGrid";
import BottomNav from "@/components/navigation/BottomNav";
import {
  CharacterSkeleton,
  ProgressSkeleton,
  ModuleGridSkeleton,
} from "@/components/skeletons";
import { useUserStore } from "@/stores/userStore";

export default function DashboardPage() {
  const router = useRouter();
  const { user, stats } = useUserStore();

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
    // TODO: Handle different actions
    switch (action) {
      case "continue":
        // Navigate to last learning session
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
    <div className="min-h-screen bg-background-main pb-24">
      {/* Header */}
      <Header
        userName={user?.name || "Pengguna"}
        userAvatar={user?.avatar || ""}
        notificationCount={3}
        onNotificationClick={handleNotificationClick}
        onProfileClick={handleProfileClick}
      />

      {/* Main Content */}
      <main>
        {/* Nara Character with Suspense */}
        <Suspense fallback={<CharacterSkeleton />}>
          <NaraCharacter
            showSpeech={true}
            speechText="Mau belajar apa hari ini?"
            onVoiceClick={handleVoiceClick}
            isListening={false}
          />
        </Suspense>

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

      {/* Fixed Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
