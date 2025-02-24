
import React, { useState } from 'react';
import { useGameState } from '@/components/games/morpion/hooks/useGameState';
import GameLayout from '@/components/games/morpion/GameLayout';
import GameMenu from '@/components/games/morpion/GameMenu';
import { GameMode } from '@/components/games/morpion/types';

const Morpion = () => {
  const [boardSize, setBoardSize] = useState(30);
  const [zoom, setZoom] = useState(100);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [player1] = useState('Guest10816');
  const [player2] = useState('Guest');
  const [gameStarted, setGameStarted] = useState(false);
  const [gameMode, setGameMode] = useState<GameMode | null>(null);

  // Only initialize game state when the game has started
  const gameState = gameStarted ? useGameState({
    boardSize,
    player1,
    player2
  }) : null;

  const handleSelectMode = (mode: GameMode, roomId?: string) => {
    setGameMode(mode);
    setGameStarted(true);
    // Here we would handle different game modes
    console.log(`Starting game in ${mode} mode${roomId ? ` with room ${roomId}` : ''}`);
  };

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
      {...gameState!}
    />
  );
};

export default Morpion;
