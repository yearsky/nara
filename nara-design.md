# Nara.ai Dashboard - Technical Specification for Implementation

## Project Context

**Nara.ai** adalah platform pembelajaran budaya Indonesia berbasis AI dengan fokus pada pelestarian aksara nusantara, storytelling budaya, musik tradisional, dan warisan kuliner. Platform ini menargetkan Gen Z Indonesia (8-25 tahun) dan diaspora Indonesia global, dengan model bisnis B2B2C melalui kemitraan institusional (Kemendikbud, BRI Desa BRILiaN).

**Tech Stack:**
- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- Live2D Cubism SDK (untuk karakter Nara)
- Zustand (state management)
- TanStack Query (data fetching)
- Framer Motion (animations)

---

## Design Philosophy

**Warm Cultural Aesthetic:**
- Warna hangat (terracotta, amber, peach) sebagai identitas brand
- Typography modern tapi approachable (Plus Jakarta Sans)
- Gradien untuk setiap modul budaya dengan warna berbeda
- Spacing generous untuk breathing room
- Shadow subtle untuk depth tanpa overwhelming

**Gamification Elements:**
- Streak counter dengan fire emoji
- XP points dan level system
- Progress bars untuk setiap modul
- Badges dan achievements (fase development selanjutnya)
- Daily challenges

---

## Page Layout Overview

```
┌─────────────────────────────────────────────────────────┐
│ Header: Greeting + Notification Bell + Profile Avatar  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│              Nara Character (Live2D)                    │
│         [Live2D Canvas dalam Circle Frame]              │
│        "Mau belajar apa hari ini?" (Speech)            │
│           [Voice Button - Microphone Icon]              │
│                                                         │
├─────────────────────────────────────────────────────────┤
│         Progress Card: Streak + XP + Level             │
│  🔥 Streak 7 hari! | Level 12 - 450 XP (progress bar) │
├─────────────────────────────────────────────────────────┤
│    Quick Access Bar (horizontal scroll chips)          │
│  [Lanjutkan] [Aksara Hari Ini] [Populer] [Challenge]  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   Main Navigation Grid (6 modules - 2x3 mobile)        │
│                                                         │
│   ┌────────────┬────────────┬────────────┐            │
│   │   Aksara   │   Verse    │  Symphony  │            │
│   │  Nusantara │ (Stories)  │  (Music)   │            │
│   │   (Blue)   │  (Purple)  │   (Pink)   │            │
│   ├────────────┼────────────┼────────────┤            │
│   │    Map     │    Loka    │    Pola    │            │
│   │ (Museums)  │  (Food)    │  (Batik)   │            │
│   │  (Green)   │  (Orange)  │   (Teal)   │            │
│   └────────────┴────────────┴────────────┘            │
│                                                         │
├─────────────────────────────────────────────────────────┤
│          Bottom Navigation (Fixed)                      │
│ [Beranda] [Belajar] [Nara AI] [Komunitas] [Profil]    │
└─────────────────────────────────────────────────────────┘
```

---

## Design Tokens

### Color System

```typescript
// tailwind.config.ts - extend theme with these colors

colors: {
  brand: {
    primary: '#C2410C',      // Terracotta
    light: '#EA580C',        // Lighter terracotta
    dark: '#9A3412',         // Darker terracotta
    accent: '#F59E0B',       // Amber
  },
  
  // Module-specific colors (for gradients)
  module: {
    aksara: {
      from: '#3B82F6',       // Blue-500
      to: '#1D4ED8',         // Blue-700
    },
    verse: {
      from: '#8B5CF6',       // Purple-500
      to: '#6D28D9',         // Purple-700
    },
    symphony: {
      from: '#EC4899',       // Pink-500
      to: '#BE185D',         // Pink-700
    },
    map: {
      from: '#10B981',       // Green-500
      to: '#059669',         // Green-700
    },
    loka: {
      from: '#F59E0B',       // Amber-500
      to: '#D97706',         // Amber-700
    },
    pola: {
      from: '#14B8A6',       // Teal-500
      to: '#0D9488',         // Teal-700
    },
  },
  
  background: {
    main: '#FFF8F3',         // Warm white
    card: '#FFFFFF',
  },
  
  character: {
    bg: {
      start: '#FFD4BA',      // Peach
      end: '#FFB88C',        // Light orange
    },
  },
}
```

### Typography Scale

```typescript
// Font family
fontFamily: {
  sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
}

// Font sizes - already in Tailwind, just document usage
text-xs:     12px   // Nav labels, small UI text
text-sm:     14px   // Body text, subtitles
text-base:   16px   // Default body, button text
text-lg:     18px   // Card titles
text-xl:     20px   // Section headers
text-2xl:    24px   // Page greeting
text-3xl:    30px   // Large emphasis

// Font weights
font-normal:    400
font-medium:    500
font-semibold:  600
font-bold:      700
```

