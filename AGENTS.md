# NARA.AI FRONTEND DEVELOPMENT AGENT

> **Context:** Senior frontend developer membangun **Nara.ai** - platform pembelajaran budaya Indonesia dengan AI cultural companion untuk kompetisi Budaya GO! 2025.

---

## 🎯 PROJECT OVERVIEW

**Mission:** "Duolingo untuk Budaya Indonesia" - pembelajaran aksara tradisional yang engaging untuk Gen Z (8-25 tahun).

**Core Features:**
- Multiple aksara (Jawa, Sunda, Bali, Batak, dll) dalam satu platform
- AI companion "Nara" dengan Live2D avatar
- Curriculum-aligned untuk Muatan Lokal sekolah
- Distribution: Kemendikbud (15.236 sekolah) & BRI Desa BRILiaN (4.909 desa)

**Business Model:** B2B institutional (70%), B2C freemium (20%), content licensing (10%)

---

## 🛠️ TECH STACK

**Core:**
- Next.js 14+ (App Router, Server Components, Server Actions)
- React 18+ dengan TypeScript strict mode
- Tailwind CSS 3+ (custom design system)

**Animation:**
- Framer Motion (transitions, gestures)
- GSAP (complex sequences)
- Lottie (vector animations)
- React Spring (physics-based)

**Live2D:**
- Live2D Cubism SDK (pixi-live2d-display)
- PixiJS 7+ (WebGL renderer)
- Howler.js (audio + lip sync)

**State & Data:**
- Zustand (app state)
- TanStack Query (server state)
- Jotai (atomic state)
- Supabase (PostgreSQL, Auth, Realtime)
- OpenRouter API (Nara AI conversations)

---

## 📐 DESIGN PRINCIPLES

### 1. Mobile-First (99% users smartphone)
- Touch targets min 44x44px
- Bottom navigation (thumb zone)
- Swipe gestures untuk navigation
- One-thumb operation

**Breakpoints:** sm(640) → md(768) → lg(1024) → xl(1280) → 2xl(1536)

### 2. Cultural Color Palettes
```js
// Tailwind custom colors per aksara
nusantara: {
  jawa: { primary: '#8B4513', secondary: '#D4AF37', accent: '#2C5F2D' },
  sunda: { primary: '#2C5F2D', secondary: '#97BC62', accent: '#F4A460' },
  bali: { primary: '#FFD700', secondary: '#DC143C', accent: '#000080' },
  batak: { primary: '#000080', secondary: '#FF6347', accent: '#FFFFFF' }
}
```

### 3. Typography
- Body: Inter, system-ui
- Heading: Poppins
- Aksara: Noto Sans [Javanese/Sundanese/Balinese/Batak]

### 4. Accessibility (WCAG 2.1 AA)
- Keyboard navigation support
- ARIA labels untuk aksara characters
- Color contrast >4.5:1
- Screen reader friendly
- Skip navigation links

### 5. Performance Targets
- LCP <2.5s, FID <100ms, CLS <0.1
- Initial JS bundle <150KB gzipped
- Live2D model <500KB
- Aksara fonts <50KB (subset only)
- Offline-capable dengan Service Workers

---

## 🎨 COMPONENT ARCHITECTURE

```
components/
├── aksara/
│   ├── AksaraCard.tsx          # Flashcard component
│   ├── AksaraKeyboard.tsx      # Virtual keyboard
│   ├── AksaraReader.tsx        # Text reader + transliteration
│   └── AksaraWriter.tsx        # Handwriting practice
├── nara/
│   ├── NaraAvatar.tsx          # Live2D integration
│   ├── NaraChatBox.tsx         # Chat interface
│   ├── NaraEmotionState.tsx    # Emotion management
│   └── NaraVoicePlayer.tsx     # TTS + lip sync
├── learning/
│   ├── LessonCard.tsx
│   ├── ProgressTracker.tsx
│   ├── QuizComponent.tsx
│   └── StreakDisplay.tsx
├── content/
│   ├── StoryReader.tsx         # Cerita rakyat
│   ├── MusicPlayer.tsx         # Traditional music
│   ├── RecipeCard.tsx          # Kuliner heritage
│   └── PatternGallery.tsx      # Traditional patterns
├── institutional/
│   ├── TeacherDashboard.tsx
│   ├── StudentProgress.tsx
│   └── SchoolAnalytics.tsx
└── ui/
    ├── Button.tsx
    ├── Card.tsx
    ├── Modal.tsx
    └── Navigation.tsx
```

---

## 🤖 NARA AVATAR - KEY IMPLEMENTATION

### Setup Requirements
```bash
npm install pixi.js pixi-live2d-display howler zustand
```

### Core Integration Points

**1. NaraAvatar Component:**
- Initialize PixiJS Application dengan responsive canvas
- Load Live2D model dari `/models/nara/nara.model3.json`
- Center & scale model untuk fit canvas
- Enable hit detection untuk tap interactions
- Implement idle motion loop
- Handle cleanup on unmount

**2. Emotion State Management (Zustand):**
```typescript
// Emotion states: neutral, happy, curious, encouraging, thinking
// Manage isSpeaking state untuk lip sync
// reactToUserProgress() method untuk contextual emotions
```

**3. Lip Sync Implementation:**
- Modulate `ParamMouthOpenY` parameter saat isSpeaking = true
- Random values 0.2-1.0 every 100ms untuk natural movement
- Reset to 0 when silent

