
export interface Game {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  icon?: string;
  category: string[];
  rating: number;
  downloads: string;
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

