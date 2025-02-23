
export interface Game {
  id: number | string;
  title: string;
  description: string;
  coverImage: string;
  creatorImage: string;
  icon?: string;
  verified: boolean;
  type: string[];
  category?: string[];
  likes: number;
  comments: number;
  shares: number;
  bookmarked?: boolean;
  rating?: number;
  downloads?: string;
  size?: string;
  route?: string;
  hasAds?: boolean;
  inAppPurchases?: boolean;
  updateInfo?: string;
  thumbnail?: string;
}