### Spacing System

```typescript
// Use Tailwind default spacing, but document semantic usage

Padding/Margin Scale:
2  = 8px   // Tight spacing
3  = 12px  // Small spacing
4  = 16px  // Default spacing
5  = 20px  // Medium spacing
6  = 24px  // Large spacing
8  = 32px  // Extra large spacing
12 = 48px  // Section gaps

Container Padding:
Mobile:   px-4  (16px)
Tablet:   px-6  (24px)
Desktop:  px-8  (32px)

Section Gaps:
Small:   gap-4   (16px)
Medium:  gap-6   (24px)
Large:   gap-12  (48px)
```

### Border Radius

```typescript
rounded-lg:   12px  // Default cards
rounded-xl:   16px  // Module cards, larger elements
rounded-full: 9999px // Buttons, chips, avatar
```

### Shadows

```typescript
shadow-sm:   0 1px 2px rgba(0,0,0,0.05)    // Subtle elevation
shadow-md:   0 4px 6px rgba(0,0,0,0.07)    // Cards
shadow-lg:   0 10px 15px rgba(0,0,0,0.1)   // Elevated elements
shadow-xl:   0 20px 25px rgba(0,0,0,0.15)  // Modals

// Custom shadows for specific use
character-shadow: 0 8px 16px rgba(0,0,0,0.1)
card-hover:       0 10px 20px rgba(0,0,0,0.12)
```

---

## Component Specifications

### 1. Header Component

**Path:** `components/dashboard/Header.tsx`

**Requirements:**
- Display personalized greeting dengan nama user
- Show subtitle motivational text
- Notification bell dengan badge count (orange)
- Profile avatar (40px circle) yang clickable
- Responsive: hide subtitle pada mobile sangat kecil

**Structure:**
```tsx
<header className="px-4 md:px-6 lg:px-8 py-5 bg-white/80 backdrop-blur-sm">
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
      <button className="relative p-2 hover:bg-stone-100 rounded-lg transition-colors">
        <Bell className="w-6 h-6 text-stone-700" />
        {notificationCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-xs font-semibold rounded-full flex items-center justify-center">
            {notificationCount > 9 ? '9+' : notificationCount}
          </span>
        )}
      </button>
      
      {/* Profile Avatar */}
      <button className="w-10 h-10 rounded-full overflow-hidden border-2 border-stone-200 hover:border-brand-primary transition-colors">
        <img src={userAvatar} alt="Profile" className="w-full h-full object-cover" />
      </button>
    </div>
  </div>
</header>
```

**Props Interface:**
```typescript
interface HeaderProps {
  userName: string
  userAvatar: string
  notificationCount: number
  onNotificationClick: () => void
  onProfileClick: () => void
}
```

**Interaction:**
- Notification bell: onClick → open notification dropdown/modal
- Avatar: onClick → navigate to profile page
- Badge animation: pulse ketika ada notifikasi baru

---

### 2. Nara Character Component

**Path:** `components/dashboard/NaraCharacter.tsx`

**Requirements:**
- Display Live2D character dalam circular frame
- Gradient background (peach to orange)
- Speech bubble (conditional) dengan text
- Voice/microphone button (bottom right)
- Loading state (skeleton) saat character loading
- Error fallback (static image) jika Live2D gagal load

**Structure:**
```tsx
<section className="flex justify-center my-8 md:my-12">
  <div className="relative">
    {/* Character Circle Container */}
    <div className="w-60 h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden shadow-character bg-gradient-to-br from-[#FFD4BA] to-[#FFB88C]">
      {/* Live2D Canvas or Fallback */}
      {isLive2DLoaded ? (
        <Live2DCanvas 
          modelPath="/models/nara.model3.json"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          {hasError ? (
            <img src="/images/nara-fallback.png" alt="Nara" className="w-3/4" />
          ) : (
            <div className="animate-pulse text-stone-400">Loading Nara...</div>
          )}
        </div>
      )}
    </div>
    
    {/* Speech Bubble (Conditional) */}
    {showSpeech && (
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white px-6 py-3 rounded-full shadow-lg whitespace-nowrap">
        <p className="text-sm font-medium text-stone-700">
          {speechText || "Mau belajar apa hari ini?"}
        </p>
      </div>
    )}
    
    {/* Voice Button */}
    <button 
      onClick={onVoiceClick}
      className="absolute bottom-4 right-4 w-12 h-12 bg-brand-primary rounded-full shadow-lg hover:bg-brand-dark transition-colors flex items-center justify-center group"
      aria-label="Aktifkan voice assistant"
    >
      <Mic className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
      {isListening && (
        <span className="absolute inset-0 rounded-full bg-brand-primary animate-ping opacity-75" />
      )}
    </button>
  </div>
</section>
```

