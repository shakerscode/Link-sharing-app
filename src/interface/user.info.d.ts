export interface IUserInfo {
  first_name: string | null;
  last_name: string | null;
  profile_url: string | null;
  email: string | null;
}

export interface UserState extends IUserInfo {
  password: string | null;
  setUserDetails: (details: Partial<UserState>) => void;
}
