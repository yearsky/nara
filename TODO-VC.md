# Nara.ai Development TODO List - UPDATED

> **Format**: ~~Strikethrough~~ = Currently being worked on by AI agent
>
> **Branch naming**: `claude/<feature-name>-<session-id>`
>
> **Last Major Update**: 2025-11-18 - Full-screen video call interface redesign

---

## 🎯 PRIORITY: Full-Screen Video Call Interface Redesign

### 📱 Design Analysis (Reference: Hanna Video Call Screenshot)

**Target Design Features:**
- ✅ True full-screen immersive experience
- ✅ Character/video fills entire viewport (~90%)
- ✅ Minimal overlay UI (only essential controls)
- ✅ Clean iOS-style interface
- ✅ Portrait-optimized layout
- ✅ Centered name + timer at top
- ✅ 3-button control bar at bottom (Camera, Mic, End Call)
- ✅ Center microphone button larger (primary action)
- ✅ Semi-transparent dark overlays
- ✅ White icons/text for contrast

**Current Implementation Issues:**
- ❌ Chat bubbles still visible in main view
- ❌ Input field takes too much space
- ❌ Controls not minimal enough
- ❌ Not truly immersive
- ❌ Layout not optimized for portrait
- ❌ Missing conversation timer
- ❌ No video placeholder implementation

---

## 🚀 PHASE 1: Full-Screen Video Call Chat (HIGHEST PRIORITY)

### Task 2.1: Refactor Full-Screen Chat Layout ⚡ NEW
**Status**: 🔴 NOT STARTED  
**Priority**: CRITICAL  
**Estimated Time**: 4-6 hours

**Objective**: Rebuild full-screen chat to match video call interface design

**Sub-tasks**:
- [ ] **Remove/Hide Current Chat UI Elements**
  - [ ] Hide chat message bubbles from main view
  - [ ] Remove visible input field (make it slide-up only)
  - [ ] Clear background - video/character should fill screen
  - [ ] Remove any cards or UI chrome

- [ ] **Implement True Full-Screen Layout**
  - [ ] Create new component: `components/nara/VideoCallLayout.tsx`
  - [ ] Full viewport height (100vh - status bar)
  - [ ] Portrait-first design (mobile optimized)
  - [ ] Z-index layering: Video BG → Overlays → Controls

- [ ] **Top Header Overlay**
  - [ ] Create component: `components/nara/CallHeader.tsx`
  - [ ] Display "Nara" name (centered, bold, white, text-xl/2xl)
  - [ ] Show conversation timer (format: "0:00")
  - [ ] Semi-transparent dark gradient background (fade from top)
  - [ ] Auto-hide after 3 seconds (show on tap)

- [ ] **Bottom Control Bar**
  - [ ] Create component: `components/nara/CallControls.tsx`
  - [ ] Fixed at bottom (safe-area-inset-bottom for iOS)
  - [ ] 3 buttons horizontal layout with flex justify-between
  - [ ] Semi-transparent dark background (backdrop-blur-md)
  - [ ] Rounded corners on top (rounded-t-3xl)
  - [ ] Padding: px-8 py-6

- [ ] **Control Buttons Design**
  ```tsx
  // Button specs:
  // - Camera (left): w-14 h-14, rounded-full, bg-white/20
  // - Microphone (center): w-16 h-16, rounded-full, bg-white/30 (LARGER)
  // - End Call (right): w-14 h-14, rounded-full, bg-red-500
  // - Icons: white, size 24px (Lucide React)
  // - Hover: scale-110, brightness increase
  // - Active: scale-95
  ```

**Components to Create**:
```
components/nara/
├── VideoCallLayout.tsx      # Main full-screen container
├── CallHeader.tsx            # Top overlay (name + timer)
├── CallControls.tsx          # Bottom control bar
├── VideoPlaceholder.tsx      # Temporary video placeholder
└── ChatDrawer.tsx            # Slide-up chat (later phase)
```

**File Structure**:
```tsx
// VideoCallLayout.tsx structure:
<div className="fixed inset-0 bg-black">
  {/* Video/Character Background - Full Screen */}
  <VideoPlaceholder />
  
  {/* Top Header Overlay */}
  <CallHeader name="Nara" duration={callDuration} />
  
  {/* Bottom Controls */}
  <CallControls 
    onCameraToggle={...}
    onMicToggle={...}
    onEndCall={...}
  />
</div>
```

