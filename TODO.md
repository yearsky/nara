# 🎙️ Nara.ai Voice Chat Integration - REVISED TODO (Komponen Existing)

**Updated:** November 2025  
**Status:** Optimized untuk component existing  
**Focus:** Backend integration + OpenRouter API + Stores + Hooks

---

## 📊 Overview - Architecture Baru

```
Component Layer (SUDAH ADA ✅)
├── VoiceRecorder.tsx → Recording + Waveform visualization
├── NaraChatBox.tsx → Chat interface
├── VideoCallLayout.tsx → Full screen call
├── BottomControlsBar.tsx → Controls (mic, camera, input)
└── LiveChatOverlay.tsx → TikTok-style chat overlay

         ⬇️ (Perlu integrate)

Hook Layer (PERLU BUAT)
├── useNaraChat.ts → Orchestrate voice + chat flow
├── useCallTimer.ts → Timer untuk call duration
├── useAutoHideControls.ts → Auto-hide controls
└── useVoiceRecorder.ts → Wrapper untuk Web Audio API

         ⬇️ (Perlu integrate)

Store Layer (PERLU SETUP)
├── naraEmotionStore.ts → Emotion state (thinking, happy, etc)
├── creditStore.ts → Credit management
├── callStore.ts → Call state (mic, camera, active)
└── voiceChatStore.ts → Chat history + transcript

         ⬇️ (Perlu integrate)

Service Layer (PERLU BUAT)
├── openrouterService.ts → OpenRouter API calls
├── transcriptionService.ts → Whisper API (speech-to-text)
├── chatService.ts → Orchestrate messages
└── audioRecorder.ts → Web Audio API wrapper

         ⬇️

API Routes Layer (PERLU BUAT)
├── /api/nara/chat → POST message to Nara
├── /api/tts → POST text to speech
├── /api/speech-to-text → POST audio transcription
└── /api/credits → GET/POST credit management
```

---

## 🟢 PHASE 1: SETUP STORES (Week 1)

### 1.1 Create Zustand Stores

- [ ] Create `src/stores/naraEmotionStore.ts`
  ```typescript
  export interface NaraEmotionState {
    emotion: 'thinking' | 'happy' | 'curious' | 'encouraging' | 'neutral'
    isSpeaking: boolean
    setEmotion: (emotion: string) => void
    setIsSpeaking: (speaking: boolean) => void
  }
  ```
  - [ ] Track Nara's emotion state
  - [ ] Track if Nara is speaking (for audio visualization)
  - [ ] Used by: ChatVideoArea.tsx, NaraChatBox.tsx

- [ ] Create `src/stores/creditStore.ts`
  ```typescript
  export interface CreditState {
    credits: number
    useCredit: (amount: number) => boolean
    addCredits: (amount: number) => void
    hasCredits: () => boolean
    isLowCredits: () => boolean // < 5 credits
  }
  ```
  - [ ] Manage user credits untuk API calls
  - [ ] Track usage per message
  - [ ] Show warning saat credits low
  - [ ] Used by: BottomControlsBar.tsx, NaraChatBox.tsx, LiveChatOverlay.tsx

- [ ] Create `src/stores/callStore.ts`
  ```typescript
  export interface CallState {
    isCallActive: boolean
    isMicOn: boolean
    isCameraOn: boolean
    startCall: () => void
    endCall: () => void
    toggleMic: () => void
    toggleCamera: () => void
  }
  ```
  - [ ] Manage call state (active, mic, camera)
  - [ ] Used by: VideoCallLayout.tsx, BottomControlsBar.tsx

- [ ] Create `src/stores/voiceChatStore.ts` (persist to localStorage)
  ```typescript
  export interface Message {
    id: string
    role: 'user' | 'assistant'
    content: string
    audioUrl?: string
    timestamp: number
  }
  
  export interface VoiceChatState {
    messages: Message[]
    addMessage: (message: Message) => void
    clearMessages: () => void
  }
  ```
  - [ ] Save chat history
  - [ ] Persist ke localStorage
  - [ ] Max 50 messages

### 1.2 Setup Environment Variables

- [ ] Create `.env.local`
  ```
  NEXT_PUBLIC_OPENROUTER_KEY=sk-or-xxxxxx
  NEXT_PUBLIC_API_URL=http://localhost:3000
  ```