**Props Interface:**
```typescript
interface NaraCharacterProps {
  showSpeech?: boolean
  speechText?: string
  onVoiceClick: () => void
  isListening?: boolean
}
```

**Animation States:**
- **Idle:** Breathing animation (subtle scale pulse)
- **Hover:** Character looks at cursor (mouse tracking)
- **Talking:** Lip sync + speech bubble visible
- **Listening:** Pulsing microphone button

**Live2D Integration Notes:**
```typescript
// Untuk implementasi Live2D, gunakan library:
// npm install pixi-live2d-display pixi.js

// Basic setup dalam Live2DCanvas component:
import { Live2DModel } from 'pixi-live2d-display'

const model = await Live2DModel.from('/models/nara.model3.json')
model.motion('idle') // Start idle animation
model.on('tap', () => model.motion('greeting')) // Interaction
```

**Fallback Strategy:**
1. Priority 1: Full Live2D dengan animations
2. Priority 2: Static rendered image dengan CSS animations (scale, rotate)
3. Priority 3: Simple avatar placeholder

---

### 3. Progress Card Component

**Path:** `components/dashboard/ProgressCard.tsx`

**Requirements:**
- Display daily streak dengan fire emoji
- Show current XP points dan level
- Progress bar untuk XP menuju level berikutnya
- Compact design tapi informative
- Clickable untuk open detailed progress modal (future)

**Structure:**
```tsx
<div className="max-w-md mx-auto px-4 mb-6">
  {/* Main Card */}
  <div className="bg-white rounded-xl shadow-md p-4">
    <div className="flex items-center justify-between mb-3">
      {/* Streak Section */}
      <div className="flex items-center gap-3">
        <span className="text-3xl">🔥</span>
        <div>
          <p className="text-sm font-semibold text-stone-900">
            Streak {streakDays} hari!
          </p>
          <p className="text-xs text-stone-600">Pertahankan!</p>
        </div>
      </div>
      
      {/* XP Section */}
      <div className="text-right">
        <p className="text-lg font-bold text-brand-primary">{xpPoints} XP</p>
        <p className="text-xs text-stone-600">Level {userLevel}</p>
      </div>
    </div>
    
    {/* Progress Bar */}
    <div className="relative">
      <div className="bg-stone-200 rounded-full h-2 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-green-500 to-emerald-500 h-full transition-all duration-500 ease-out"
          style={{ width: `${xpProgress}%` }}
        />
      </div>
      <p className="text-xs text-stone-500 mt-1 text-right">
        {xpToNextLevel} XP ke Level {userLevel + 1}
      </p>
    </div>
  </div>
</div>
```

**Props Interface:**
```typescript
interface ProgressCardProps {
  streakDays: number
  xpPoints: number
  userLevel: number
  xpProgress: number        // 0-100 percentage
  xpToNextLevel: number     // Remaining XP needed
}
```

**Calculation Logic:**
```typescript
// XP calculation example
const XP_PER_LEVEL = 1000
const currentLevelXP = xpPoints % XP_PER_LEVEL
const xpForNextLevel = XP_PER_LEVEL
const xpProgress = (currentLevelXP / xpForNextLevel) * 100
const xpToNextLevel = xpForNextLevel - currentLevelXP
```

**Animation:**
- Progress bar animates saat ada penambahan XP
- Confetti effect ketika level up (gunakan canvas-confetti library)
- Streak number counts up animation saat increment

---

### 4. Quick Access Bar Component

**Path:** `components/dashboard/QuickAccessBar.tsx`

**Requirements:**
- Horizontal scrollable chips
- Snap scrolling untuk UX lebih baik
- Active state highlighting
- Hide scrollbar tapi tetap scrollable
- Items: "Lanjutkan Belajar", "Aksara Hari Ini", "Cerita Populer", "Challenge"

**Structure:**
```tsx
<div className="px-4 mb-6 overflow-hidden">
  <div className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
    {quickAccessItems.map((item) => {
      const isActive = activeId === item.id
      const Icon = item.icon
      
      return (
        <button
          key={item.id}
          onClick={() => onItemClick(item.id)}
          className={cn(
            "flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full shadow-sm transition-all snap-start",
            isActive 
              ? "bg-brand-primary text-white font-semibold" 
              : "bg-white text-stone-700 hover:bg-stone-50"
          )}
        >
          {Icon && <Icon className="w-4 h-4" />}
          <span className="text-sm whitespace-nowrap">{item.label}</span>
        </button>
      )
    })}
  </div>
</div>
```

