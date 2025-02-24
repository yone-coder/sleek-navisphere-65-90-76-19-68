
import { useState } from 'react';
import { Position, GameHistory, TimeLeft } from '../types';

interface UseGameBoardProps {
  boardSize: number;
}

export const useGameBoard = ({ boardSize }: UseGameBoardProps) => {
  const [board, setBoard] = useState<string[][]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [moves, setMoves] = useState(0);
  const [lastMove, setLastMove] = useState<Position | null>(null);
  const [gameHistory, setGameHistory] = useState<GameHistory[]>([]);
  const [hoveredCell, setHoveredCell] = useState<Position | null>(null);

  const isValidSecondMove = (row: number, col: number) => {
    if (moves !== 1) return true;

    const centerRow = Math.floor(boardSize / 2);
    const centerCol = Math.floor(boardSize / 2);

    const rowDiff = Math.abs(row - centerRow);
    const colDiff = Math.abs(col - centerCol);

    return rowDiff <= 3 && colDiff <= 3;
  };

  const resetBoard = () => {
    const newBoard = Array(boardSize).fill(null).map(() => Array(boardSize).fill(null));
    const centerPos = Math.floor(boardSize / 2);
    newBoard[centerPos][centerPos] = 'X';

    setBoard(newBoard);
    setCurrentPlayer('O');
    setMoves(1);
    setLastMove({ row: centerPos, col: centerPos });
    setGameHistory([]);
  };

  const undoMove = () => {
    if (gameHistory.length === 0) return;
    const lastState = gameHistory[gameHistory.length - 1];
    setBoard(lastState.board);
    setCurrentPlayer(lastState.currentPlayer);
    setMoves(lastState.moves);
    setLastMove(lastState.lastMove);
    setGameHistory(gameHistory.slice(0, -1));
    return lastState;
  };

  return {
    board,
    setBoard,
    currentPlayer,
    setCurrentPlayer,
    moves,
    setMoves,
    lastMove,
    setLastMove,
    gameHistory,
    setGameHistory,
    hoveredCell,
    setHoveredCell,
    isValidSecondMove,
    resetBoard,
    undoMove
  };
};