- [ ] Verify `.gitignore` includes `.env.local`

---

## 🟡 PHASE 2: CREATE SERVICES (Week 1-2)

### 2.1 Web Audio Recorder Utility

- [ ] Create `src/lib/audioRecorder.ts`
  ```typescript
  export class AudioRecorder {
    static isSupported(): boolean
    initialize(): Promise<void>
    startRecording(): void
    stopRecording(): Promise<Blob>
    getDuration(): number
    getTimeDomainData(): Uint8Array
    destroy(): void
  }
  
  export const formatDuration = (seconds: number): string
  ```
  - [ ] Use Web Audio API (navigator.mediaDevices.getUserMedia)
  - [ ] Record audio as WebM/WAV
  - [ ] Get real-time audio data untuk waveform visualization
  - [ ] Handle permission requests
  - [ ] Return audio Blob

### 2.2 OpenRouter Service

- [ ] Create `src/services/openrouterService.ts`
  ```typescript
  export const callOpenRouterChat = async (
    messages: Array<{role: 'user' | 'assistant', content: string}>,
    model?: 'claude-sonnet-4-20250514' | 'gpt-4-turbo-preview'
  ): Promise<string>
  
  export const estimateTokens = (text: string): number
  ```
  - [ ] Call OpenRouter API dengan messages
  - [ ] Support streaming responses
  - [ ] Error handling (rate limit, invalid key, etc)
  - [ ] Return text response
  - [ ] Token estimation untuk cost

### 2.3 Transcription Service (Whisper via OpenRouter)

- [ ] Create `src/services/transcriptionService.ts`
  ```typescript
  export const transcribeAudio = async (
    audioBlob: Blob,
    language?: string
  ): Promise<{ text: string, duration: number }>
  ```
  - [ ] Send audio blob to OpenRouter Whisper API
  - [ ] Handle different audio formats
  - [ ] Return transcribed text
  - [ ] Handle errors (timeout, format unsupported)

### 2.4 Chat Service Orchestration

- [ ] Create `src/services/chatService.ts`
  ```typescript
  export const sendMessageToNara = async (
    userMessage: string,
    chatHistory: Message[],
    onChunk?: (chunk: string) => void
  ): Promise<{ response: string, creditsUsed: number }>
  ```
  - [ ] Call OpenRouter chat API
  - [ ] Include chat history untuk context
  - [ ] Support streaming (real-time text display)
  - [ ] Calculate credits used
  - [ ] Handle errors gracefully

---

## 🟠 PHASE 3: CREATE HOOKS (Week 2)

### 3.1 Voice Recorder Hook

- [ ] Create `src/hooks/useVoiceRecorder.ts`
  ```typescript
  export const useVoiceRecorder = () => ({
    isRecording: boolean
    recordingTime: number
    startRecording: () => Promise<void>
    stopRecording: () => Promise<Blob | null>
    error: string | null
  })
  ```
  - [ ] Wrapper around AudioRecorder class
  - [ ] Track recording state + time
  - [ ] Handle error states
  - [ ] Cleanup on unmount
  - [ ] Used by: VoiceRecorder.tsx

### 3.2 Nara Chat Hook (Main Orchestrator)

- [ ] Create `src/hooks/useNaraChat.ts`
  ```typescript
  export const useNaraChat = () => ({
    messages: Message[]
    isLoading: boolean
    error: string | null
    handleSendMessage: (text: string) => Promise<void>
    handleVoiceRecord: (blob: Blob) => Promise<void>
    clearChat: () => void
  })
  ```
  - [ ] Combine voice recorder + transcription + chat
  - [ ] Flow:
    1. User voice → AudioRecorder
    2. Audio blob → Whisper API
    3. Transcript → OpenRouter chat
    4. Response → Store + Play audio
  - [ ] Error handling
  - [ ] Credit deduction
  - [ ] Used by: NaraChatBox.tsx, BottomControlsBar.tsx

### 3.3 Call Timer Hook

- [ ] Create `src/hooks/useCallTimer.ts`
  ```typescript
  export const useCallTimer = (isActive: boolean) => ({
    seconds: number
    formatted: string // "00:45" format
  })
  ```
  - [ ] Track call duration
  - [ ] Format as MM:SS
  - [ ] Used by: CallHeader.tsx, VideoCallLayout.tsx

