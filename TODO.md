# Nara.ai Development TODO List

> **Format**: ~~Strikethrough~~ = Currently being worked on by AI agent
>
> **Branch naming**: `claude/<feature-name>-<session-id>`

---

## 🏠 Homepage Features (User Not Logged In)

### ✅ 1. Homepage Redesign for Non-Authenticated Users <completed in claude/create-user-homepage-01VtBjydZoT5vve4NExjxt6x>
- [x] Create new landing page component for non-authenticated users
- [x] Design hero section with Nara circle avatar (animated pulse effect)
- [x] Add "Try Chat with Nara" CTA button (prominent)
- [x] Implement auth state detection (show different content for logged in vs not logged in)
- [x] Add feature showcase section (Museum, Learning, Community)
- [x] Use modern gradients and animations (2025 design trends)
- [x] Ensure full responsive design (mobile-first)
- [x] Add image placeholders from:
  - https://picsum.photos/ for generic images
  - https://ui-avatars.com/ for avatar placeholders
  - https://placeholder.com/ for specific dimensions

**Components created**:
- ✅ `components/landing/HeroSection.tsx` - Hero with Nara circle
- ✅ `components/landing/FeatureShowcase.tsx` - Feature grid
- ✅ `components/landing/CTASection.tsx` - Call to action
- ✅ `components/landing/TryChatButton.tsx` - Main CTA button
- ✅ `app/page.tsx` - New landing page route (old backed up as page-old.tsx.backup)

---

## 💬 Full Screen Chat Feature (WhatsApp-style Video Call)

### ~~2. Full Screen Chat Interface~~ ✅ <worked in claude/complete-todo-tasks-01ByUpU9fM16GqsEUphoyejR>
- [x] Create full-screen chat modal/page component
- [x] Design layout similar to WhatsApp video call:
  - Large video/avatar area (top 60-65%)
  - Chat input bar (bottom 30-40%)
  - Minimal controls overlay (mute, end call, video toggle)
  - Floating close/minimize button
- [x] Implement smooth transitions (enter/exit animations)
- [x] Add background blur effect when chat is active
- [x] Responsive design for mobile and desktop
- [x] Integrate with existing NaraChatBox component

**Components created**:
- ✅ `components/nara/FullScreenChat.tsx` - Main full-screen wrapper with backdrop
- ✅ `components/nara/ChatControls.tsx` - Overlay controls (mute, end call, video)
- ✅ `components/nara/ChatVideoArea.tsx` - Video/avatar display area with animations
- ✅ Updated `app/page.tsx` - Added fullscreen chat trigger button

---

## 🎙️ Audio Recording Integration

### ~~3. Voice Input for Chat~~ ✅ <completed in claude/pull-origin-main-01YStAxpNtPtkNpxmcedMksP>
- [x] Implement audio recording functionality (Web Audio API)
- [x] Add microphone button to chat input
- [x] Create recording UI indicator (waveform animation)
- [x] Integrate speech-to-text API:
  - ✅ OpenAI Whisper API (with fallback for missing API key)
  - ✅ Graceful degradation when API key not configured
- [x] Add permission handling for microphone access
- [x] Show recording duration timer
- [x] Add cancel and send recording buttons
- [x] Convert audio to text and send to chat API
- [x] Store audio recordings (optional playback)

**Components created**:
- ✅ `components/nara/VoiceRecorder.tsx` - Recording UI with controls
- ✅ `components/nara/AudioWaveform.tsx` - Visual feedback with bars/line modes
- ✅ `app/api/speech-to-text/route.ts` - STT API endpoint (OpenAI Whisper)
- ✅ `lib/audioRecorder.ts` - Audio recording utilities with RecordRTC

---

## 📚 Learning Module Pages

### ✅ 4. Belajar (Learn) Page <completed in claude/pull-main-branch-01BTBpmKfgiQQr5jZigfhnqW>
- [x] Create `/app/learn/page.tsx` route
- [x] Design learning dashboard with progress tracking
- [x] Show all 6 learning modules in grid
- [x] Add filters (by category, difficulty, progress)
- [x] Implement search functionality
- [x] Add "Continue Learning" quick resume
- [x] Show daily achievements and streaks
- [x] Full responsive layout

