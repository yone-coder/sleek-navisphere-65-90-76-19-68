
export interface Opponent {
  name: string;
  photo: string;
  score?: number;
  country: string;
  rank: number;
  stats: string;
}

export interface Match {
  id: number;
  championship: string;
  phase: string;
  status: 'live' | 'upcoming' | 'done';
  date: string;
  venue: string;
  location: string;
  opponents: Opponent[];
  spectators: number;
  likes: number;
  comments: number;
  predictions?: {
    firstPlayer: number;
    secondPlayer: number;
  };
  highlights?: string[];
}
