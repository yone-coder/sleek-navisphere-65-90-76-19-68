
import React, { useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { Button } from "@/components/ui/button";
import { AlertCircle, Copy, RotateCcw, Users } from 'lucide-react';
import { toast } from 'sonner';

// Mockup of socket connection
const mockSocket = {
  emit: (event: string, data?: any) => {
    console.log(`Socket emitted: ${event}`, data);
  },
  // Simulating receiving events
  simulateEvent: (callback: (event: string, data: any) => void) => {
    // This would be replaced with actual Socket.io implementation
  }
};

const ChessGame = () => {
  const [game, setGame] = useState(new Chess());
  const [roomCode, setRoomCode] = useState('');
  const [playerColor, setPlayerColor] = useState<'w' | 'b'>('w');
  const [gameStatus, setGameStatus] = useState('Not connected');
  const [waitingForOpponent, setWaitingForOpponent] = useState(false);
  
  // Function to create a game
  const createGame = () => {
    // Generate a random room code
    const newRoomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    setRoomCode(newRoomCode);
    setPlayerColor('w');
    setWaitingForOpponent(true);
    setGameStatus('Waiting for opponent');
    
    // In a real implementation, this would connect to the server
    mockSocket.emit('createGame', { roomCode: newRoomCode });
    
    toast.success('Game created! Share the room code with your opponent.', {
      position: 'top-center',
    });
  };
  
  // Function to join a game
  const joinGame = () => {
    const code = prompt('Enter room code:');
    if (code) {
      setRoomCode(code);
      setPlayerColor('b');
      setGameStatus('Game started');
      
      // In a real implementation, this would connect to the server
      mockSocket.emit('joinGame', { roomCode: code });
      
      toast.success('Successfully joined the game!', {
        position: 'top-center',
      });
    }
  };
  
  // Function to make a move
  const makeMove = (sourceSquare: string, targetSquare: string) => {
    try {
      // Check if it's this player's turn
      if (game.turn() !== playerColor) {
        toast.error("Not your turn!");
        return false;
      }
      
      // Try to make the move
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q', // Always promote to queen for simplicity
      });
      
      // If the move is invalid
      if (!move) {
        return false;
      }
      
      // Update the game state
      setGame(new Chess(game.fen()));
      
      // In a real implementation, send the move to the server
      mockSocket.emit('move', { roomCode, move });
      
      // Check for game over
      if (game.isGameOver()) {
        if (game.isCheckmate()) {
          setGameStatus(`Checkmate! ${game.turn() === 'w' ? 'Black' : 'White'} wins!`);
        } else if (game.isDraw()) {
          setGameStatus('Game Over - Draw!');
        } else {
          setGameStatus('Game Over!');
        }
      }
      
      return true;
    } catch (error) {
      console.error('Error making move:', error);
      return false;
    }
  };
  
  // Function to reset the game
  const resetGame = () => {
    setGame(new Chess());
    setGameStatus('Game reset');
    toast.info('Game has been reset');
  };
  
  // Function to copy room code
  const copyRoomCode = () => {
    if (roomCode) {
      navigator.clipboard.writeText(roomCode);
      toast.success('Room code copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-16 pb-24">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-4">Chess</h1>
          
          {/* Game status */}
          <div className="mb-4 bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-blue-500" />
                <span className="font-medium">{gameStatus}</span>
              </div>
              
              {roomCode && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Room: <span className="font-semibold">{roomCode}</span></span>
                  <button 
                    onClick={copyRoomCode}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <Copy className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              )}
            </div>
            
            {waitingForOpponent && (
              <div className="mt-2 flex items-center text-amber-600 bg-amber-50 p-2 rounded-md">
                <AlertCircle className="h-4 w-4 mr-2" />
                <span className="text-sm">Waiting for opponent to join with code: <strong>{roomCode}</strong></span>
              </div>
            )}
          </div>
          
          {/* Game controls */}
          {!roomCode && (
            <div className="flex justify-center gap-4 mb-4">
              <Button onClick={createGame} className="bg-blue-600 hover:bg-blue-700">
                Create Game
              </Button>
              <Button onClick={joinGame} variant="outline">
                Join Game
              </Button>
            </div>
          )}
          
          {/* Chessboard */}
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <Chessboard 
              position={game.fen()} 
              onPieceDrop={makeMove}
              boardOrientation={playerColor === 'w' ? 'white' : 'black'}
              customBoardStyle={{
                borderRadius: '4px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
              }}
            />
          </div>
          
          {/* Reset button */}
          <div className="mt-4 flex justify-center">
            <Button 
              onClick={resetGame} 
              variant="outline"
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset Game
            </Button>
          </div>
          
          {/* Game information */}
          <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Game Information</h2>
            <p className="text-gray-700">
              You are playing as {playerColor === 'w' ? 'White' : 'Black'}
            </p>
            <p className="text-gray-700 mt-1">
              Turn: {game.turn() === 'w' ? 'White' : 'Black'}
            </p>
            {game.isCheck() && (
              <p className="text-red-600 font-semibold mt-1">Check!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChessGame;