---

### Task 2.2: Implement Video Placeholder ⚡ NEW
**Status**: 🔴 NOT STARTED  
**Priority**: HIGH  
**Estimated Time**: 2-3 hours

**Objective**: Create video placeholder while Live2D is being implemented

**Sub-tasks**:
- [ ] **Create VideoPlaceholder Component**
  - [ ] Component path: `components/nara/VideoPlaceholder.tsx`
  - [ ] Use `<video>` element with poster image fallback
  - [ ] Cover entire screen (object-fit: cover)
  - [ ] Portrait orientation (9:16 aspect ratio)
  - [ ] Auto-loop video playback
  - [ ] Muted by default

- [ ] **Video Assets**
  - [ ] Add placeholder video to `public/videos/nara-placeholder.mp4`
  - [ ] Alternative: Use animated gradient background as fallback
  - [ ] Poster image: `public/images/nara-poster.jpg`
  - [ ] Optimize video size (<5MB, 720p portrait)

- [ ] **Loading States**
  - [ ] Show skeleton loader while video loads
  - [ ] Smooth fade-in transition when ready
  - [ ] Error fallback (static image)

**Implementation**:
```tsx
// components/nara/VideoPlaceholder.tsx
'use client'

export default function VideoPlaceholder() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/images/nara-poster.jpg"
        className="w-full h-full object-cover"
      >
        <source src="/videos/nara-placeholder.mp4" type="video/mp4" />
      </video>
      
      {/* Gradient Overlay (optional, for better text contrast) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/40" />
    </div>
  )
}
```

**Fallback Options** (if no video available):
```tsx
// Animated gradient background
<div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 animate-gradient" />

// Or static image with subtle animation
<Image 
  src="/images/nara-character.png"
  fill
  className="object-cover animate-pulse-slow"
/>
```

---

### Task 2.3: Conversation Timer Implementation ⚡ NEW
**Status**: 🔴 NOT STARTED  
**Priority**: MEDIUM  
**Estimated Time**: 1 hour

**Sub-tasks**:
- [ ] Create custom hook: `hooks/useCallTimer.ts`
- [ ] Track conversation start time
- [ ] Update timer every second
- [ ] Format: "MM:SS" (e.g., "0:19", "1:45", "12:03")
- [ ] Persist timer if user navigates away (use Zustand store)
- [ ] Reset timer on call end

**Implementation**:
```tsx
// hooks/useCallTimer.ts
import { useState, useEffect } from 'react'

export function useCallTimer(isActive: boolean) {
  const [seconds, setSeconds] = useState(0)
  
  useEffect(() => {
    if (!isActive) return
    
    const interval = setInterval(() => {
      setSeconds(s => s + 1)
    }, 1000)
    
    return () => clearInterval(interval)
  }, [isActive])
  
  const formatted = `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`
  
  return { seconds, formatted }
}
```

---

### Task 2.4: Auto-Hide UI Controls ⚡ NEW
**Status**: 🔴 NOT STARTED  
**Priority**: MEDIUM  
**Estimated Time**: 2 hours

**Objective**: Make UI controls auto-hide for immersive experience

**Sub-tasks**:
- [ ] Implement auto-hide timer (hide after 3-5 seconds of inactivity)
- [ ] Show controls on screen tap/click
- [ ] Smooth fade in/out animations (opacity + transform)
- [ ] Different behavior for mobile vs desktop
- [ ] Prevent hiding when interacting with controls

**Implementation**:
```tsx
// hooks/useAutoHideControls.ts
export function useAutoHideControls(delay = 3000) {
  const [isVisible, setIsVisible] = useState(true)
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), delay)
    return () => clearTimeout(timer)
  }, [isVisible, delay])
  
  const showControls = () => setIsVisible(true)
  
  return { isVisible, showControls }
}
```

---

### Task 2.5: Slide-Up Chat Drawer (Secondary) ⚡ NEW
**Status**: 🔴 NOT STARTED  
**Priority**: MEDIUM  
**Estimated Time**: 3-4 hours

**Objective**: Implement Instagram-style slide-up chat for message history

