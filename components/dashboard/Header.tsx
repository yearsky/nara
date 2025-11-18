"use client";

import { Bell } from "lucide-react";
import Image from "next/image";

interface HeaderProps {
  userName: string;
  userAvatar: string;
  notificationCount: number;
  onNotificationClick: () => void;
  onProfileClick: () => void;
}

export default function Header({
  userName,
  userAvatar,
  notificationCount,
  onNotificationClick,
  onProfileClick,
}: HeaderProps) {
  return (
    <header className="px-4 md:px-6 lg:px-8 py-5 bg-white/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-semibold text-stone-900">
            Selamat datang, {userName}!
          </h1>
          <p className="text-sm md:text-base text-stone-600 mt-1 hidden sm:block">
            Ayo jelajahi warisan budaya Indonesia hari ini
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Notification Button */}
          <button
            onClick={onNotificationClick}
            className="relative p-2 hover:bg-stone-100 rounded-lg transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-6 h-6 text-stone-700" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-xs font-semibold rounded-full flex items-center justify-center animate-pulse">
                {notificationCount > 9 ? "9+" : notificationCount}
              </span>
            )}
          </button>

          {/* Profile Avatar */}
          <button
            onClick={onProfileClick}
            className="w-10 h-10 rounded-full overflow-hidden border-2 border-stone-200 hover:border-brand-primary transition-colors"
            aria-label="Profile"
          >
            {userAvatar ? (
              <Image
                src={userAvatar}
                alt="Profile"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center text-white font-semibold">
                {userName.charAt(0).toUpperCase()}
              </div>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
