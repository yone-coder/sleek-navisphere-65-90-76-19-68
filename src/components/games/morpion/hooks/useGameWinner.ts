
import { useState } from 'react';
import { WinningLine } from '../types';

interface UseGameWinnerProps {
  boardSize: number;
}

export const useGameWinner = ({ boardSize }: UseGameWinnerProps) => {
  const [winner, setWinner] = useState<string | null>(null);
  const [winningLine, setWinningLine] = useState<WinningLine | null>(null);
  const [showWinnerPopup, setShowWinnerPopup] = useState(false);

  const checkWinner = (board: string[][], row: number, col: number) => {
    const directions = [
      [0, 1], // horizontal
      [1, 0], // vertical
      [1, 1], // diagonal down-right
      [1, -1] // diagonal down-left
    ];
    const symbol = board[row][col];

    return directions.some(([dx, dy]) => {
      let count = 1;
      let positions = [[row, col]];

      // Check forward direction
      for (let i = 1; i < 5; i++) {
        const r = row + dx * i;
        const c = col + dy * i;
        if (r < 0 || r >= boardSize || c < 0 || c >= boardSize || board[r][c] !== symbol) break;
        count++;
        positions.push([r, c]);
      }

      // Check backward direction
      for (let i = 1; i < 5; i++) {
        const r = row - dx * i;
        const c = col - dy * i;
        if (r < 0 || r >= boardSize || c < 0 || c >= boardSize || board[r][c] !== symbol) break;
        count++;
        positions.push([r, c]);
      }

      if (count >= 5) {
        positions.sort((a, b) => {
          if (dx === 0) return a[1] - b[1];
          if (dy === 0) return a[0] - b[0];
          return a[0] - b[0];
        });
        
        let angle;
        if (dx === 0) angle = 0;
        else if (dy === 0) angle = Math.PI / 2;
        else if (dx === 1 && dy === 1) angle = Math.PI / 4;
        else angle = -Math.PI / 4;

        const startPos = positions[0];
        const endPos = positions[positions.length - 1];
        const width = Math.sqrt(
          Math.pow((endPos[0] - startPos[0]) * 1.5, 2) + 
          Math.pow((endPos[1] - startPos[1]) * 1.5, 2)
        );

        setWinningLine({
          positions,
          color: symbol === 'X' ? 'black' : 'red',
          angle,
          width: `${width}rem`
        });

        positions.forEach(([r, c]) => {
          board[r][c] = `${symbol}_WIN`;
        });
        return true;
      }
      return false;
    });
  };

  return {
    winner,
    setWinner,
    winningLine,
    showWinnerPopup,
    setShowWinnerPopup,
    checkWinner
  };
};

