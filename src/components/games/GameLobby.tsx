
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';
import type { GameRoom } from '@/types/game';

export interface GameLobbyProps {
  onJoinGame?: (gameId: string, playerId: string) => void;
  gameRoom: GameRoom | null;
  board: string[][];
  playerSymbol: 'X' | 'O' | null;
  isMuted: boolean;
  showSettings: boolean;
  isLoading: boolean;
  isCreating: boolean;
  isJoining: boolean;
  audioRef: React.RefObject<HTMLAudioElement>;
  createGame: () => Promise<void>;
  joinGame: (code: string) => Promise<void>;
  handleCellClick: (row: number, col: number) => Promise<void>;
  setIsMuted: (value: boolean) => void;
  setShowSettings: (value: boolean) => void;
  setIsLoading: (value: boolean) => void;
  setIsCreating: (value: boolean) => void;
  setIsJoining: (value: boolean) => void;
  setTimeLeftX: (value: number | null) => void;
  setTimeLeftO: (value: number | null) => void;
}

export const GameLobby: React.FC<GameLobbyProps> = ({
  gameRoom,
  board,
  playerSymbol,
  isMuted,
  showSettings,
  isLoading,
  isCreating,
  isJoining,
  audioRef,
  createGame,
  joinGame,
  handleCellClick,
  setIsMuted,
  setShowSettings,
  setIsLoading,
  setIsCreating,
  setIsJoining,
  setTimeLeftX,
  setTimeLeftO
}) => {
  const { toast } = useToast();
  const [joinCode, setJoinCode] = React.useState('');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Morpion Online
        </h1>
        
        <div className="space-y-4">
          <Button
            onClick={createGame}
            disabled={isCreating}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90"
          >
            {isCreating ? "Creating game..." : "Create New Game"}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or join existing game</span>
            </div>
          </div>

          <div className="space-y-2">
            <Input
              placeholder="Enter game code"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
              className="w-full"
              maxLength={6}
            />
            <Button
              onClick={() => joinGame(joinCode)}
              disabled={isJoining || !joinCode}
              className="w-full bg-blue-500 hover:bg-blue-600"
            >
              {isJoining ? "Joining game..." : "Join Game"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