**Data Structure:**
```typescript
interface QuickAccessItem {
  id: string
  label: string
  icon?: React.ComponentType<{ className?: string }>
  action: 'continue' | 'daily' | 'popular' | 'challenge'
}

const quickAccessItems: QuickAccessItem[] = [
  { 
    id: 'continue', 
    label: 'Lanjutkan Belajar', 
    icon: PlayCircle,
    action: 'continue' 
  },
  { 
    id: 'daily', 
    label: 'Aksara Hari Ini', 
    icon: Calendar,
    action: 'daily' 
  },
  { 
    id: 'popular', 
    label: 'Cerita Populer', 
    icon: TrendingUp,
    action: 'popular' 
  },
  { 
    id: 'challenge', 
    label: 'Challenge', 
    icon: Trophy,
    action: 'challenge' 
  },
]
```

**CSS untuk Hide Scrollbar:**
```css
/* globals.css atau tailwind config */
@layer utilities {
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
}
```

**Interaction:**
- Click item → trigger action (navigate atau filter)
- Active item stays highlighted
- Smooth scroll animation

---

### 5. Module Grid Component

**Path:** `components/dashboard/ModuleGrid.tsx`

**Requirements:**
- Grid layout: 2 columns (mobile), 2-3 columns (tablet), 3 columns (desktop)
- Equal height cards
- Proper spacing dengan gap
- Map melalui modules data array

**Structure:**
```tsx
<div className="px-4 md:px-6 lg:px-8 mb-12">
  <div className="max-w-screen-xl mx-auto grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
    {modules.map((module) => (
      <ModuleCard key={module.id} {...module} />
    ))}
  </div>
</div>
```

**Modules Data:**
```typescript
interface Module {
  id: string
  title: string
  subtitle: string
  icon: React.ComponentType<{ className?: string }>
  gradientFrom: string
  gradientTo: string
  href: string
  progress: number      // 0-100
  isNew: boolean
  isLocked: boolean
  newContentCount?: number
}

const modules: Module[] = [
  {
    id: 'aksara',
    title: 'Aksara Nusantara',
    subtitle: 'Pelajari 8+ aksara tradisional',
    icon: PenTool,  // atau custom SVG icon
    gradientFrom: '#3B82F6',
    gradientTo: '#1D4ED8',
    href: '/aksara',
    progress: 37,
    isNew: false,
    isLocked: false,
  },
  {
    id: 'verse',
    title: 'Nara Verse',
    subtitle: '1000+ cerita & sastra rakyat',
    icon: BookOpen,
    gradientFrom: '#8B5CF6',
    gradientTo: '#6D28D9',
    href: '/verse',
    progress: 12,
    isNew: true,
    isLocked: false,
    newContentCount: 5,
  },
  {
    id: 'symphony',
    title: 'Nara Symphony',
    subtitle: 'Musik & lagu tradisional',
    icon: Music,
    gradientFrom: '#EC4899',
    gradientTo: '#BE185D',
    href: '/symphony',
    progress: 0,
    isNew: false,
    isLocked: false,
  },
  {
    id: 'map',
    title: 'Nara Map',
    subtitle: 'Jelajahi museum & heritage',
    icon: MapPin,
    gradientFrom: '#10B981',
    gradientTo: '#059669',
    href: '/map',
    progress: 0,
    isNew: true,
    isLocked: false,
    newContentCount: 3,
  },
  {
    id: 'loka',
    title: 'Nara Loka',
    subtitle: 'Kuliner & resep nusantara',
    icon: ChefHat,
    gradientFrom: '#F59E0B',
    gradientTo: '#D97706',
    href: '/loka',
    progress: 0,
    isNew: false,
    isLocked: true,  // Locked until complete Aksara basics
  },
  {
    id: 'pola',
    title: 'Nara Pola',
    subtitle: 'Desain & motif tradisional',
    icon: Grid3x3,
    gradientFrom: '#14B8A6',
    gradientTo: '#0D9488',
    href: '/pola',
    progress: 0,
    isNew: false,
    isLocked: false,
  },
]
```

---

### 6. Module Card Component

**Path:** `components/dashboard/ModuleCard.tsx`

**Requirements:**
- Gradient background sesuai module color
- Icon besar di atas
- Title + subtitle text
- Progress bar jika sudah dimulai (progress > 0)
- "New" badge jika isNew = true
- Locked state dengan blur + lock icon
- Hover animation: scale up + shadow increase
- Click → navigate ke module page

