import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LinkState } from "~/interface/links";
export const useLinkStore = create<LinkState>()(
  persist(
    (set) => ({
      linkList: null,
      updatedLinkList: null,
      allLinkLists: [],
      setLinkList: (link) => set({ linkList: link }),
      setUpdatedLinkList: (link) => set({ updatedLinkList: link }),
      setAllLinkLists: (links) => set(() => ({ allLinkLists: links })),
      addLink: (link) =>
        set((state) => ({ allLinkLists: [...state.allLinkLists, link] })),
    }),
    {
      name: "link-storage", // Key in local storage
      // Only persist the allLinkLists
      partialize: (state) => ({ allLinkLists: state.allLinkLists }),
    }
  )
);
