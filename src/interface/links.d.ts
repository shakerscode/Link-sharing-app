import { IUserPlatformList } from "./platform";

export interface LinkState {
    linkList: IUserPlatformList | null;
    updatedLinkList: IUserPlatformList | null;
    allLinkLists: IUserPlatformList[];
    setLinkList: (link: IUserPlatformList | null) => void;
    setUpdatedLinkList: (link: IUserPlatformList | null) => void;
    setAllLinkLists: (links: IUserPlatformList[]) => void;
    addLink: (link: IUserPlatformList) => void;
  }