**Sub-tasks**:
- [ ] Create component: `components/nara/ChatDrawer.tsx`
- [ ] Swipe up gesture to open chat history
- [ ] Show recent messages (last 10-20)
- [ ] Dismiss by swiping down or tapping outside
- [ ] Input field appears when drawer is open
- [ ] Smooth spring animations (Framer Motion)
- [ ] Mobile-optimized drawer height (60-70% of screen)

**Interaction Flow**:
1. User taps screen → controls appear
2. User swipes up from bottom → chat drawer slides up
3. Chat history visible with input field
4. Send message → drawer stays open briefly, then auto-closes
5. Swipe down → drawer closes, back to full-screen video

**Component Structure**:
```tsx
// components/nara/ChatDrawer.tsx
<motion.div
  initial={{ y: '100%' }}
  animate={{ y: isOpen ? 0 : '100%' }}
  transition={{ type: 'spring', damping: 25 }}
  className="fixed inset-x-0 bottom-0 h-[70vh] bg-white rounded-t-3xl shadow-2xl"
>
  {/* Drag Handle */}
  <div className="w-12 h-1 bg-stone-300 rounded-full mx-auto mt-3" />
  
  {/* Chat Messages */}
  <div className="flex-1 overflow-y-auto p-4">
    {messages.map(msg => <ChatBubble key={msg.id} {...msg} />)}
  </div>
  
  {/* Input Field */}
  <div className="border-t p-4">
    <ChatInput onSend={handleSend} />
  </div>
</motion.div>
```

---

### Task 2.6: Responsive Breakpoints ⚡ NEW
**Status**: 🔴 NOT STARTED  
**Priority**: MEDIUM  
**Estimated Time**: 2 hours

**Objective**: Ensure design works on all screen sizes

**Sub-tasks**:
- [ ] **Mobile Portrait (<640px)**
  - Full-screen video call layout (primary)
  - Bottom controls full width
  - Name + timer centered at top
  
- [ ] **Mobile Landscape (640px-768px)**
  - Adapt controls to landscape
  - Split view option (video left, chat right)
  
- [ ] **Tablet (768px-1024px)**
  - Consider split view as default
  - Video: 60% width, Chat: 40% width
  
- [ ] **Desktop (>1024px)**
  - Max-width container (800px)
  - Center on screen
  - Add close button (X) top-right

---

## 📋 Updated Task List Overview

### ✅ Completed Tasks
1. ✅ Homepage Redesign for Non-Authenticated Users
2. ✅ Audio Recording Integration (Voice Input)
3. ✅ Learning Module Pages (All detail pages)
4. ✅ Museum Feature with OpenStreetMap

### 🔴 High Priority (Current Sprint)
- [ ] **Task 2.1**: Refactor Full-Screen Chat Layout (CRITICAL)
- [ ] **Task 2.2**: Implement Video Placeholder
- [ ] **Task 2.3**: Conversation Timer
- [ ] **Task 2.4**: Auto-Hide UI Controls
- [ ] **Task 2.5**: Slide-Up Chat Drawer
- [ ] **Task 2.6**: Responsive Breakpoints

### 🟡 Medium Priority (Next Sprint)
- [ ] Profile Page
- [ ] Community Page
- [ ] UI/UX Improvements (2025 Trends)

### 🟢 Low Priority (Future)
- [ ] Testing & Quality Assurance
- [ ] Authentication System
- [ ] Performance Optimization

---

## 🎨 Design Specifications

### Color Palette (Video Call Interface)
```typescript
// Dark overlays
overlay: 'rgba(0, 0, 0, 0.4)'
overlayGradient: 'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)'

// Control buttons
buttonBg: 'rgba(255, 255, 255, 0.2)'  // Camera & Mic (inactive)
buttonBgActive: 'rgba(255, 255, 255, 0.3)'  // Center mic (larger)
buttonBgEnd: '#EF4444'  // End call (red-500)

// Text
textPrimary: '#FFFFFF'
textTimer: 'rgba(255, 255, 255, 0.8)'

// Backdrop blur
backdropBlur: 'backdrop-blur-md' (16px blur)
```

### Typography
```typescript
// Name (header)
name: {
  fontSize: '1.5rem',  // text-2xl
  fontWeight: 700,      // font-bold
  color: '#FFFFFF'
}

// Timer
timer: {
  fontSize: '1rem',     // text-base
  fontWeight: 500,      // font-medium
  color: 'rgba(255,255,255,0.8)'
}
```

