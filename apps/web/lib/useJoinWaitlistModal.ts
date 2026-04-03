import { create } from 'zustand'

interface JoinWaitlistModalStore {
  isOpen: boolean
  open: () => void
  close: () => void
}

// global state and hook to show and hide the Join Waitlist modal
export const useJoinWaitlistModal = create<JoinWaitlistModalStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}))
