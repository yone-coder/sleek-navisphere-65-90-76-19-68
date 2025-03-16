import React, { useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Copy, RefreshCw, Flag, MessageSquare } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

function MorpionNewGame() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [player, setPlayer] = useState<string | null>(null);
  const [board, setBoard] = useState<(string | null)[][]>(Array(50).fill(null).map(() => Array(50).fill(null)));
  const [turn, setTurn] = useState<string>('X');
  const [winner, setWinner] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('Create or join a game');
  const [joinRoomId, setJoinRoomId] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [viewPosition, setViewPosition] = useState({ x: 20, y: 20 }); // Center of the board
  const [zoom, setZoom] = useState<number>(1);

  useEffect(() => {
    const newSocket = io('https://morpion-backend.onrender.com'); // Replace with your Render URL
    setSocket(newSocket);

    newSocket.on('roomCreated', ({ roomId }: { roomId: string }) => {
      setRoomId(roomId);
      setPlayer('X');
      setStatus('Waiting for opponent... Share this Room ID: ' + roomId);
      toast({
        title: "Room created",
        description: `You are playing as X. Share your room ID with a friend to play.`,
      });
    });

    newSocket.on('roomJoined', ({ roomId, player }: { roomId: string, player: string }) => {
      setRoomId(roomId);
      setPlayer(player);
      setStatus(`You are ${player}. Game started.`);
      toast({
        title: "Room joined",
        description: `You are playing as ${player}.`,
      });
    });

    newSocket.on('gameStart', ({ board, turn }: { board: (string | null)[][], turn: string }) => {
      setBoard(board);
      setTurn(turn);
      setWinner(null);
      toast({
        title: "Game started",
        description: "Your opponent has joined. The game has begun!",
      });
    });

    newSocket.on('boardUpdate', ({ board, turn }: { board: (string | null)[][], turn: string }) => {
      setBoard(board);
      setTurn(turn);
    });

    newSocket.on('gameOver', ({ winner }: { winner: string }) => {
      setWinner(winner);
      setStatus(winner === 'draw' ? 'Game over. It\'s a draw.' : `Game over. ${winner} wins.`);
      toast({
        title: "Game over",
        description: winner === 'draw' ? "The game ended in a draw" : `${winner} wins!`,
      });
    });

    newSocket.on('opponentDisconnected', () => {
      setStatus('Opponent disconnected. Game over.');
      toast({
        title: "Opponent disconnected",
        description: "Your opponent has left the game.",
        variant: "destructive",
      });
    });

    newSocket.on('error', (message: string) => {
      setErrorMessage(message);
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      setTimeout(() => setErrorMessage(null), 3000);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const createRoom = () => {
    if (socket) {
      socket.emit('createRoom');
    }
  };

  const joinRoom = () => {
    if (!joinRoomId) {
      toast({
        title: "Error",
        description: "Please enter a Room ID",
        variant: "destructive",
      });
      return;
    }
    if (socket) {
      socket.emit('joinRoom', joinRoomId);
    }
  };

  const makeMove = (x: number, y: number) => {
    if (player === turn && !board[x][y] && !winner && socket) {
      socket.emit('move', { roomId, x, y });
    }
  };

  const copyRoomId = () => {
    if (roomId) {
      navigator.clipboard.writeText(roomId);
      toast({
        title: "Room ID copied",
        description: "The room ID has been copied to your clipboard.",
      });
    }
  };

  const visibleSize = Math.min(15, 50); // Show a 15x15 grid or less
  const halfSize = Math.floor(visibleSize / 2);
  const startX = Math.max(0, Math.min(viewPosition.x - halfSize, 50 - visibleSize));
  const startY = Math.max(0, Math.min(viewPosition.y - halfSize, 50 - visibleSize));
  const endX = Math.min(startX + visibleSize, 50);
  const endY = Math.min(startY + visibleSize, 50);

  const moveView = (dx: number, dy: number) => {
    setViewPosition(prev => ({
      x: Math.max(0, Math.min(prev.x + dx, 49)),
      y: Math.max(0, Math.min(prev.y + dy, 49))
    }));
  };

  const renderCell = (x: number, y: number) => {
    const cellSize = 28 * zoom; // Base size multiplied by zoom
    const isCurrentPlayer = player === turn;
    const isPossibleMove = isCurrentPlayer && !board[x][y] && !winner;
    
    return (
      <div
        key={`cell-${x}-${y}`}
        className={`
          border border-gray-300 flex items-center justify-center
          ${board[x][y] ? (board[x][y] === 'X' ? 'bg-blue-100' : 'bg-red-100') : 'bg-white'}
          ${isPossibleMove ? 'hover:bg-gray-200 cursor-pointer' : 'cursor-default'}
          transition-colors
        `}
        style={{ width: `${cellSize}px`, height: `${cellSize}px` }}
        onClick={() => isPossibleMove && makeMove(x, y)}
      >
        <span className={`text-lg font-bold ${board[x][y] === 'X' ? 'text-blue-600' : 'text-red-600'}`}>
          {board[x][y]}
        </span>
      </div>
    );
  };

  const renderVisibleBoard = () => {
    const visibleRows = [];
    for (let x = startX; x < endX; x++) {
      const row = [];
      for (let y = startY; y < endY; y++) {
        row.push(renderCell(x, y));
      }
      visibleRows.push(
        <div key={`row-${x}`} className="flex">
          {row}
        </div>
      );
    }
    return visibleRows;
  };

  const isMyTurn = player === turn;

  return (
    <div className="container max-w-5xl mx-auto p-4 animate-fade-in">
      <Card className="shadow-lg border-2 border-gray-200">
        <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50">
          <CardTitle className="text-center text-2xl font-bold text-gray-800">
            Morpion New Game
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {!roomId ? (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold">Play Morpion Online</h3>
                <p className="text-gray-600">Create a new game or join an existing one</p>
              </div>
              
              <div className="flex flex-col space-y-4">
                <Button 
                  onClick={createRoom} 
                  className="bg-green-600 hover:bg-green-700 transition-colors w-full"
                >
                  Create New Game
                </Button>
                
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder="Enter Room ID"
                    value={joinRoomId}
                    onChange={(e) => setJoinRoomId(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    onClick={joinRoom}
                    className="bg-blue-600 hover:bg-blue-700 transition-colors"
                  >
                    Join Game
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="font-semibold mr-2">Room:</span>
                  <span className="bg-gray-100 px-2 py-1 rounded">{roomId}</span>
                  <Button variant="ghost" size="sm" onClick={copyRoomId} className="ml-2">
                    <Copy size={16} />
                  </Button>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold mr-2">You are:</span>
                  <Badge className={`${player === 'X' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'} px-2 py-1 rounded-full`}>
                    {player}
                  </Badge>
                </div>
              </div>
              
              <div className="bg-gray-100 p-2 rounded-md text-center">
                <p className={`font-medium ${winner ? 'text-purple-600' : isMyTurn ? 'text-green-600' : 'text-gray-700'}`}>
                  {status}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {!winner && `Current turn: ${turn} ${isMyTurn ? '(your turn)' : ''}`}
                </p>
              </div>
              
              <div className="flex justify-center space-x-4 mb-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => setZoom(prev => Math.max(0.5, prev - 0.1))}
                >
                  Zoom Out
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => setZoom(prev => Math.min(2, prev + 0.1))}
                >
                  Zoom In
                </Button>
              </div>

              <div className="flex justify-center space-x-4">
                <Button size="sm" variant="outline" onClick={() => moveView(0, -5)}>Up</Button>
              </div>
              <div className="flex justify-center space-x-4">
                <Button size="sm" variant="outline" onClick={() => moveView(-5, 0)}>Left</Button>
                <Button size="sm" variant="outline" onClick={() => moveView(5, 0)}>Right</Button>
              </div>
              <div className="flex justify-center space-x-4">
                <Button size="sm" variant="outline" onClick={() => moveView(0, 5)}>Down</Button>
              </div>
              
              <div className="flex justify-center mt-4">
                <div className="border-2 border-gray-300 rounded-md overflow-hidden">
                  {renderVisibleBoard()}
                </div>
              </div>
              
              {winner && (
                <div className="flex justify-center mt-4">
                  <Button onClick={() => window.location.reload()} className="bg-blue-600 hover:bg-blue-700">
                    <RefreshCw className="mr-2 h-4 w-4" /> Play Again
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="bg-gray-50 p-4 text-center text-sm text-gray-600">
          <div className="flex justify-center w-full">
            <MessageSquare className="mr-2 h-4 w-4" /> 
            Play Morpion online with friends. Create a room and share the Room ID to start playing.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default MorpionNewGame;
