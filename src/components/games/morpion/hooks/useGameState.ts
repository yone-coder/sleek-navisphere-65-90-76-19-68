
import { useState } from 'react';
import { Position, TimeLeft, WinningLine, GameHistory } from '../types';
import { useGameBoard } from './useGameBoard';
import { useGameTimer } from './useGameTimer';
import { useGameWinner } from './useGameWinner';
import { useGameAudio } from './useGameAudio';

interface UseGameStateProps {
  boardSize: number;
  player1: string;
  player2: string;
}

export const useGameState = ({ boardSize }: UseGameStateProps) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const {
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
  } = useGameBoard({ boardSize });

  const {
    winner,
    setWinner,
    winningLine,
    setWinningLine,
    showWinnerPopup,
    setShowWinnerPopup,
    checkWinner
  } = useGameWinner({ boardSize });

  const {
    timeLeft,
    setTimeLeft,
    isTimerRunning,
    setIsTimerRunning,
    inactivityTime,
    setInactivityTime,
    resetTimer
  } = useGameTimer(currentPlayer, winner);

  const { playMoveSound, playWinSound } = useGameAudio(soundEnabled, inactivityTime, winner);

  const vibrate = (pattern: number | number[]) => {
    try {
      // Check if vibration is supported and available
      if ('vibrate' in navigator) {
        navigator.vibrate(pattern);
      }
    } catch (error) {
      console.log('Vibration not supported');
    }
  };

  const handleClick = (row: number, col: number) => {
    if (board[row][col] || winner || !isTimerRunning) return;

    if (!isValidSecondMove(row, col)) {
      setHoveredCell({ row, col, invalid: true });
      setTimeout(() => setHoveredCell(null), 500);
      return;
    }

    // Vibrate immediately when a valid move is made
    vibrate(40);

    const newBoard = JSON.parse(JSON.stringify(board));
    newBoard[row][col] = currentPlayer;

    playMoveSound(currentPlayer);

    setGameHistory([...gameHistory, {
      board: JSON.parse(JSON.stringify(board)),
      currentPlayer,
      moves,
      lastMove,
      timeLeft: { ...timeLeft },
      inactivityTime
    }]);

    setBoard(newBoard);
    setLastMove({ row, col });
    setMoves(moves + 1);
    setInactivityTime(15);

    if (checkWinner(newBoard, row, col)) {
      playWinSound();
      // Victory vibration pattern
      vibrate([50, 50, 100]);
      setWinner(currentPlayer);
      setTimeout(() => {
        setShowWinnerPopup(true);
      }, 1500);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const resetGame = () => {
    resetBoard();
    setWinner(null);
    setWinningLine(null);
    resetTimer();
    setShowWinnerPopup(false);
  };

  return {
    board,
    currentPlayer,
    moves,
    winner,
    lastMove,
    gameHistory,
    soundEnabled,
    timeLeft,
    isTimerRunning,
    inactivityTime,
    winningLine,
    showWinnerPopup,
    hoveredCell,
    setSoundEnabled,
    setIsTimerRunning,
    setShowWinnerPopup,
    setHoveredCell,
    handleClick,
    undoMove,
    resetGame,
    isValidSecondMove
  };
};
