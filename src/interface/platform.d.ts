export interface IPlatform {
  name: string;
  icon: ReactNode;
}
export interface IUserPlatformList {
  platform_name: string | null;
  platform_url: string | null;
  _id?: string;
}