**Module Detail Pages**:
- [x] `/app/learn/aksara/page.tsx` - Aksara Nusantara learning
- [x] `/app/learn/verse/page.tsx` - Stories & folklore browser
- [x] `/app/learn/symphony/page.tsx` - Music player & lessons
- [x] `/app/learn/loka/page.tsx` - Recipe browser & tutorials
- [x] `/app/learn/pola/page.tsx` - Design pattern gallery

**Components created**:
- ✅ `app/learn/page.tsx` - Main learning dashboard with search & filters
- ✅ `components/learn/LearningModuleCard.tsx` - Enhanced module cards
- ✅ `components/learn/ContinueLearningCard.tsx` - Quick resume card
- ✅ `components/learn/AchievementsCard.tsx` - Daily challenges & rewards
- ✅ `components/learn/FilterPanel.tsx` - Advanced filtering system
- ✅ `app/learn/aksara/page.tsx` - Aksara learning with 10 lessons
- ✅ `app/learn/verse/page.tsx` - Stories browser with search
- ✅ `app/learn/symphony/page.tsx` - Traditional music player
- ✅ `app/learn/loka/page.tsx` - Recipe browser (locked feature)
- ✅ `app/learn/pola/page.tsx` - Design pattern gallery

---

## 🗺️ Museum Feature (OpenStreetMap Integration)

### ~~5. Museum Map with OpenStreetMap~~ ✅ <completed in claude/pull-origin-main-01EuYYh7X9A81LnALmfoE5To>
- [x] Install Leaflet.js or Mapbox GL JS (OpenStreetMap renderers)
- [x] Create `/app/museum/page.tsx` route
- [x] Design modern museum explorer interface:
  - Split view: Map (left 60%) + List (right 40%)
  - Mobile: Tabbed view (Map | List)
- [x] Implement OpenStreetMap integration:
  - Use Leaflet with OpenStreetMap tiles
  - Custom markers for heritage sites
  - Dynamic import to avoid SSR issues
- [x] Add museum data source:
  - Create `public/data/museums.json` with Indonesian heritage sites
  - Include: name, coordinates, images, description, hours, website
- [x] Interactive features:
  - Click marker to show museum details
  - Filter by region (province/city)
  - Search museums by name
  - Get directions (link to Google Maps)
- [x] Modern UI elements:
  - Glassmorphism cards for museum info
  - Smooth animations and transitions
  - Image gallery with navigation
- [x] Full responsive design:
  - Desktop: Side-by-side layout
  - Tablet: Adaptive grid
  - Mobile: Tabbed view with view mode toggle

**Dependencies added**:
```bash
npm install leaflet react-leaflet --legacy-peer-deps
npm install @types/leaflet --save-dev
```

**Components created**:
- ✅ `components/museum/MuseumMap.tsx` - OpenStreetMap container with Leaflet
- ✅ `components/museum/MuseumCard.tsx` - Museum info card
- ✅ `components/museum/MuseumList.tsx` - List view
- ✅ `components/museum/MuseumFilter.tsx` - Filter controls
- ✅ `components/museum/MuseumDetail.tsx` - Full detail modal
- ✅ `lib/museumData.ts` - Museum data utilities
- ✅ `public/data/museums.json` - Museum data (15 locations)

**Design features implemented**:
- ✅ Gradient accents (terracotta to orange)
- ✅ Rounded corners (rounded-xl, rounded-2xl)
- ✅ Soft shadows (shadow-lg, shadow-2xl)
- ✅ Smooth hover effects
- ✅ Loading states
- ✅ Empty states with illustrations

---

## 👤 Profile & Community Pages

### 6. Profile Page
- [ ] Create `/app/profile/page.tsx` route
- [ ] Show user stats (XP, level, streak, badges)
- [ ] Display learning history and achievements
- [ ] Allow avatar customization
- [ ] Settings panel (notifications, language, theme)
- [ ] Logout functionality