**Structure:**
```tsx
'use client'

import Link from 'next/link'
import { Lock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ModuleCardProps {
  id: string
  title: string
  subtitle: string
  icon: React.ComponentType<{ className?: string }>
  gradientFrom: string
  gradientTo: string
  href: string
  progress: number
  isNew: boolean
  isLocked: boolean
  newContentCount?: number
}

export default function ModuleCard({
  id,
  title,
  subtitle,
  icon: Icon,
  gradientFrom,
  gradientTo,
  href,
  progress,
  isNew,
  isLocked,
  newContentCount,
}: ModuleCardProps) {
  const CardWrapper = isLocked ? 'div' : Link
  
  return (
    <CardWrapper 
      href={isLocked ? undefined : href}
      className="block"
    >
      <div
        className={cn(
          "relative h-40 md:h-48 rounded-xl p-5 shadow-md transition-all duration-300",
          "bg-gradient-to-br",
          !isLocked && "hover:scale-105 hover:shadow-xl cursor-pointer",
          isLocked && "opacity-60 cursor-not-allowed"
        )}
        style={{
          backgroundImage: `linear-gradient(to bottom right, ${gradientFrom}, ${gradientTo})`
        }}
      >
        {/* New Badge */}
        {isNew && !isLocked && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/90 px-2 py-1 rounded-full">
            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-xs font-semibold text-stone-900">Baru</span>
            {newContentCount && (
              <span className="text-xs text-stone-600">+{newContentCount}</span>
            )}
          </div>
        )}
        
        {/* Lock Overlay */}
        {isLocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-xl backdrop-blur-[2px]">
            <div className="text-center">
              <Lock className="w-8 h-8 text-white/90 mx-auto mb-2" />
              <p className="text-xs text-white/90 font-medium">Terkunci</p>
            </div>
          </div>
        )}
        
        {/* Content */}
        <div className={cn(
          "h-full flex flex-col",
          isLocked && "filter blur-[1px]"
        )}>
          {/* Icon */}
          <div className="mb-3 group-hover:scale-110 transition-transform">
            <Icon className="w-10 h-10 md:w-12 md:h-12 text-white drop-shadow-lg" />
          </div>
          
          {/* Text Content */}
          <div className="mt-auto">
            <h3 className="text-base md:text-lg font-semibold text-white mb-1 drop-shadow-md">
              {title}
            </h3>
            <p className="text-xs md:text-sm text-white/95 line-clamp-1 drop-shadow-sm">
              {subtitle}
            </p>
          </div>
          
          {/* Progress Bar */}
          {progress > 0 && !isLocked && (
            <div className="mt-3 bg-white/30 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-white h-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      </div>
    </CardWrapper>
  )
}
```

**Interaction Details:**
- **Hover:** Card scales to 105%, shadow increases
- **Active/Touch:** Brief scale to 98% (press effect)
- **Locked state:** No hover effect, shows tooltip on hover "Selesaikan Aksara Dasar untuk membuka"
- **Click unlocked:** Navigate dengan smooth transition

---

### 7. Bottom Navigation Component

**Path:** `components/navigation/BottomNav.tsx`

**Requirements:**
- Fixed position di bottom
- 5 navigation items equal width
- Icon + label vertical stack
- Active state: primary color + bold text + indicator dot
- Badge pada Nara AI untuk unread messages
- Smooth navigation dengan Next.js Link

**Structure:**
```tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, BookOpen, MessageCircle, Users, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  {
    id: 'home',
    label: 'Beranda',
    icon: Home,
    href: '/dashboard',
  },
  {
    id: 'learn',
    label: 'Belajar',
    icon: BookOpen,
    href: '/learn',
  },
  {
    id: 'nara',
    label: 'Nara AI',
    icon: MessageCircle,
    href: '/chat',
    badge: 3,  // Optional: unread message count
  },
  {
    id: 'community',
    label: 'Komunitas',
    icon: Users,
    href: '/community',
  },
  {
    id: 'profile',
    label: 'Profil',
    icon: User,
    href: '/profile',
  },
]

export default function BottomNav() {
  const pathname = usePathname()
  
  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 shadow-lg z-50 safe-area-inset-bottom"
      aria-label="Main Navigation"
    >
      <div className="max-w-screen-xl mx-auto">
        <ul className="flex items-center justify-around h-20">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <li key={item.id} className="flex-1">
                <Link 
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1 py-2 px-1 transition-colors",
                    "hover:bg-stone-50 rounded-lg",
                    isActive 
                      ? "text-brand-primary" 
                      : "text-stone-600"
                  )}
                >
                  {/* Icon with Badge */}
                  <div className="relative">
                    <Icon 
                      className="w-6 h-6" 
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                    {item.badge && item.badge > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-orange-500 text-white text-[10px] font-semibold rounded-full flex items-center justify-center px-1">
                        {item.badge > 9 ? '9+' : item.badge}
                      </span>
                    )}
                  </div>
                  
                  {/* Label */}
                  <span className={cn(
                    "text-xs text-center leading-tight",
                    isActive ? "font-semibold" : "font-medium"
                  )}>
                    {item.label}
                  </span>
                  
                  {/* Active Indicator Dot */}
                  {isActive && (
                    <div className="w-1 h-1 bg-brand-primary rounded-full mt-0.5" />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
```

