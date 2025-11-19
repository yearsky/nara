"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, MessageCircle, Users, User, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  href: string;
  badge?: number;
}

const navItems: NavItem[] = [
  {
    id: "home",
    label: "Beranda",
    icon: Home,
    href: "/dashboard",
  },
  {
    id: "learn",
    label: "Belajar",
    icon: BookOpen,
    href: "/learn",
  },
  {
    id: "nara",
    label: "Nara AI",
    icon: MessageCircle,
    href: "/chat",
    badge: 3,
  },
  {
    id: "community",
    label: "Komunitas",
    icon: Users,
    href: "/community",
  },
  {
    id: "profile",
    label: "Profil",
    icon: User,
    href: "/profile",
  },
];

export default function GlassFooter() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none pb-4 px-4">
      <nav
        className="max-w-2xl mx-auto backdrop-blur-xl bg-white/70 rounded-3xl shadow-2xl border border-white/30 pointer-events-auto"
        aria-label="Main Navigation"
      >
        <ul className="flex items-center justify-around px-4 py-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1 py-2 px-3 transition-all rounded-2xl",
                    "hover:bg-white/50",
                    isActive ? "text-brand-primary" : "text-stone-600"
                  )}
                >
                  {/* Icon with Badge */}
                  <div className="relative">
                    <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                    {item.badge && item.badge > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-[16px] bg-gradient-to-br from-orange-500 to-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center px-1 shadow-md">
                        {item.badge > 9 ? "9+" : item.badge}
                      </span>
                    )}
                  </div>

                  {/* Label */}
                  <span
                    className={cn(
                      "text-[10px] text-center leading-tight",
                      isActive ? "font-semibold" : "font-medium"
                    )}
                  >
                    {item.label}
                  </span>

                  {/* Active Indicator */}
                  {isActive && (
                    <div className="w-1 h-1 bg-brand-primary rounded-full animate-pulse" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