### 3.4 Auto-Hide Controls Hook

- [ ] Create `src/hooks/useAutoHideControls.ts`
  ```typescript
  export const useAutoHideControls = (delayMs: number) => ({
    isVisible: boolean
    showControls: () => void
    hideControls: () => void
  })
  ```
  - [ ] Auto-hide after X seconds of inactivity
  - [ ] Show on screen tap/move
  - [ ] Used by: VideoCallLayout.tsx, BottomControlsBar.tsx

---

## 🔴 PHASE 4: CREATE API ROUTES (Week 2-3)

### 4.1 Chat API Route

- [ ] Create `src/app/api/nara/chat/route.ts` (POST)
  ```typescript
  // POST /api/nara/chat
  Request: {
    messages: Array<{role: 'user'|'assistant', content: string}>
    context?: string
  }
  Response: {
    message: string
    creditsUsed: number
  }
  ```
  - [ ] Receive messages
  - [ ] Call OpenRouter API
  - [ ] Calculate credits used (input + output tokens)
  - [ ] Deduct from user's credit store
  - [ ] Return response
  - [ ] Error handling

### 4.2 Text-to-Speech API Route

- [ ] Create `src/app/api/tts/route.ts` (POST)
  ```typescript
  // POST /api/tts
  Request: { text: string }
  Response: { audioUrl: string }
  ```
  - [ ] Use Google TTS atau ElevenLabs API (prefer free option)
  - [ ] Convert Nara's response to audio
  - [ ] Return audio URL atau base64
  - [ ] Cache results untuk repeated text
  - [ ] Error handling

### 4.3 Speech-to-Text API Route

- [ ] Create `src/app/api/speech-to-text/route.ts` (POST)
  ```typescript
  // POST /api/speech-to-text
  Request: FormData with audio blob + language
  Response: { text: string, language: string }
  ```
  - [ ] Receive audio blob
  - [ ] Call OpenRouter Whisper API
  - [ ] Return transcribed text
  - [ ] Error handling (audio too long, format unsupported)

### 4.4 Credits API Route (Optional)

- [ ] Create `src/app/api/credits/route.ts` (GET/POST)
  - [ ] GET: Get user's current credits
  - [ ] POST: Add credits (admin only)
  - [ ] Track usage history

---

## 🟣 PHASE 5: INTEGRATE WITH EXISTING COMPONENTS (Week 3)

### 5.1 Integrate VoiceRecorder.tsx

- [ ] VoiceRecorder.tsx sudah siap ✅
- [ ] Verify component uses:
  - [ ] `AudioRecorder` class dari `src/lib/audioRecorder.ts`
  - [ ] `useNaraChat` hook untuk submit recorded audio
  - [ ] `useCreditStore` untuk credit checking
  - [ ] `AudioWaveform` untuk visualization

### 5.2 Integrate NaraChatBox.tsx

- [ ] Update component untuk:
  - [ ] Use `useNaraChat` hook (orchestrator)
  - [ ] Connect voice recorder button ke `handleVoiceRecord`
  - [ ] Connect send button ke `handleSendMessage`
  - [ ] Display messages dari store
  - [ ] Show loading state
  - [ ] Show credit warning

- [ ] Key integration points:
  ```typescript
  // In NaraChatBox.tsx
  const { messages, isLoading, handleSendMessage, handleVoiceRecord } = useNaraChat()
  ```

### 5.3 Integrate BottomControlsBar.tsx

- [ ] Update component untuk:
  - [ ] Use `useNaraChat` untuk chat messages
  - [ ] Use `useCallStore` untuk mic/camera state
  - [ ] Use `useCreditStore` untuk credit checking
  - [ ] Input field send button calls `handleSendMessage`

### 5.4 Integrate VideoCallLayout.tsx

- [ ] Update component untuk:
  - [ ] Use `useCallTimer` untuk call duration
  - [ ] Use `useAutoHideControls` untuk control visibility
  - [ ] Messages overlay shows chat messages
  - [ ] Controls bar fully functional
  - [ ] Integration dengan BottomControlsBar.tsx sudah ada ✅

### 5.5 Integrate LiveChatOverlay.tsx

