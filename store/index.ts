import { create } from "zustand"

type SidebarState = {
  isOpen: boolean
  setIsOpen: () => void
}

export const useSidebarStore = create<SidebarState>(
  set => ({
    isOpen: false,
    setIsOpen: () =>
      set(state => ({ isOpen: !state.isOpen })),
  })
)

type Chapter = { id: string; progress: number }

type ProgressState = {
  chapters: Chapter[]
  setNewChapter: (newChapter: Chapter) => void
}

export const useProgressStore = create<ProgressState>(
  set => ({
    setNewChapter: newChapter =>
      set(state => ({
        chapters: [...state.chapters, newChapter],
      })),
    chapters: [],
  })
)
