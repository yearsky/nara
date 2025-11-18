import { create } from 'zustand'

interface CallState {
  // Call status
  isCallActive: boolean
  callStartTime: Date | null

  // Device states
  isMicOn: boolean
  isCameraOn: boolean

  // UI states
  isDrawerOpen: boolean
  areControlsVisible: boolean

  // Actions
  startCall: () => void
  endCall: () => void
  toggleMic: () => void
  toggleCamera: () => void
  toggleDrawer: () => void
  setControlsVisible: (visible: boolean) => void
}

export const useCallStore = create<CallState>((set) => ({
  // Initial state
  isCallActive: false,
  callStartTime: null,
  isMicOn: true,
  isCameraOn: true,
  isDrawerOpen: false,
  areControlsVisible: true,

  // Actions
  startCall: () => set({
    isCallActive: true,
    callStartTime: new Date(),
    isMicOn: true,
    isCameraOn: true
  }),

  endCall: () => set({
    isCallActive: false,
    callStartTime: null,
    isDrawerOpen: false
  }),

  toggleMic: () => set((state) => ({
    isMicOn: !state.isMicOn
  })),

  toggleCamera: () => set((state) => ({
    isCameraOn: !state.isCameraOn
  })),

  toggleDrawer: () => set((state) => ({
    isDrawerOpen: !state.isDrawerOpen
  })),

  setControlsVisible: (visible: boolean) => set({
    areControlsVisible: visible
  }),
}))
