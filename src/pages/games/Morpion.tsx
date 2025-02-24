
import React, { useState } from 'react';
import { useGameState } from '@/components/games/morpion/hooks/useGameState';
import GameLayout from '@/components/games/morpion/GameLayout';
import GameMenu from '@/components/games/morpion/GameMenu';
import { GameMode } from '@/components/games/morpion/types';

const DummyGameState = {
  board: [],
  currentPlayer: 'X',
  moves: 0,
  winner: null,
  lastMove: null,
  gameHistory: [],
  soundEnabled: true,
  timeLeft: { X: 300, O: 300 },
  isTimerRunning: false,
  inactivityTime: 15,
  winningLine: null,
  showWinnerPopup: false,
  hoveredCell: null,
  setSoundEnabled: () => {},
  setIsTimerRunning: () => {},
  setShowWinnerPopup: () => {},
  setHoveredCell: () => {},
  handleClick: () => {},
  undoMove: () => {},
  resetGame: () => {},
  isValidSecondMove: () => false
};

const Morpion = () => {
  const [boardSize, setBoardSize] = useState(30);
  const [zoom, setZoom] = useState(100);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [player1] = useState('Guest10816');
  const [player2] = useState('Guest');
  const [gameStarted, setGameStarted] = useState(false);
  const [gameMode, setGameMode] = useState<GameMode | null>(null);

  // Use dummy state when game hasn't started
  const gameState = !gameStarted ? DummyGameState : useGameState({
    boardSize,
    player1,
    player2
  });

  const handleSelectMode = (mode: GameMode, roomId?: string) => {
    setGameMode(mode);
    setGameStarted(true);
    // Here we would handle different game modes
    console.log(`Starting game in ${mode} mode${roomId ? ` with room ${roomId}` : ''}`);
  };

  // Show menu if game hasn't started
  if (!gameStarted) {
    return <GameMenu onSelectMode={handleSelectMode} />;
  }

  return (
    <GameLayout
      player1={player1}
      player2={player2}
      boardSize={boardSize}
      zoom={zoom}
      isSettingsOpen={isSettingsOpen}
      setZoom={setZoom}
      setIsSettingsOpen={setIsSettingsOpen}
      {...gameState}
    />
  );
};

export default Morpion;
