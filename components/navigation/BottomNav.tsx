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
    badge: 3, // Optional: unread message count
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

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 shadow-lg z-50 safe-area-inset-bottom"
      aria-label="Main Navigation"
    >
      <div className="max-w-screen-xl mx-auto">
        <ul className="flex items-center justify-around h-20">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <li key={item.id} className="flex-1">
                <Link
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1 py-2 px-1 transition-colors",
                    "hover:bg-stone-50 rounded-lg",
                    isActive ? "text-brand-primary" : "text-stone-600"
                  )}
                >
                  {/* Icon with Badge */}
                  <div className="relative">
                    <Icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
                    {item.badge && item.badge > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-orange-500 text-white text-[10px] font-semibold rounded-full flex items-center justify-center px-1">
                        {item.badge > 9 ? "9+" : item.badge}
                      </span>
                    )}
                  </div>

                  {/* Label */}
                  <span
                    className={cn(
                      "text-xs text-center leading-tight",
                      isActive ? "font-semibold" : "font-medium"
                    )}
                  >
                    {item.label}
                  </span>

                  {/* Active Indicator Dot */}
                  {isActive && (
                    <div className="w-1 h-1 bg-brand-primary rounded-full mt-0.5" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
