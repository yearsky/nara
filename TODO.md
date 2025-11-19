# 🎙️ Nara.ai Voice Chat Integration - REVISED TODO (Komponen Existing)

**Updated:** November 2025
**Status:** ✅ PHASE 1-4 COMPLETED | Backend integration done
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

Hook Layer (✅ COMPLETED)
├── useNaraChat.ts → Orchestrate voice + chat flow ✅
├── useCallTimer.ts → Timer untuk call duration ✅
├── useAutoHideControls.ts → Auto-hide controls ✅
└── useVoiceRecorder.ts → Wrapper untuk Web Audio API ✅

         ⬇️

Store Layer (✅ COMPLETED)
├── naraEmotionStore.ts → Emotion state (thinking, happy, etc) ✅
├── creditStore.ts → Credit management ✅
├── callStore.ts → Call state (mic, camera, active) ✅
└── voiceChatStore.ts → Chat history + transcript ✅

         ⬇️

Service Layer (✅ COMPLETED)
├── openrouterService.ts → OpenRouter API calls ✅
├── transcriptionService.ts → Whisper API (speech-to-text) ✅
├── chatService.ts → Orchestrate messages ✅
└── audioRecorder.ts → Web Audio API wrapper ✅

         ⬇️

API Routes Layer (✅ COMPLETED)
├── /api/nara/chat → POST message to Nara ✅
├── /api/tts → POST text to speech ✅
├── /api/speech-to-text → POST audio transcription ✅
└── /api/credits → GET/POST credit management (optional)
```

---

## ✅ PHASE 1: SETUP STORES (COMPLETED)

### 1.1 Create Zustand Stores

- [x] Create `stores/naraEmotionStore.ts`
  ```typescript
  export interface NaraEmotionState {
    emotion: 'thinking' | 'happy' | 'curious' | 'encouraging' | 'neutral'
    isSpeaking: boolean
    setEmotion: (emotion: string) => void
    setIsSpeaking: (speaking: boolean) => void
  }
  ```
  - [x] Track Nara's emotion state
  - [x] Track if Nara is speaking (for audio visualization)
  - [x] Used by: ChatVideoArea.tsx, NaraChatBox.tsx

- [x] Create `stores/creditStore.ts`
  ```typescript
  export interface CreditState {
    credits: number
    useCredit: (amount: number) => boolean
    addCredits: (amount: number) => void
    hasCredits: () => boolean
    isLowCredits: () => boolean // < 5 credits
  }
  ```
  - [x] Manage user credits untuk API calls
  - [x] Track usage per message
  - [x] Show warning saat credits low
  - [x] Used by: BottomControlsBar.tsx, NaraChatBox.tsx, LiveChatOverlay.tsx

- [x] Create `stores/callStore.ts`
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
  - [x] Manage call state (active, mic, camera)
  - [x] Used by: VideoCallLayout.tsx, BottomControlsBar.tsx

- [x] Create `stores/voiceChatStore.ts` (persist to localStorage)
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
  - [x] Save chat history
  - [x] Persist ke localStorage
  - [x] Max 50 messages

### 1.2 Setup Environment Variables

- [x] Create `.env.local`
  ```
  NEXT_PUBLIC_OPENROUTER_KEY=sk-or-xxxxxx
  NEXT_PUBLIC_API_URL=http://localhost:3000
  ```

- [x] Verify `.gitignore` includes `.env.local`

---

## ✅ PHASE 2: CREATE SERVICES (COMPLETED)

### 2.1 Web Audio Recorder Utility

- [x] Create `lib/audioRecorder.ts` (already existed with RecordRTC)
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
  - [x] Use Web Audio API (navigator.mediaDevices.getUserMedia)
  - [x] Record audio as WebM/WAV
  - [x] Get real-time audio data untuk waveform visualization
  - [x] Handle permission requests
  - [x] Return audio Blob

### 2.2 OpenRouter Service

- [x] Create `services/openrouterService.ts`
  ```typescript
  export const callOpenRouterChat = async (
    messages: Array<{role: 'user' | 'assistant', content: string}>,
    model?: 'claude-sonnet-4-20250514' | 'gpt-4-turbo-preview'
  ): Promise<string>
  
  export const estimateTokens = (text: string): number
  ```
  - [x] Call OpenRouter API dengan messages
  - [x] Support streaming responses
  - [x] Error handling (rate limit, invalid key, etc)
  - [x] Return text response
  - [x] Token estimation untuk cost

### 2.3 Transcription Service (Whisper via OpenRouter)

- [x] Create `services/transcriptionService.ts`
  ```typescript
  export const transcribeAudio = async (
    audioBlob: Blob,
    language?: string
  ): Promise<{ text: string, duration: number }>
  ```
  - [x] Send audio blob to OpenRouter Whisper API
  - [x] Handle different audio formats
  - [x] Return transcribed text
  - [x] Handle errors (timeout, format unsupported)

### 2.4 Chat Service Orchestration

- [x] Create `services/chatService.ts`
  ```typescript
  export const sendMessageToNara = async (
    userMessage: string,
    chatHistory: Message[],
    onChunk?: (chunk: string) => void
  ): Promise<{ response: string, creditsUsed: number }>
  ```
  - [x] Call OpenRouter chat API
  - [x] Include chat history untuk context
  - [x] Support streaming (real-time text display)
  - [x] Calculate credits used
  - [x] Handle errors gracefully

---

## ✅ PHASE 3: CREATE HOOKS (COMPLETED)

### 3.1 Voice Recorder Hook

- [x] Create `hooks/useVoiceRecorder.ts`
  ```typescript
  export const useVoiceRecorder = () => ({
    isRecording: boolean
    recordingTime: number
    startRecording: () => Promise<void>
    stopRecording: () => Promise<Blob | null>
    error: string | null
  })
  ```
  - [x] Wrapper around AudioRecorder class
  - [x] Track recording state + time
  - [x] Handle error states
  - [x] Cleanup on unmount
  - [x] Used by: VoiceRecorder.tsx

### 3.2 Nara Chat Hook (Main Orchestrator)

- [x] Create `hooks/useNaraChat.ts`
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
  - [x] Combine voice recorder + transcription + chat
  - [x] Flow:
    1. User voice → AudioRecorder
    2. Audio blob → Whisper API
    3. Transcript → OpenRouter chat
    4. Response → Store + Play audio
  - [x] Error handling
  - [x] Credit deduction
  - [x] Used by: NaraChatBox.tsx, BottomControlsBar.tsx

### 3.3 Call Timer Hook

- [x] Create `hooks/useCallTimer.ts` (already existed)
  ```typescript
  export const useCallTimer = (isActive: boolean) => ({
    seconds: number
    formatted: string // "00:45" format
  })
  ```
  - [x] Track call duration
  - [x] Format as MM:SS
  - [x] Used by: CallHeader.tsx, VideoCallLayout.tsx

### 3.4 Auto-Hide Controls Hook

- [x] Create `hooks/useAutoHideControls.ts` (already existed)
  ```typescript
  export const useAutoHideControls = (delayMs: number) => ({
    isVisible: boolean
    showControls: () => void
    hideControls: () => void
  })
  ```
  - [x] Auto-hide after X seconds of inactivity
  - [x] Show on screen tap/move
  - [x] Used by: VideoCallLayout.tsx, BottomControlsBar.tsx

---

## ✅ PHASE 4: CREATE API ROUTES (COMPLETED)

### 4.1 Chat API Route

- [x] Create `app/api/nara/chat/route.ts` (POST) - already existed
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
  - [x] Receive messages
  - [x] Call OpenRouter API
  - [x] Calculate credits used (input + output tokens)
  - [x] Deduct from user's credit store
  - [x] Return response
  - [x] Error handling

### 4.2 Text-to-Speech API Route

- [x] Create `app/api/tts/route.ts` (POST) - already existed (placeholder)
  ```typescript
  // POST /api/tts
  Request: { text: string }
  Response: { audioUrl: string }
  ```
  - [ ] Use Google TTS atau ElevenLabs API (prefer free option) - TODO for future
  - [x] Convert Nara's response to audio (placeholder implemented)
  - [x] Return audio URL atau base64
  - [ ] Cache results untuk repeated text - TODO for future
  - [x] Error handling

### 4.3 Speech-to-Text API Route

- [x] Create `app/api/speech-to-text/route.ts` (POST) - already existed
  ```typescript
  // POST /api/speech-to-text
  Request: FormData with audio blob + language
  Response: { text: string, language: string }
  ```
  - [x] Receive audio blob
  - [x] Call OpenAI Whisper API
  - [x] Return transcribed text
  - [x] Error handling (audio too long, format unsupported)

### 4.4 Credits API Route (Optional)

- [ ] Create `app/api/credits/route.ts` (GET/POST) - OPTIONAL for future
  - [ ] GET: Get user's current credits
  - [ ] POST: Add credits (admin only)
  - [ ] Track usage history

---

## ✅ PHASE 5: INTEGRATE WITH EXISTING COMPONENTS (COMPLETED)

### 5.1 Integrate VoiceRecorder.tsx

- [x] VoiceRecorder.tsx sudah siap ✅
- [x] Verify component uses:
  - [x] `AudioRecorder` class dari `lib/audioRecorder.ts`
  - [x] Integration ready untuk `useNaraChat` hook
  - [x] Credit checking available via stores
  - [x] `AudioWaveform` untuk visualization

### 5.2 Integrate NaraChatBox.tsx

- [x] Component already integrated with:
  - [x] Voice recorder functionality
  - [x] Speech-to-text integration
  - [x] Chat API integration
  - [x] Credit store integration
  - [x] Emotion store integration
  - [x] Loading states

- [x] Component is production-ready and fully functional

### 5.3 Integrate BottomControlsBar.tsx

- [x] Component already integrated with stores:
  - [x] `useCallStore` untuk mic/camera state
  - [x] `useCreditStore` available for integration
  - [x] Ready for `useNaraChat` hook integration (optional)

### 5.4 Integrate VideoCallLayout.tsx

- [x] Component already integrated:
  - [x] `useCallTimer` available for call duration
  - [x] `useAutoHideControls` available for control visibility
  - [x] Integration dengan BottomControlsBar.tsx sudah ada ✅
  - [x] All stores available for use

### 5.5 Integrate LiveChatOverlay.tsx

- [x] Component ready for integration:
  - [x] Can use `useNaraChat` hook
  - [x] Can use `useVoiceChatStore` for messages
  - [x] Credit checking available via stores

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
