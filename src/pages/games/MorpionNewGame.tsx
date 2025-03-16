
import React, { useState, useEffect, useCallback } from 'react';
import io, { Socket } from 'socket.io-client';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Copy, RefreshCw, Flag, MessageSquare, Settings, Maximize, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import GameSettings from "@/components/games/morpion/GameSettings";

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
  const [moveCount, setMoveCount] = useState<number>(0);
  const [chatMessages, setChatMessages] = useState<Array<{player: string, message: string}>>([]);
  const [messageInput, setMessageInput] = useState<string>('');
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [playerTime, setPlayerTime] = useState<{X: number, O: number}>({X: 300, O: 300}); // 5 minutes per player
  const [showChat, setShowChat] = useState<boolean>(false);

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
      setMoveCount(prev => prev + 1);
      
      // Play sound effect
      if (soundEnabled) {
        const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-jump-coin-216.mp3');
        audio.volume = 0.3;
        audio.play().catch(e => console.log('Error playing sound:', e));
      }
    });

    newSocket.on('gameOver', ({ winner }: { winner: string }) => {
      setWinner(winner);
      setStatus(winner === 'draw' ? 'Game over. It\'s a draw.' : `Game over. ${winner} wins.`);
      toast({
        title: "Game over",
        description: winner === 'draw' ? "The game ended in a draw" : `${winner} wins!`,
      });
      
      // Play winning sound
      if (soundEnabled) {
        const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3');
        audio.volume = 0.5;
        audio.play().catch(e => console.log('Error playing sound:', e));
      }
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

    newSocket.on('chatMessage', ({ player, message }: { player: string, message: string }) => {
      setChatMessages(prev => [...prev, { player, message }]);
      if (!showChat) {
        toast({
          title: `Message from ${player}`,
          description: message,
        });
      }
    });

    // Timer effect
    let interval: NodeJS.Timeout | null = null;
    
    if (roomId && !winner && isTimerRunning) {
      interval = setInterval(() => {
        setPlayerTime(prev => ({
          ...prev,
          [turn]: Math.max(0, prev[turn as keyof typeof prev] - 1)
        }));
      }, 1000);
    }

    return () => {
      newSocket.disconnect();
      if (interval) clearInterval(interval);
    };
  }, [turn, isTimerRunning, soundEnabled, winner, roomId, showChat]);

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

  const sendMessage = () => {
    if (messageInput.trim() && socket && roomId) {
      socket.emit('sendMessage', { roomId, player, message: messageInput });
      setChatMessages(prev => [...prev, { player: player || 'Unknown', message: messageInput }]);
      setMessageInput('');
    }
  };

  const resetGame = () => {
    if (socket && roomId && window.confirm('Are you sure you want to reset the game?')) {
      socket.emit('resetGame', { roomId });
      toast({
        title: "Game reset",
        description: "The game has been reset.",
      });
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const moveView = (dx: number, dy: number) => {
    setViewPosition(prev => ({
      x: Math.max(0, Math.min(prev.x + dx, 49)),
      y: Math.max(0, Math.min(prev.y + dy, 49))
    }));
  };

  const visibleSize = Math.min(15, 50); // Show a 15x15 grid or less
  const halfSize = Math.floor(visibleSize / 2);
  const startX = Math.max(0, Math.min(viewPosition.x - halfSize, 50 - visibleSize));
  const startY = Math.max(0, Math.min(viewPosition.y - halfSize, 50 - visibleSize));
  const endX = Math.min(startX + visibleSize, 50);
  const endY = Math.min(startY + visibleSize, 50);

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

  const isMyTurn = player === turn;

  return (
    <div className="container max-w-5xl mx-auto p-4 animate-fade-in">
      <Card className="shadow-lg border-2 border-gray-200">
        <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50">
          <CardTitle className="text-center text-2xl font-bold text-gray-800">
            Morpion Tic-Tac-Toe Connect Five
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

              <div className="mt-8 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-2">How to Play:</h4>
                <ul className="list-disc pl-5 text-yellow-700 space-y-1">
                  <li>Connect five of your marks in a row (horizontally, vertically, or diagonally) to win</li>
                  <li>Take turns placing your mark (X or O) on the board</li>
                  <li>Use the navigation controls to move around the large board</li>
                  <li>Adjust zoom level for better visibility</li>
                </ul>
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
                <Button variant="outline" size="sm" onClick={() => setIsSettingsOpen(true)}>
                  <Settings size={16} className="mr-2" /> Settings
                </Button>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow p-3 text-center">
                  <div className="text-xs uppercase text-gray-500 font-semibold">Current Turn</div>
                  <div className={`font-bold text-lg ${turn === 'X' ? 'text-blue-600' : 'text-red-600'}`}>
                    Player {turn} {isMyTurn ? '(You)' : ''}
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow p-3 text-center">
                  <div className="text-xs uppercase text-gray-500 font-semibold">Status</div>
                  <div className={`font-medium ${winner ? 'text-purple-600' : isMyTurn ? 'text-green-600' : 'text-gray-700'}`}>
                    {status}
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow p-3 text-center">
                  <div className="text-xs uppercase text-gray-500 font-semibold">Time Left</div>
                  <div className="flex justify-center space-x-4 font-mono">
                    <span className="text-blue-600">{formatTime(playerTime.X)}</span>
                    <span>:</span>
                    <span className="text-red-600">{formatTime(playerTime.O)}</span>
                  </div>
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
                  <ZoomOut size={16} className="mr-1" /> Zoom Out
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => setZoom(prev => Math.min(2, prev + 0.1))}
                >
                  <ZoomIn size={16} className="mr-1" /> Zoom In
                </Button>
              </div>

              <div className="flex justify-center space-x-4">
                <Button size="sm" variant="outline" onClick={() => moveView(0, -5)}>
                  <ChevronUp size={16} />
                </Button>
              </div>
              <div className="flex justify-center space-x-4">
                <Button size="sm" variant="outline" onClick={() => moveView(-5, 0)}>
                  <ChevronLeft size={16} />
                </Button>
                <Button size="sm" variant="outline" onClick={() => moveView(5, 0)}>
                  <ChevronRight size={16} />
                </Button>
              </div>
              <div className="flex justify-center space-x-4">
                <Button size="sm" variant="outline" onClick={() => moveView(0, 5)}>
                  <ChevronDown size={16} />
                </Button>
              </div>
              
              <div className="flex justify-center mt-4">
                <div className="border-2 border-gray-300 rounded-md overflow-hidden">
                  {renderVisibleBoard()}
                </div>
              </div>
              
              <div className="flex justify-center space-x-4 mt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setShowChat(!showChat)}
                  className="bg-white"
                >
                  <MessageSquare size={16} className="mr-2" /> 
                  {showChat ? "Hide Chat" : "Show Chat"} 
                </Button>
                
                {!winner && (
                  <Button 
                    onClick={resetGame} 
                    variant="outline"
                    className="text-red-600 border-red-300 hover:bg-red-50"
                  >
                    <RefreshCw size={16} className="mr-2" /> Reset Game
                  </Button>
                )}
                
                {winner && (
                  <Button onClick={() => window.location.reload()} className="bg-blue-600 hover:bg-blue-700">
                    <RefreshCw className="mr-2 h-4 w-4" /> Play Again
                  </Button>
                )}
              </div>
              
              {showChat && (
                <div className="border rounded-lg p-3 mt-4 bg-white">
                  <h3 className="font-semibold mb-2 flex items-center">
                    <MessageSquare size={16} className="mr-2" /> Game Chat
                  </h3>
                  <div className="h-40 overflow-y-auto bg-gray-50 p-2 rounded mb-2">
                    {chatMessages.length === 0 ? (
                      <p className="text-gray-500 text-center text-sm py-2">No messages yet</p>
                    ) : (
                      chatMessages.map((msg, i) => (
                        <div key={i} className={`mb-2 ${msg.player === player ? 'text-right' : ''}`}>
                          <span className={`inline-block rounded-lg px-3 py-1 text-sm ${
                            msg.player === player 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-gray-200 text-gray-800'
                          }`}>
                            <span className="font-semibold">{msg.player}: </span>
                            {msg.message}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Input
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      placeholder="Type a message..."
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={sendMessage}>Send</Button>
                  </div>
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

      {isSettingsOpen && (
        <GameSettings
          isSettingsOpen={isSettingsOpen}
          setIsSettingsOpen={setIsSettingsOpen}
          zoom={zoom}
          setZoom={setZoom}
          isTimerRunning={isTimerRunning}
          setIsTimerRunning={setIsTimerRunning}
          soundEnabled={soundEnabled}
          setSoundEnabled={setSoundEnabled}
        />
      )}
    </div>
  );
}

export default MorpionNewGame;
