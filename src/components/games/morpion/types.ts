
export interface Position {
  row: number;
  col: number;
  invalid?: boolean;
}

export interface GameHistory {
  board: string[][];
  currentPlayer: 'X' | 'O';
  moves: number;
  lastMove: Position | null;
  timeLeft?: TimeLeft;
  inactivityTime?: number;
}

export interface WinningLine {
  positions: number[][];
  color: string;
  angle: number;
  width: string;
}

export interface TimeLeft {
  X: number;
  O: number;
}

export type GameMode = 'local' | 'bot' | 'online' | 'blitz';
