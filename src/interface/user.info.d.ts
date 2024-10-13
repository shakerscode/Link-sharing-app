export interface IUserInfo {
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  imageUrl?: string;
  _id?: string;
  user_name?: string;
}

export interface IUserInfoWithoutProfileUrl
  extends Omit<IUserInfo, "profile_url"> {
  password: string | null;
}

export interface UserState extends IUserInfo {
  password: string | null;
  setUserDetails: (details: Partial<UserState>) => void;
  authenticateUserDetails: IUserInfo | null;
  isAuthenticated: boolean;
  setAuthenticatedUserDetails: (userDetails: IUserInfo) => void;
  setIsAuthenticated: (authStatus: Partial<boolean>) => void;
  logout: () => void;
}