### 7. Community Page
- [ ] Create `/app/community/page.tsx` route
- [ ] Design community feed/forum layout
- [ ] Show leaderboard (top learners)
- [ ] Discussion threads about culture topics
- [ ] User stories and experiences
- [ ] Social sharing features

---

## 🎨 UI/UX Improvements

### 8. Design System Updates (2025 Trends)
- [ ] Implement glassmorphism effects (backdrop-blur)
- [ ] Add micro-interactions (hover, click, loading states)
- [ ] Use modern color gradients:
  - Warm sunset gradients
  - Terracotta + coral + amber combinations
- [ ] Implement skeleton loading for all components
- [ ] Add scroll animations (reveal on scroll)
- [ ] Use variable fonts for better typography
- [ ] Add sound effects for interactions (optional)
- [ ] Implement haptic feedback for mobile

### 9. Accessibility & Performance
- [ ] Add ARIA labels for screen readers
- [ ] Ensure keyboard navigation works everywhere
- [ ] Optimize images (use Next.js Image component)
- [ ] Implement lazy loading for heavy components
- [ ] Add loading states and error boundaries
- [ ] SEO optimization (meta tags, Open Graph)
- [ ] PWA support (manifest.json, service worker)

---

## 🔧 Technical Improvements

### 10. Authentication System
- [ ] Implement proper auth (NextAuth.js or Clerk)
- [ ] Add login/signup pages
- [ ] Social login (Google, GitHub)
- [ ] Protected routes middleware
- [ ] Session management

### 11. Testing & Quality
- [ ] Write unit tests (Jest, React Testing Library)
- [ ] Add E2E tests (Playwright or Cypress)
- [ ] Implement Storybook for component library
- [ ] Add ESLint rules and Prettier config
- [ ] Set up CI/CD pipeline (GitHub Actions)

---

## 📦 Dependencies to Add

```bash
# OpenStreetMap
npm install leaflet react-leaflet
npm install @types/leaflet --save-dev

# Audio Recording
npm install recordrtc
npm install @types/recordrtc --save-dev

# Authentication (choose one)
npm install next-auth
# or
npm install @clerk/nextjs

# Testing
npm install -D @testing-library/react @testing-library/jest-dom jest
npm install -D @playwright/test

# Animations
npm install gsap
npm install framer-motion # (already installed)

# Form Handling
npm install react-hook-form zod @hookform/resolvers

# State Management Enhancement
npm install immer
```

---

## 🎯 Priority Order

### Phase 1: Core Features (Week 1-2)
1. ✅ Homepage redesign for non-authenticated users (COMPLETED)
2. ✅ Full-screen chat interface (COMPLETED)
3. ✅ Audio recording integration (COMPLETED)

### Phase 2: Content Pages (Week 3-4)
4. ✅ Learning module pages (COMPLETED)
5. Museum feature with OpenStreetMap
6. Profile and Community pages

### Phase 3: Polish & Launch (Week 5-6)
7. UI/UX improvements (2025 design trends)
8. Testing and quality assurance
9. Performance optimization
10. Deployment and monitoring

---

## 📝 Notes

- **Image Placeholders**: Use https://picsum.photos/800/600 format
- **Icons**: Continue using Lucide React (already installed)
- **Colors**: Maintain terracotta theme (#C2410C, #EA580C, #FB923C)
- **Font**: Consider upgrading to Inter Variable or Geist
- **Mobile-First**: Always design for mobile, then scale up
- **Accessibility**: WCAG 2.1 Level AA compliance minimum

---

## 🐛 Known Issues to Fix

- [ ] Fix any TypeScript errors in existing components
- [ ] Ensure Live2D models load properly on all devices
- [ ] Optimize TTS API response time
- [ ] Add error handling for API failures
- [ ] Implement rate limiting for chat API

---

**Last Updated**: 2025-11-18
**Branch**: claude/pull-main-branch-01BTBpmKfgiQQr5jZigfhnqW
**Status**: Feature #4 COMPLETED ✅ - Learning module pages fully implemented with all detail pages and components
