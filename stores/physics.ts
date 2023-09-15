import { create } from 'zustand'

interface IPhysicsStore {
  hoverableObjects: any[]
  addObjectAsHoverable: (object: any) => void
  hoveredObject: any
  setObjectAsHovered: (hoveredObject: any) => void
}

export const createPhysicsSlice = create<IPhysicsStore>((set) => ({
  // Add an object to the hoverable objects array, everything in this list will become a hoverable object for the player (if not already in the list)
  hoverableObjects: [],
  addObjectAsHoverable: (object) => {
    set((state) => {
      if (state.hoverableObjects.find((element) => element.uuid === object.uuid)) return {}
      return {
        hoverableObjects: state.hoverableObjects.concat(object),
      }
    })
  },
  // Handles the current hovered object by the player (if any)
  hoveredObject: null,
  setObjectAsHovered: (object) => {
    set(() => {
      return {
        hoveredObject: object,
      }
    })
  },
}))
