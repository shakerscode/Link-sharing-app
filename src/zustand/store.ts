import { create } from "zustand";
import { IUserPlatformList } from "~/interface/platform";

interface LinkState {
  linkList: IUserPlatformList | null;
  allLinkLists: IUserPlatformList[];
  setLinkList: (link: IUserPlatformList | null) => void;
  setAllLinkLists: (links: IUserPlatformList[]) => void;
  addLink: (link: IUserPlatformList) => void;
}

export const useLinkStore = create<LinkState>((set) => ({
  linkList: null,
  allLinkLists: [],
  setLinkList: (link) => set({ linkList: link }),
  setAllLinkLists: (links) => set(() => ({ allLinkLists: links })),
  addLink: (link) =>
    set((state) => ({ allLinkLists: [...state.allLinkLists, link] })),
}));