### Spacing & Sizing
```typescript
// Control buttons
buttonSize: {
  small: '56px',   // w-14 h-14 (camera, end call)
  large: '64px',   // w-16 h-16 (microphone - center)
}

// Control bar
controlBar: {
  paddingX: '2rem',  // px-8
  paddingY: '1.5rem', // py-6
  gap: '1.5rem',      // gap-6
}

// Safe areas (iOS)
safeAreaInsetTop: 'env(safe-area-inset-top)'
safeAreaInsetBottom: 'env(safe-area-inset-bottom)'
```

### Animations
```typescript
// Control fade in/out
controlsFade: {
  duration: '300ms',
  easing: 'ease-in-out'
}

// Button interactions
buttonHover: {
  scale: 1.1,
  transition: '200ms'
}

buttonActive: {
  scale: 0.95,
  transition: '100ms'
}

// Drawer slide up
drawerSlide: {
  type: 'spring',
  damping: 25,
  stiffness: 300
}
```

---

## 🛠️ Technical Implementation Details

### Component Architecture
```
app/chat/page.tsx (Full-Screen Chat Route)
└── VideoCallLayout.tsx
    ├── VideoPlaceholder.tsx (or Live2D later)
    ├── CallHeader.tsx
    │   ├── Name: "Nara"
    │   └── Timer: useCallTimer()
    ├── CallControls.tsx
    │   ├── CameraButton
    │   ├── MicrophoneButton (larger)
    │   └── EndCallButton
    └── ChatDrawer.tsx (slide-up)
        ├── MessageList
        └── ChatInput
```

### State Management (Zustand Store)
```typescript
// store/callStore.ts
interface CallState {
  isCallActive: boolean
  callStartTime: Date | null
  isMicOn: boolean
  isCameraOn: boolean
  isDrawerOpen: boolean
  
  startCall: () => void
  endCall: () => void
  toggleMic: () => void
  toggleCamera: () => void
  toggleDrawer: () => void
}
```

### API Integration
```typescript
// Existing chat API continues to work
POST /api/chat
- Send message
- Receive response
- TTS synthesis

// New endpoints (future)
POST /api/call/start
POST /api/call/end
GET  /api/call/duration
```

---

## 📦 Dependencies Needed

```bash
# No new dependencies required for Phase 1!
# Using existing:
# - Framer Motion (animations) ✅
# - Lucide React (icons) ✅
# - Zustand (state) ✅
# - Next.js App Router ✅

# Optional (for future phases):
npm install react-swipeable  # Swipe gestures
npm install use-gesture      # Advanced gestures
```

---

## 🎯 Success Criteria

### Phase 1 Complete When:
- [x] Full-screen video placeholder fills entire viewport
- [x] Clean iOS-style interface (minimal UI)
- [x] Top header shows "Nara" + timer
- [x] Bottom has 3-button control bar (camera, mic, end)
- [x] Center mic button is visibly larger
- [x] Controls auto-hide after 3 seconds
- [x] Tap screen to show controls again
- [x] End call button works (close chat)
- [x] Responsive on mobile portrait (primary)
- [x] Smooth animations throughout

### Testing Checklist:
- [ ] Test on iPhone (Safari)
- [ ] Test on Android (Chrome)
- [ ] Test on iPad
- [ ] Test on desktop browser
- [ ] Verify safe-area-inset works (notch devices)
- [ ] Verify controls auto-hide
- [ ] Verify tap to show controls
- [ ] Verify all buttons respond to touch
- [ ] Verify timer counts correctly
- [ ] Verify video placeholder plays/loops

---

## 🚧 Implementation Order

### Day 1: Core Layout
1. Create `VideoCallLayout.tsx` with full-screen container
2. Implement `VideoPlaceholder.tsx` with video or gradient fallback
3. Add basic header with name
4. Add basic bottom controls (no functionality yet)

### Day 2: Interactivity
5. Implement `useCallTimer` hook
6. Connect timer to header display
7. Wire up control buttons (camera, mic, end call)
8. Add Zustand store for call state

### Day 3: Polish
9. Implement auto-hide controls
10. Add smooth animations (Framer Motion)
11. Responsive breakpoints
12. Test on multiple devices

