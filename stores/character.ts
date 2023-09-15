import { create } from 'zustand'

interface ICharacterStore {
  direction: string
  setDirection: (direction: string) => void
  position: {
    x: number
    y: number
    z: number
  }
  setPosition: (position: { x: number; y: number; z: number }) => void
}

export const createCharacterSlice = create<ICharacterStore>((set) => ({
  // Store the current direction of the character (left or right)
  direction: 'left',
  setDirection: (direction) => {
    set(() => {
      return {
        direction: direction,
      }
    })
  },

  // Store the current position of the character
  position: {
    x: 0,
    y: 0,
    z: 0,
  },
  setPosition: (position: { x: number; y: number; z: number }) => set({ position }),
}))