- [ ] Update component untuk:
  - [ ] Use `useNaraChat` hook
  - [ ] Messages dari chat history
  - [ ] Input field integration
  - [ ] Credit checking

---

## 🔵 PHASE 6: TESTING & REFINEMENT (Week 3-4)

### 6.1 Unit Tests

- [ ] Test `audioRecorder.ts`
  - [ ] Recording starts correctly
  - [ ] Audio blob returned properly
  - [ ] Duration tracking
  - [ ] Permission handling

- [ ] Test `openrouterService.ts`
  - [ ] API calls correctly
  - [ ] Error handling
  - [ ] Token estimation

- [ ] Test Stores
  - [ ] State updates
  - [ ] Persistence (localStorage)
  - [ ] Credit deduction

### 6.2 Integration Tests

- [ ] Full voice-to-chat flow
  - [ ] Record audio → Transcribe → Send to Nara → Display response
  - [ ] Test dengan different audio lengths
  - [ ] Test error scenarios (no transcription, API error)

- [ ] Manual text input flow
  - [ ] Type message → Send → Display response
  - [ ] Test streaming responses (real-time text)

- [ ] Component integration
  - [ ] VoiceRecorder → Chat messages
  - [ ] BottomControlsBar → Full message flow
  - [ ] VideoCallLayout → Mic + camera + chat all working

### 6.3 Performance Testing

- [ ] Latency measurement
  - [ ] Recording to first response: target <3s
  - [ ] Streaming response time
  - [ ] Audio playback smoothness

- [ ] Bundle size check
  - [ ] No bloat dari new libraries
  - [ ] Code splitting working

### 6.4 Browser Testing

- [ ] Web Audio API support
  - [ ] Chrome/Edge ✅
  - [ ] Safari (iOS specific)
  - [ ] Firefox

- [ ] Mobile experience
  - [ ] Touch interactions
  - [ ] Keyboard handling
  - [ ] Mic permission flow

---

## 🟢 PHASE 7: EDGE CASES & ERROR HANDLING (Week 4)

### 7.1 Error Scenarios

- [ ] Mic not available
  - [ ] Show clear error message
  - [ ] Fallback to text input
  
- [ ] Transcription fails
  - [ ] Retry mechanism
  - [ ] Manual text input option
  
- [ ] API errors (OpenRouter, TTS, STT)
  - [ ] Retry with exponential backoff
  - [ ] User-friendly error messages
  - [ ] Fallback responses

- [ ] No credits
  - [ ] Prevent message sending
  - [ ] Show upgrade prompt
  - [ ] Warn sebelum running out

### 7.2 Network Handling

- [ ] Offline detection
  - [ ] Show offline indicator
  - [ ] Queue messages locally
  - [ ] Retry when online

- [ ] Slow network
  - [ ] Show progress indicators
  - [ ] Timeout handling
  - [ ] Graceful degradation

### 7.3 Data Validation

- [ ] Audio blob validation
  - [ ] Check file size
  - [ ] Validate format
  
- [ ] Message content validation
  - [ ] Profanity check (optional)
  - [ ] Max length enforcement
  
- [ ] API response validation
  - [ ] Check response format
  - [ ] Handle unexpected data

---

## 🎯 PHASE 8: DEPLOYMENT & MONITORING (Week 4)

### 8.1 Production Setup

- [ ] Environment variables
  - [ ] Set `NEXT_PUBLIC_OPENROUTER_KEY` di Vercel
  - [ ] Set any backend URLs
  
