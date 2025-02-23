
export interface Game {
  id: string | number;
  title: string;
  description: string;
  coverImage: string;
  creatorImage: string;
  verified: boolean;
  type: string[];
  likes: number;
  comments: number;
  shares: number;
  bookmarked?: boolean;
  category?: string[];
  icon?: string;
  rating?: number;
  downloads?: string;
  size?: string;
  hasAds?: boolean;
  inAppPurchases?: boolean;
  route?: string;
  updateInfo?: string;
}

export interface GameEvent {
  id: string;
  title: string;
  description: string;
  image: string;
  gameTitle: string;
  gameIcon: string;
  developer: string;
  rating: number;
  endsIn: string;
}
