
export interface Game {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  logo?: string;
  category: string;
  rating: number;
  downloads: string;
  price?: string;
  isFeatured?: boolean;
  isEditorChoice?: boolean;
  route?: string;
  activePlayers?: number;
  tournaments?: number;
  likes?: number;
  comments?: number;
  shares?: number;
  verified?: boolean;
}
