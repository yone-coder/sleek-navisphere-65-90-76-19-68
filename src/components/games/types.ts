
export interface Game {
  id: number;
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
}

export interface GameState {
  board: (string | null)[][];
  currentPlayer: 'X' | 'O';
  moves: number;
  winner: string | null;
  lastMove: { row: number; col: number } | null;
  timeLeft: { X: number; O: number };
  inactivityTime: number;
  winningLine: {
    positions: number[][];
    color: string;
    angle: number;
    width: string;
  } | null;
}

export interface PlayerInfo {
  name: string;
  symbol: 'X' | 'O';
  isTop: boolean;
  timeLeft: number;
  isCurrentPlayer: boolean;
  inactivityTime?: number;
}

export interface GameSettings {
  boardSize: number;
  zoom: number;
  isTimerRunning: boolean;
  soundEnabled: boolean;
}
