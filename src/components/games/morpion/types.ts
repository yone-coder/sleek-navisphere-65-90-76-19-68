
export interface Position {
  row: number;
  col: number;
}

export interface GameHistory {
  board: string[][];
  currentPlayer: 'X' | 'O';
  moves: number;
  lastMove: Position | null;
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