**CSS for Safe Area (iOS notch):**
```css
/* globals.css */
.safe-area-inset-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}
```

---

## Main Dashboard Page

**Path:** `app/dashboard/page.tsx`

```tsx
import { Suspense } from 'react'
import Header from '@/components/dashboard/Header'
import NaraCharacter from '@/components/dashboard/NaraCharacter'
import ProgressCard from '@/components/dashboard/ProgressCard'
import QuickAccessBar from '@/components/dashboard/QuickAccessBar'
import ModuleGrid from '@/components/dashboard/ModuleGrid'
import BottomNav from '@/components/navigation/BottomNav'
import { CharacterSkeleton, ProgressSkeleton } from '@/components/skeletons'
import { getDashboardData } from '@/lib/api/dashboard'

export default async function DashboardPage() {
  // Fetch data di server component (Next.js 14 App Router)
  const data = await getDashboardData()
  
  return (
    <div className="min-h-screen bg-background-main pb-24">
      {/* Header */}
      <Header 
        userName={data.user.name}
        userAvatar={data.user.avatar}
        notificationCount={data.notificationCount}
        onNotificationClick={() => {/* handle */}}
        onProfileClick={() => {/* handle */}}
      />
      
      {/* Main Content */}
      <main>
        {/* Nara Character with Suspense */}
        <Suspense fallback={<CharacterSkeleton />}>
          <NaraCharacter 
            showSpeech={true}
            speechText="Mau belajar apa hari ini?"
            onVoiceClick={() => {/* navigate to /chat */}}
            isListening={false}
          />
        </Suspense>
        
        {/* Progress Card with Suspense */}
        <Suspense fallback={<ProgressSkeleton />}>
          <ProgressCard 
            streakDays={data.stats.streakDays}
            xpPoints={data.stats.xpPoints}
            userLevel={data.stats.level}
            xpProgress={data.stats.xpProgress}
            xpToNextLevel={data.stats.xpToNextLevel}
          />
        </Suspense>
        
        {/* Quick Access Bar */}
        <QuickAccessBar />
        
        {/* Learning Modules Grid */}
        <ModuleGrid />
      </main>
      
      {/* Fixed Bottom Navigation */}
      <BottomNav />
    </div>
  )
}
```

---

## State Management (Zustand)

**Path:** `store/userStore.ts`

```typescript
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface UserStats {
  streakDays: number
  xpPoints: number
  level: number
  xpProgress: number
  xpToNextLevel: number
  aksaraLearned: number
  storiesRead: number
  songsListened: number
}

interface User {
  id: string
  name: string
  avatar: string
  email: string
}

interface UserState {
  user: User | null
  stats: UserStats
  isLoading: boolean
  error: string | null
  
  // Actions
  setUser: (user: User) => void
  updateStats: (stats: Partial<UserStats>) => void
  incrementStreak: () => void
  addXP: (amount: number) => void
  resetError: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      stats: {
        streakDays: 0,
        xpPoints: 0,
        level: 1,
        xpProgress: 0,
        xpToNextLevel: 1000,
        aksaraLearned: 0,
        storiesRead: 0,
        songsListened: 0,
      },
      isLoading: false,
      error: null,
      
      setUser: (user) => set({ user }),
      
      updateStats: (newStats) => 
        set((state) => ({
          stats: { ...state.stats, ...newStats }
        })),
      
      incrementStreak: () =>
        set((state) => ({
          stats: {
            ...state.stats,
            streakDays: state.stats.streakDays + 1,
          }
        })),
      
      addXP: (amount) =>
        set((state) => {
          const XP_PER_LEVEL = 1000
          const newTotalXP = state.stats.xpPoints + amount
          const newLevel = Math.floor(newTotalXP / XP_PER_LEVEL) + 1
          const currentLevelXP = newTotalXP % XP_PER_LEVEL
          const xpProgress = (currentLevelXP / XP_PER_LEVEL) * 100
          const xpToNextLevel = XP_PER_LEVEL - currentLevelXP
          
          // Trigger level up celebration if level increased
          if (newLevel > state.stats.level) {
            // Show confetti or modal
            console.log('Level Up!', newLevel)
          }
          
          return {
            stats: {
              ...state.stats,
              xpPoints: newTotalXP,
              level: newLevel,
              xpProgress,
              xpToNextLevel,
            }
          }
        }),
      
      resetError: () => set({ error: null }),
    }),
    {
      name: 'nara-user-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
```