- [ ] Security
  - [ ] Validate API key (don't expose in frontend if possible)
  - [ ] Rate limiting backend endpoints
  - [ ] CORS configuration

### 8.2 Deployment

- [ ] Deploy ke Vercel
  - [ ] Test production build locally first
  - [ ] Verify all env vars set
  - [ ] Test on staging first

### 8.3 Monitoring

- [ ] Error tracking (Sentry atau similar)
  - [ ] Track API errors
  - [ ] Track recording failures
  - [ ] Track transcription issues

- [ ] Analytics
  - [ ] Track: voice vs text ratio
  - [ ] Track: average response time
  - [ ] Track: credit usage per user
  - [ ] Track: error rates

---

## 📝 Implementation Checklist (Per Component)

### VoiceRecorder.tsx
- [x] Component exists ✅
- [ ] Uses `AudioRecorder` class
- [ ] Uses `useNaraChat` hook
- [ ] Shows waveform visualization
- [ ] Handles permissions

### NaraChatBox.tsx
- [x] Component exists ✅
- [ ] Integrated with `useNaraChat` hook
- [ ] Voice recorder button functional
- [ ] Send message functional
- [ ] Display messages correctly
- [ ] Show loading state
- [ ] Credit warning

### BottomControlsBar.tsx
- [x] Component exists ✅
- [ ] Mic toggle working
- [ ] Camera toggle working
- [ ] Chat input functional
- [ ] Send button working
- [ ] Integrated with stores

### VideoCallLayout.tsx
- [x] Component exists ✅
- [ ] Call timer working
- [ ] Controls auto-hide working
- [ ] Messages overlay showing
- [ ] All controls functional
- [ ] Mic + camera + chat all integrated

### LiveChatOverlay.tsx
- [x] Component exists ✅
- [ ] Messages display
- [ ] Input field working
- [ ] Send button working
- [ ] Credit checking

---

## 🔗 File Structure (Final)

```
src/
├── app/
│   └── api/
│       ├── nara/
│       │   └── chat/
│       │       └── route.ts (NEW)
│       ├── tts/
│       │   └── route.ts (NEW)
│       └── speech-to-text/
│           └── route.ts (NEW)
├── hooks/
│   ├── useVoiceRecorder.ts (NEW)
│   ├── useNaraChat.ts (NEW - MAIN ORCHESTRATOR)
│   ├── useCallTimer.ts (NEW)
│   └── useAutoHideControls.ts (NEW)
├── lib/
│   └── audioRecorder.ts (NEW)
├── services/
│   ├── openrouterService.ts (NEW)
│   ├── transcriptionService.ts (NEW)
│   └── chatService.ts (NEW)
├── stores/
│   ├── naraEmotionStore.ts (NEW)
│   ├── creditStore.ts (NEW)
│   ├── callStore.ts (NEW)
│   └── voiceChatStore.ts (NEW)
└── components/
    └── nara/
        ├── VoiceRecorder.tsx (EXISTING ✅)
        ├── NaraChatBox.tsx (EXISTING ✅)
        ├── BottomControlsBar.tsx (EXISTING ✅)
        ├── VideoCallLayout.tsx (EXISTING ✅)
        ├── LiveChatOverlay.tsx (EXISTING ✅)
        └── ... (other existing components)
```

---

## 🎯 Success Metrics

By end of Phase 8:

✅ **Functionality:**
- Voice recording works end-to-end
- Transcription working (speech → text)
- Chat with OpenRouter functional
- Text-to-speech working
- All components integrated

✅ **Performance:**
- Recording to response: <3s
- Streaming responses visible in real-time
- No jank or lag in UI

✅ **Reliability:**
- >99% uptime
- Proper error handling
- Graceful fallbacks

✅ **User Experience:**
- Mic permission flow smooth
- Transcript accuracy >90%
- Response quality good
- Easy to use

---

## 📚 Dependencies to Install

```bash
npm install zustand            # Store management
npm install --save-dev vitest  # Testing (jika belum ada)
```

Most libraries sudah installed via existing components:
- ✅ framer-motion (animations)
- ✅ lucide-react (icons)
- ✅ howler (audio playback)

---

## 🚀 Starting Implementation Order

1. **Create all Stores** (naraEmotionStore, creditStore, callStore, voiceChatStore)
2. **Create audioRecorder.ts utility**
3. **Create hooks** (useVoiceRecorder, useCallTimer, useAutoHideControls)
4. **Create services** (openrouterService, transcriptionService, chatService)
5. **Create `useNaraChat.ts`** (MAIN ORCHESTRATOR - integrate everything)
6. **Create API routes** (/api/nara/chat, /api/tts, /api/speech-to-text)
7. **Integrate with existing components** (update component imports + hooks)
8. **Test end-to-end flows**
9. **Deploy & monitor**

---

**Version:** 2.0 (Optimized for Existing Components)  
**Status:** Ready to implement ✅  
**Estimated Timeline:** 3-4 weeks (part-time)
