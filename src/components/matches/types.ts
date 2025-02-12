
export interface Opponent {
  name: string;
  photo: string;
  score?: number;
  country: string;
  city: string;
  rank: number;
  stats: string;
  wins: number;
  losses: number;
}

export interface Match {
  id: number;
  championship: string;
  phase: string;
  status: 'live' | 'upcoming' | 'done';
  date: string;
  time: string;
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
}