---

## API Integration

**Path:** `lib/api/dashboard.ts`

```typescript
interface DashboardResponse {
  user: {
    id: string
    name: string
    avatar: string
    email: string
  }
  stats: {
    streakDays: number
    xpPoints: number
    level: number
    xpProgress: number
    xpToNextLevel: number
    aksaraLearned: number
    storiesRead: number
    songsListened: number
  }
  notificationCount: number
  modules: Array<{
    id: string
    progress: number
    isLocked: boolean
    isNew: boolean
    newContentCount: number
  }>
}

export async function getDashboardData(): Promise<DashboardResponse> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Always fetch fresh data
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch dashboard data')
    }
    
    return response.json()
  } catch (error) {
    console.error('Dashboard API error:', error)
    throw error
  }
}

export async function updateDailyStreak(): Promise<{ success: boolean; newStreak: number }> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/streak`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`,
      'Content-Type': 'application/json',
    },
  })
  
  return response.json()
}

export async function trackModuleClick(moduleId: string): Promise<void> {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/analytics/module-click`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ moduleId, timestamp: new Date().toISOString() }),
  })
}

function getAuthToken(): string {
  // Get from cookie, localStorage, or auth provider
  return typeof window !== 'undefined' 
    ? localStorage.getItem('auth_token') || ''
    : ''
}
```

---

## Responsive Design

### Breakpoints
```typescript
// Tailwind default breakpoints
sm: 640px   // Mobile landscape
md: 768px   // Tablet
lg: 1024px  // Desktop
xl: 1280px  // Large desktop
```

### Responsive Behavior

**Mobile (< 640px):**
- Header: Hide subtitle text
- Character: 240px diameter (w-60 h-60)
- Module Grid: 2 columns with gap-4
- Navigation: Labels stay visible (min-width 360px)
- Quick Access: Horizontal scroll

**Tablet (640px - 1024px):**
- Header: Show subtitle
- Character: 280px diameter (w-72 h-72)
- Module Grid: 2 columns with gap-6
- Larger touch targets

**Desktop (> 1024px):**
- Character: 320px diameter (w-80 h-80)
- Module Grid: 3 columns with gap-6
- Max-width container: 1280px
- Hover effects enabled
- Quick Access: All items visible (no scroll)

---

## Accessibility

### Requirements
1. **Keyboard Navigation:**
   - All interactive elements tabbable
   - Visible focus indicators
   - Logical tab order: Header → Character → Progress → Quick Access → Modules → Bottom Nav

2. **Screen Reader Support:**
   ```tsx
   <button aria-label="Buka modul Aksara Nusantara">
     {/* Visual content */}
   </button>
   
   <nav aria-label="Main Navigation">
     {/* Navigation items */}
   </nav>
   ```

3. **Color Contrast:**
   - Text on white: minimum 4.5:1
   - Text on colored backgrounds: test with WebAIM tool
   - Focus indicators: clearly visible

4. **Touch Targets:**
   - Minimum 44x44px (iOS)
   - Minimum 48x48px (Android)
   - Adequate spacing (8px minimum)

5. **Motion:**
   - Respect `prefers-reduced-motion`
   ```tsx
   className="transition-transform motion-reduce:transition-none"
   ```

---

## Animation Specifications

### Framer Motion Variants

**Page Transition:**
```tsx
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.3 }
  },
}
```

**Module Card Hover:**
```tsx
<motion.div
  whileHover={{ 
    scale: 1.05,
    transition: { type: 'spring', stiffness: 300, damping: 20 }
  }}
  whileTap={{ scale: 0.98 }}
>
  {/* Card content */}
</motion.div>
```

**Streak Increment Animation:**
```tsx
<motion.span
  key={streakDays}
  initial={{ scale: 1.5, color: '#F59E0B' }}
  animate={{ scale: 1, color: '#1C1917' }}
  transition={{ duration: 0.5, ease: 'easeOut' }}
>
  {streakDays}
</motion.span>
```

**Progress Bar Fill:**
```tsx
<motion.div
  initial={{ width: 0 }}
  animate={{ width: `${xpProgress}%` }}
  transition={{ duration: 1, ease: 'easeOut' }}
  className="bg-gradient-to-r from-green-500 to-emerald-500 h-full"
