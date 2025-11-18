# Nara.ai Development TODO List

> **Format**: ~~Strikethrough~~ = Currently being worked on by AI agent
>
> **Branch naming**: `claude/<feature-name>-<session-id>`

---

## 🏠 Homepage Features (User Not Logged In)

### ~~1. Homepage Redesign for Non-Authenticated Users~~ <worked in claude/create-user-homepage-01VtBjydZoT5vve4NExjxt6x>
- [ ] Create new landing page component for non-authenticated users
- [ ] Design hero section with Nara circle avatar (animated pulse effect)
- [ ] Add "Try Chat with Nara" CTA button (prominent)
- [ ] Implement auth state detection (show different content for logged in vs not logged in)
- [ ] Add feature showcase section (Museum, Learning, Community)
- [ ] Use modern gradients and animations (2025 design trends)
- [ ] Ensure full responsive design (mobile-first)
- [ ] Add image placeholders from:
  - https://picsum.photos/ for generic images
  - https://ui-avatars.com/ for avatar placeholders
  - https://placeholder.com/ for specific dimensions

**Components to create**:
- `components/landing/HeroSection.tsx` - Hero with Nara circle
- `components/landing/FeatureShowcase.tsx` - Feature grid
- `components/landing/CTASection.tsx` - Call to action
- `components/landing/TryChatButton.tsx` - Main CTA button
- `app/(landing)/page.tsx` - New landing page route

---

## 💬 Full Screen Chat Feature (WhatsApp-style Video Call)

### 2. Full Screen Chat Interface
- [ ] Create full-screen chat modal/page component
- [ ] Design layout similar to WhatsApp video call:
  - Large video/avatar area (top 70%)
  - Chat input bar (bottom 10%)
  - Minimal controls overlay (mute, end call, etc)
  - Floating close/minimize button
- [ ] Implement smooth transitions (enter/exit animations)
- [ ] Add background blur effect when chat is active
- [ ] Responsive design for mobile and desktop
- [ ] Integrate with existing NaraChatBox component

**Components to create**:
- `components/nara/FullScreenChat.tsx` - Main full-screen wrapper
- `components/nara/ChatControls.tsx` - Overlay controls
- `components/nara/ChatVideoArea.tsx` - Video/avatar display area

---

## 🎙️ Audio Recording Integration

### 3. Voice Input for Chat
- [ ] Implement audio recording functionality (Web Audio API)
- [ ] Add microphone button to chat input
- [ ] Create recording UI indicator (waveform animation)
- [ ] Integrate speech-to-text API:
  - Consider: OpenAI Whisper API
  - Alternative: Web Speech API (browser native)
- [ ] Add permission handling for microphone access
- [ ] Show recording duration timer
- [ ] Add cancel and send recording buttons
- [ ] Convert audio to text and send to chat API
- [ ] Store audio recordings (optional playback)

**Components to create**:
- `components/nara/VoiceRecorder.tsx` - Recording UI
- `components/nara/AudioWaveform.tsx` - Visual feedback
- `app/api/speech-to-text/route.ts` - STT API endpoint
- `lib/audioRecorder.ts` - Audio recording utilities

---

## 📚 Learning Module Pages

### 4. Belajar (Learn) Page
- [ ] Create `/app/learn/page.tsx` route
- [ ] Design learning dashboard with progress tracking
- [ ] Show all 6 learning modules in grid
- [ ] Add filters (by category, difficulty, progress)
- [ ] Implement search functionality
- [ ] Add "Continue Learning" quick resume
- [ ] Show daily achievements and streaks
- [ ] Full responsive layout

**Module Detail Pages**:
- [ ] `/app/learn/aksara/page.tsx` - Aksara Nusantara learning
- [ ] `/app/learn/verse/page.tsx` - Stories & folklore browser
- [ ] `/app/learn/symphony/page.tsx` - Music player & lessons
- [ ] `/app/learn/loka/page.tsx` - Recipe browser & tutorials
- [ ] `/app/learn/pola/page.tsx` - Design pattern gallery

---

## 🗺️ Museum Feature (OpenStreetMap Integration)

### 5. Museum Map with OpenStreetMap
- [ ] Install Leaflet.js or Mapbox GL JS (OpenStreetMap renderers)
- [ ] Create `/app/museum/page.tsx` route
- [ ] Design modern museum explorer interface:
  - Split view: Map (left 60%) + List (right 40%)
  - Mobile: Tabbed view (Map | List)
- [ ] Implement OpenStreetMap integration:
  - Use Leaflet with OpenStreetMap tiles
  - Custom markers for heritage sites
  - Cluster markers for better performance
- [ ] Add museum data source:
  - Create `public/data/museums.json` with Indonesian heritage sites
  - Include: name, coordinates, images, description, hours, website
- [ ] Interactive features:
  - Click marker to show museum details
  - Filter by region (province/city)
  - Search museums by name
  - Get directions (link to Google Maps)
  - Save favorites
- [ ] Modern UI elements:
  - Glassmorphism cards for museum info
  - Smooth animations and transitions
  - Dark mode support
  - Image gallery lightbox
- [ ] Full responsive design:
  - Desktop: Side-by-side layout
  - Tablet: Adaptive grid
  - Mobile: Full-width with bottom sheet for details

**Dependencies to add**:
```bash
npm install leaflet react-leaflet
npm install @types/leaflet --save-dev
```

**Components to create**:
- `components/museum/MuseumMap.tsx` - OpenStreetMap container
- `components/museum/MuseumCard.tsx` - Museum info card
- `components/museum/MuseumList.tsx` - List view
- `components/museum/MuseumFilter.tsx` - Filter controls
- `components/museum/MuseumDetail.tsx` - Full detail modal
- `components/museum/MuseumMarker.tsx` - Custom map marker
- `lib/museumData.ts` - Museum data utilities

**Design requirements**:
- Use gradient accents (terracotta to orange)
- Rounded corners (rounded-xl, rounded-2xl)
- Soft shadows (shadow-lg, shadow-2xl)
- Smooth hover effects
- Loading skeletons
- Empty states with illustrations

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
1. ~~Homepage redesign for non-authenticated users~~
2. Full-screen chat interface
3. Audio recording integration

### Phase 2: Content Pages (Week 3-4)
4. Learning module pages
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
**Branch**: claude/create-user-homepage-01VtBjydZoT5vve4NExjxt6x
