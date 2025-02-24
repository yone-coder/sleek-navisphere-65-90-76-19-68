
import React, { useState } from 'react';
import { useGameState } from '@/components/games/morpion/hooks/useGameState';
import GameLayout from '@/components/games/morpion/GameLayout';

const Morpion = () => {
  const [boardSize, setBoardSize] = useState(30);
  const [zoom, setZoom] = useState(100);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [player1] = useState('Guest10816');
  const [player2] = useState('Guest');

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

export default Morpion;