/>
```

---

## Loading States & Skeletons

**Path:** `components/skeletons/index.tsx`

```tsx
export function CharacterSkeleton() {
  return (
    <div className="flex justify-center my-8 md:my-12">
      <div className="w-60 h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full bg-gradient-to-br from-stone-200 to-stone-300 animate-pulse" />
    </div>
  )
}

export function ProgressSkeleton() {
  return (
    <div className="max-w-md mx-auto px-4 mb-6">
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-stone-200 rounded-full animate-pulse" />
            <div className="space-y-2">
              <div className="w-24 h-4 bg-stone-200 rounded animate-pulse" />
              <div className="w-16 h-3 bg-stone-200 rounded animate-pulse" />
            </div>
          </div>
          <div className="text-right space-y-2">
            <div className="w-16 h-5 bg-stone-200 rounded animate-pulse ml-auto" />
            <div className="w-12 h-3 bg-stone-200 rounded animate-pulse ml-auto" />
          </div>
        </div>
        <div className="bg-stone-200 rounded-full h-2 animate-pulse" />
      </div>
    </div>
  )
}

export function ModuleGridSkeleton() {
  return (
    <div className="px-4 md:px-6 lg:px-8 mb-12">
      <div className="max-w-screen-xl mx-auto grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i}
            className="h-40 md:h-48 bg-gradient-to-br from-stone-200 to-stone-300 rounded-xl animate-pulse"
          />
        ))}
      </div>
    </div>
  )
}
```

---

## Error Handling

**Path:** `app/dashboard/error.tsx`

```tsx
'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Dashboard error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-main px-4">
      <div className="max-w-md w-full text-center">
        <AlertCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-stone-900 mb-2">
          Ups! Ada yang tidak beres
        </h2>
        <p className="text-stone-600 mb-6">
          {error.message || 'Terjadi kesalahan saat memuat dashboard. Silakan coba lagi.'}
        </p>
        <Button
          onClick={reset}
          className="bg-brand-primary hover:bg-brand-dark text-white px-6 py-3 rounded-lg"
        >
          Coba Lagi
        </Button>
      </div>
    </div>
  )
}
```

---

## Performance Optimization

### Image Optimization
```tsx
import Image from 'next/image'

<Image
  src={userAvatar}
  alt="Profile"
  width={40}
  height={40}
  className="rounded-full"
  priority={true}  // For above-the-fold images
  quality={85}
/>
```

### Code Splitting
```tsx
// Dynamic import untuk Live2D (heavy component)
const Live2DCanvas = dynamic(
  () => import('@/components/Live2DCanvas'),
  { 
    ssr: false,
    loading: () => <CharacterSkeleton />
  }
)
```

### Prefetching
```tsx
import { useRouter } from 'next/navigation'

const router = useRouter()

<Link
  href="/aksara"
  onMouseEnter={() => router.prefetch('/aksara')}
  onTouchStart={() => router.prefetch('/aksara')}
>
  Aksara Nusantara
</Link>
```

---

## Testing Guidelines

### Unit Tests (Jest + React Testing Library)
```tsx
// __tests__/components/ModuleCard.test.tsx
import { render, screen } from '@testing-library/react'
import ModuleCard from '@/components/dashboard/ModuleCard'

describe('ModuleCard', () => {
  it('renders module title and subtitle', () => {
    render(<ModuleCard {...mockModuleData} />)
    expect(screen.getByText('Aksara Nusantara')).toBeInTheDocument()
  })
  
  it('shows lock icon when isLocked is true', () => {
    render(<ModuleCard {...mockModuleData} isLocked={true} />)
    expect(screen.getByLabelText(/terkunci/i)).toBeInTheDocument()
  })
  
  it('displays progress bar when progress > 0', () => {
    render(<ModuleCard {...mockModuleData} progress={50} />)
    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toHaveStyle({ width: '50%' })
  })
})
```

### Integration Tests
- Test dashboard data fetching
- Test navigation between modules
- Test streak increment functionality

### E2E Tests (Playwright)
```typescript
test('user can navigate to module from dashboard', async ({ page }) => {
  await page.goto('/dashboard')
  await page.click('text=Aksara Nusantara')
  await expect(page).toHaveURL('/aksara')
})
```

---

## File Structure

```
nara-ai/
├── app/
│   ├── dashboard/
│   │   ├── page.tsx              # Main dashboard page
│   │   ├── loading.tsx           # Loading state
│   │   └── error.tsx             # Error boundary
│   ├── aksara/                   # Aksara module pages
│   ├── verse/                    # Verse module pages