### Day 4: Chat Drawer (if time permits)
13. Implement slide-up drawer
14. Connect to existing chat API
15. Swipe gestures
16. Polish transitions

---

## 📝 Implementation Notes

### Video Placeholder Options
**Option 1: Stock Video**
- Download royalty-free portrait video (Pexels, Pixabay)
- Anime-style character talking/idle
- Loop seamlessly
- File size <5MB

**Option 2: Animated Gradient**
- CSS gradient animation
- Warm colors (orange, pink, purple)
- Pulse/wave effect
- Zero file size, always works

**Option 3: Static Image + Subtle Animation**
- Use existing Nara character art
- Add breathing effect (scale pulse)
- Add particle effects (floating lights)
- Lightest option

### Performance Considerations
- Use `transform` and `opacity` for animations (GPU-accelerated)
- Avoid layout thrashing (batch DOM reads/writes)
- Lazy load chat drawer (only render when opened)
- Throttle timer updates (update UI max 1x per second)
- Use `will-change` for animated elements

### Accessibility
- Add ARIA labels to all buttons
- Ensure keyboard navigation works
- Add screen reader announcements for state changes
- High contrast mode support
- Respect `prefers-reduced-motion`

---

## 🐛 Known Issues to Address

- [ ] Current chat UI too prominent (hide it)
- [ ] Input field always visible (make it drawer-only)
- [ ] Chat bubbles interfere with video view
- [ ] Controls not minimal enough
- [ ] Missing conversation timer
- [ ] No video placeholder yet
- [ ] Layout not portrait-optimized

---

## 🎬 Future Enhancements (Post-Phase 1)

### Phase 2: Live2D Integration
- Replace video placeholder with Live2D character
- Lip sync with TTS audio
- Idle animations (breathing, blinking)
- Reactive expressions (happy, thinking, surprised)
- Mouse/touch tracking (character looks at pointer)

### Phase 3: Advanced Features
- Screen sharing (show cultural content)
- Picture-in-picture mode
- Call recording (with permission)
- Background blur/replacement
- Virtual backgrounds (cultural scenes)
- Filters/effects

### Phase 4: Multi-modal Interaction
- Video call + screen share simultaneously
- Collaborative learning (whiteboard)
- AR integration (point camera at objects)
- Real-time translation overlay

---

## 📚 Reference Resources

### Design Inspiration
- FaceTime (iOS) - Minimal controls, auto-hide
- Instagram Video Call - Drawer interface
- Discord Video Call - Control layout
- WhatsApp Video Call - Simple, functional
- Zoom Mobile - Grid view, controls

### Code Examples
- Next.js 14 App Router patterns
- Framer Motion video call transitions
- iOS-style safe area handling
- Swipeable drawer implementation

---

**Last Updated**: 2025-11-18  
**Next Review**: After Phase 1 completion  
**Current Focus**: Task 2.1 - Refactor Full-Screen Chat Layout

---

## 🎯 Quick Start Guide for AI Agent

**To implement this:**

1. **Start with Task 2.1** (Refactor layout)
   - Create new `VideoCallLayout.tsx`
   - Remove old chat UI elements
   - Implement clean full-screen container

2. **Then Task 2.2** (Video placeholder)
   - Simple `<video>` element or gradient
   - Full screen, object-fit cover
   - Auto-loop playback

3. **Add Task 2.3** (Timer)
   - Custom hook for seconds counting
   - Format as MM:SS
   - Display in header

4. **Finish with Task 2.4** (Auto-hide)
   - setTimeout logic
   - Fade in/out animations
   - Show on tap/click

**File Priority Order:**
1. `components/nara/VideoCallLayout.tsx` ← START HERE
2. `components/nara/VideoPlaceholder.tsx`
3. `components/nara/CallHeader.tsx`
4. `components/nara/CallControls.tsx`
5. `hooks/useCallTimer.ts`
6. `hooks/useAutoHideControls.ts`
7. `store/callStore.ts`

**Testing After Each Step:**
- Run `npm run dev`
- Navigate to `/chat` or trigger full-screen chat
- Verify visual output matches design
- Check console for errors
- Test on mobile viewport (DevTools)

---

**Remember**: Start simple, iterate quickly. Get the basic layout working first, then add polish!
