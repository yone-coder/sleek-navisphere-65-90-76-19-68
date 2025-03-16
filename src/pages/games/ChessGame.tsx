import React, { useState, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import { Button } from "@/components/ui/button";
import { AlertCircle, Copy } from 'lucide-react';
import { toast } from 'sonner';
import io from 'socket.io-client';

// Connect to the provided backend URL
const socket = io('https://chess-backend-jlvx.onrender.com');

const ChessGame = () => {
  const [roomId, setRoomId] = useState<string | null>(null); // Game room ID
  const [color, setColor] = useState<string | null>(null);   // Player color
  const [fen, setFen] = useState('start');    // Board position
  const [status, setStatus] = useState('waiting'); // Game status
  const [joinId, setJoinId] = useState('');   // Input for room ID

  // Socket.io event listeners
  useEffect(() => {
    socket.on('roomCreated', ({ roomId, color }: { roomId: string, color: string }) => {
      setRoomId(roomId);
      setColor(color);
      setStatus('waiting for opponent');
    });

    socket.on('roomJoined', ({ roomId, color }: { roomId: string, color: string }) => {
      setRoomId(roomId);
      setColor(color);
      setStatus('game started');
    });

    socket.on('gameStart', ({ fen }: { fen: string }) => {
      setFen(fen);
      setStatus('game started');
    });

    socket.on('boardUpdate', ({ fen }: { fen: string }) => {
      setFen(fen);
    });

    socket.on('gameOver', ({ winner }: { winner: string }) => {
      setStatus(`game over, ${winner} wins`);
    });

    socket.on('opponentDisconnected', () => {
      setStatus('opponent disconnected');
    });

    socket.on('error', (message: string) => {
      toast.error(message);
    });

    return () => {
      socket.off('roomCreated');
      socket.off('roomJoined');
      socket.off('gameStart');
      socket.off('boardUpdate');
      socket.off('gameOver');
      socket.off('opponentDisconnected');
      socket.off('error');
    };
  }, []);

  // Create a new game
  const createRoom = () => {
    socket.emit('createRoom');
  };

  // Join an existing game
  const joinRoom = () => {
    if (!joinId) {
      toast.error('Please enter a Room ID');
      return;
    }
    socket.emit('joinRoom', joinId);
  };

  // Handle piece drop
  const onDrop = (sourceSquare: string, targetSquare: string) => {
    if (status !== 'game started') return false;
    const move = { from: sourceSquare, to: targetSquare };
    socket.emit('move', { roomId, move });
    return true;
  };

  // Copy room ID to clipboard
  const copyRoomId = () => {
    if (roomId) {
      navigator.clipboard.writeText(roomId);
      toast.success('Room ID copied to clipboard');
    }
  };

  // Check if it's the player's turn
  const isMyTurn = color && ((color === 'white' && fen.split(' ')[1] === 'w') || (color === 'black' && fen.split(' ')[1] === 'b'));

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-16 pb-24">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-4">Chess Game</h1>
          
          {roomId ? (
            <div>
              <div className="mb-4 bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <p className="text-gray-700">
                    <strong>Status:</strong> {status}
                  </p>
                  <div className="flex items-center gap-2">
                    <p>
                      <strong>Room ID:</strong> {roomId}
                    </p>
                    <button 
                      onClick={copyRoomId}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <Copy className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>
                
                {status === 'waiting for opponent' && (
                  <div className="mt-2 flex items-center text-amber-600 bg-amber-50 p-2 rounded-md">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    <span className="text-sm">Waiting for opponent to join with code: <strong>{roomId}</strong></span>
                  </div>
                )}
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
                <Chessboard
                  position={fen}
                  onPieceDrop={onDrop}
                  boardOrientation={color || 'white'}
                  arePiecesDraggable={Boolean(isMyTurn)}
                  customBoardStyle={{
                    borderRadius: '4px',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
                  }}
                />
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-2">Game Information</h2>
                <p className="text-gray-700">
                  You are playing as: <span className="font-medium">{color}</span>
                </p>
                <p className="text-gray-700 mt-1">
                  Turn: <span className="font-medium">{fen.split(' ')[1] === 'w' ? 'White' : 'Black'}</span>
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-center">Join or Create a Game</h2>
              
              <Button onClick={createRoom} className="w-full mb-4">
                Create New Game
              </Button>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter Room ID"
                  value={joinId}
                  onChange={(e) => setJoinId(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button onClick={joinRoom}>
                  Join Game
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChessGame;