**4. Voice Integration:**
- Backend TTS endpoint (`/api/tts`) menggunakan Piper
- Howler.js untuk audio playback
- Sync isSpeaking state dengan audio duration
- Cleanup audio URLs setelah playback

---

## 🎮 AKSARA LEARNING - KEY COMPONENTS

### 1. AksaraCard (Flashcard)
**Props:** character (Unicode), transliteration, pronunciation, example, onComplete

**Features:**
- 3D flip animation (Framer Motion)
- Front: Large aksara display
- Back: Transliteration, pronunciation (IPA), example word
- Action buttons: "Perlu Latihan" / "Sudah Paham!"
- Success animation on answer
- Accessibility: proper ARIA labels untuk screen readers

### 2. ProgressTracker
**Props:** currentStreak, totalLessonsCompleted, currentLevel, xpPoints, nextLevelXP

**Features:**
- Streak display dengan fire icon animation
- XP progress bar dengan smooth fill animation
- Level indicator
- Motivational messages based on progress percentage
- Gamification elements

---

## 💬 NARA CHAT INTERFACE

### NaraChatBox Component
**Props:** context, userCredits, onCreditWarning

**Core Features:**
- Message history management
- Real-time typing indicators
- Credit system integration
- Voice playback per message
- Auto-scroll to bottom
- Emotion state sync dengan avatar

**API Integration:**
```typescript
// POST /api/nara/chat
// Body: { messages: [], context: string }
// Response: { message: string, creditsUsed: number }
```

**Credit Warning:**
- Visual warning at ≤3 credits
- Disable input at 0 credits
- Trigger onCreditWarning callback

---

## 🎬 ANIMATION PATTERNS

### Page Transitions
```typescript
// app/template.tsx
// Initial: opacity 0, y: 20
// Animate: opacity 1, y: 0
// Duration: 0.3s, ease: easeInOut
```

### Microinteractions
- **Buttons:** whileHover scale 1.05, whileTap scale 0.95
- **Success:** scale 0→1 dengan spring animation
- **Loading:** 360° rotation, linear infinite

### Stagger Animations
- Lists: staggerChildren 0.1s delay
- Individual items: opacity 0→1, x: -20→0

---

## 📱 RESPONSIVE PATTERNS

### Bottom Navigation (Mobile)
- Fixed bottom position
- 4-5 main nav items
- Active state dengan underline/background
- Icon + label layout
- Safe area padding untuk notch devices

### Adaptive Layouts
- Mobile: Single column, full-width cards
- Tablet: 2-column grid
- Desktop: 3-column grid dengan sidebar
- Conditional rendering berdasarkan breakpoint

---

## 🔧 CRITICAL IMPLEMENTATION NOTES

### Performance Optimizations
1. **Code Splitting:**
   - Dynamic imports untuk Live2D
   - Route-based splitting
   - Component lazy loading

2. **Image Optimization:**
   - Next.js Image component dengan priority
   - WebP/AVIF format dengan fallback
   - Responsive srcset

3. **Font Optimization:**
   - Subset Unicode ranges untuk aksara fonts
   - Preload critical fonts
   - font-display: swap

### Offline Strategy
```typescript
// Service Worker cache strategies:
// - Static assets: Cache-first
// - User progress: Network-first
// - Cultural content: Stale-while-revalidate
```

### Accessibility Checklist
- [ ] Keyboard navigation (Tab, Enter, Esc)
- [ ] ARIA labels untuk aksara characters
- [ ] Focus indicators visible
- [ ] Skip to main content link
- [ ] Alt text dengan cultural context
- [ ] Color contrast validation
- [ ] Screen reader testing

---

## 📋 DEVELOPMENT WORKFLOW

### Component Creation Pattern
1. Create component file dengan TypeScript interface
2. Implement responsive mobile-first layout
3. Add Framer Motion animations
4. Integrate state management (Zustand/Jotai)
5. Add accessibility attributes
6. Test on mobile viewport
7. Optimize bundle size

### Testing Priorities
- Mobile responsiveness (375px-428px)
- Touch interactions
- Offline functionality
- Performance metrics (Lighthouse)
- Aksara font rendering
- Live2D performance on low-end devices

---

## 🎯 KEY SUCCESS CRITERIA

1. **User Experience:**
   - Smooth 60fps animations
   - <2s page load time
   - Intuitive navigation flow
   - Engaging gamification

2. **Cultural Authenticity:**
   - Accurate aksara rendering
   - Appropriate color schemes per region
   - Respectful cultural content

3. **Technical Excellence:**
   - Clean component architecture
   - Type-safe implementation
   - Optimized performance
   - Accessible for all users

4. **Scalability:**
   - Easy to add new aksara scripts
   - Modular component system
   - Efficient state management
   - API-ready architecture

---

## 💡 BEST PRACTICES

- **Component Reusability:** Build generic, composable components
- **Performance First:** Measure before optimizing, use React Profiler
- **Mobile Testing:** Test on actual devices, not just devtools
- **Cultural Sensitivity:** Consult with cultural experts for accuracy
- **Progressive Enhancement:** Core functionality works without JS
- **Error Boundaries:** Graceful degradation for component failures

---

**Remember:** Kita bukan cuma bikin app, tapi ngebangun jembatan antara generasi muda dengan warisan budaya Indonesia. Setiap detail matters! 🇮🇩✨