import { create } from "zustand";
import { LinkState } from "~/interface/links"; 



export const useLinkStore = create<LinkState>((set) => ({
  linkList: null,
  allLinkLists: [],
  setLinkList: (link) => set({ linkList: link }),
  setAllLinkLists: (links) => set(() => ({ allLinkLists: links })),
  addLink: (link) =>
    set((state) => ({ allLinkLists: [...state.allLinkLists, link] })),
}));
