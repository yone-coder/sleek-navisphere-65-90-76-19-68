
import React, { useState, useMemo } from 'react';
import { useGameState } from '@/components/games/morpion/hooks/useGameState';
import GameLayout from '@/components/games/morpion/GameLayout';
import GameMenu from '@/components/games/morpion/GameMenu';
import { GameMode } from '@/components/games/morpion/types';

const GameComponent = ({ 
  boardSize,
  zoom,
  isSettingsOpen,
  player1,
  player2,
  setZoom,
  setIsSettingsOpen
}) => {
  const gameState = useGameState({
    boardSize,
    player1,
    player2
  });

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

const Morpion = () => {
  const [boardSize, setBoardSize] = useState(30);
  const [zoom, setZoom] = useState(100);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [player1] = useState('Guest10816');
  const [player2] = useState('Guest');
  const [gameStarted, setGameStarted] = useState(false);
  const [gameMode, setGameMode] = useState<GameMode | null>(null);

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
    <GameComponent
      boardSize={boardSize}
      zoom={zoom}
      isSettingsOpen={isSettingsOpen}
      player1={player1}
      player2={player2}
      setZoom={setZoom}
      setIsSettingsOpen={setIsSettingsOpen}
    />
  );
};

export default Morpion;
