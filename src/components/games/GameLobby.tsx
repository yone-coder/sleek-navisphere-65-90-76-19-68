
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';

interface GameLobbyProps {
  onJoinGame: (gameId: string, playerId: string) => void;
}

export const GameLobby: React.FC<GameLobbyProps> = ({ onJoinGame }) => {
  const [gameCode, setGameCode] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const { toast } = useToast();

  const generateGameCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const createGame = async () => {
    try {
      setIsCreating(true);
      const newGameCode = generateGameCode();
      const playerId = Math.random().toString(36).substring(2, 15);
      
      const { data, error } = await supabase
        .from('game_rooms')
        .insert([{
          code: newGameCode,
          status: 'waiting',
          player1_id: playerId,
          current_player: 'X',
          board: Array(30).fill(null).map(() => Array(30).fill(null)),
          time_left_x: 300,
          time_left_o: 300
        }])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Game room created!",
        description: `Your game code is: ${newGameCode}`,
      });

      onJoinGame(data.id, playerId);
    } catch (error) {
      toast({
        title: "Error creating game",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const joinGame = async () => {
    if (!gameCode) {
      toast({
        title: "Game code required",
        description: "Please enter a game code to join",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsJoining(true);
      const playerId = Math.random().toString(36).substring(2, 15);

      const { data, error } = await supabase
        .from('game_rooms')
        .select()
        .eq('code', gameCode.toUpperCase())
        .eq('status', 'waiting')
        .single();

      if (error || !data) {
        toast({
          title: "Game not found",
          description: "Please check the game code and try again",
          variant: "destructive",
        });
        return;
      }

      const { error: updateError } = await supabase
        .from('game_rooms')
        .update({
          player2_id: playerId,
          status: 'playing'
        })
        .eq('id', data.id);

      if (updateError) throw updateError;

      toast({
        title: "Joined game!",
        description: "The game will start shortly",
      });

      onJoinGame(data.id, playerId);
    } catch (error) {
      toast({
        title: "Error joining game",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Gomoku Online
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
              value={gameCode}
              onChange={(e) => setGameCode(e.target.value)}
              className="w-full"
              maxLength={6}
            />
            <Button
              onClick={joinGame}
              disabled={isJoining || !gameCode}
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
