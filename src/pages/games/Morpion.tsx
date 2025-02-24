
import React from 'react';
import { GameLobby } from '@/components/games/GameLobby';
import { GameSettings } from '@/components/games/morpion/GameSettings';
import { useGameState } from '@/hooks/useGameState';
import { useGameActions } from '@/hooks/useGameActions';
import { useGameRealtime } from '@/hooks/useGameRealtime';

const Morpion = () => {
  const {
    gameRoom,
    setGameRoom,
    board,
    setBoard,
    isMuted,
    setIsMuted,
    showSettings,
    setShowSettings,
    isLoading,
    setIsLoading,
    isCreating,
    setIsCreating,
    isJoining,
    setIsJoining,
    playerSymbol,
    setPlayerSymbol,
    timeLeftX,
    setTimeLeftX,
    timeLeftO,
    setTimeLeftO,
    audioRef
  } = useGameState();

  const { createGame, joinGame, handleCellClick } = useGameActions(
    setGameRoom,
    setBoard,
    setPlayerSymbol,
    setIsCreating,
    setIsJoining,
    audioRef
  );

  useGameRealtime(gameRoom, setGameRoom, setBoard);

  return (
    <div className="container mx-auto px-4 py-8">
      <GameSettings
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
      />
      <GameLobby
        gameRoom={gameRoom}
        board={board}
        playerSymbol={playerSymbol}
        isMuted={isMuted}
        showSettings={showSettings}
        isLoading={isLoading}
        isCreating={isCreating}
        isJoining={isJoining}
        audioRef={audioRef}
        createGame={createGame}
        joinGame={joinGame}
        handleCellClick={(row, col) => handleCellClick(gameRoom!, board, playerSymbol, row, col)}
        setIsMuted={setIsMuted}
        setShowSettings={setShowSettings}
        setIsLoading={setIsLoading}
        setIsCreating={setIsCreating}
        setIsJoining={setIsJoining}
        setTimeLeftX={setTimeLeftX}
        setTimeLeftO={setTimeLeftO}
      />
    </div>
  );
};

export default Morpion;
