
import React, { useState, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import io from 'socket.io-client';

// Backend URL set to your Render deployment
const BACKEND_URL = 'https://chess-backend-jlvx.onrender.com';
const socket = io(BACKEND_URL);

function ChessGame() {
  const [roomId, setRoomId] = useState<string | null>(null);           // Current room ID
  const [color, setColor] = useState<'white' | 'black' | null>(null);  // Player's color (white/black)
  const [fen, setFen] = useState('start');                             // Chessboard position (FEN)
  const [gameStatus, setGameStatus] = useState<string | null>(null);   // null, 'waitingForOpponent', 'playing', 'gameOver', 'opponentDisconnected'
  const [turn, setTurn] = useState('white');                           // Current turn
  const [result, setResult] = useState<string | null>(null);           // Game result: null, 'white wins', 'black wins', 'draw'
  const [lastMove, setLastMove] = useState<{ from: string; to: string } | null>(null); // Last move for highlighting
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Error messages
  const [joinId, setJoinId] = useState('');                            // Input for joining a room

  // Set up Socket.io listeners
  useEffect(() => {
    socket.on('roomCreated', ({ roomId, color }: { roomId: string, color: 'white' | 'black' }) => {
      setRoomId(roomId);
      setColor(color);
      setGameStatus('waitingForOpponent');
    });

    socket.on('roomJoined', ({ roomId, color }: { roomId: string, color: 'white' | 'black' }) => {
      setRoomId(roomId);
      setColor(color);
      // Wait for gameStart to set 'playing'
    });

    socket.on('gameStart', ({ fen }: { fen: string }) => {
      setFen(fen);
      setTurn(fen.split(' ')[1] === 'w' ? 'white' : 'black');
      setGameStatus('playing');
    });

    socket.on('boardUpdate', ({ fen, lastMove }: { fen: string, lastMove: { from: string; to: string } }) => {
      setFen(fen);
      setTurn(fen.split(' ')[1] === 'w' ? 'white' : 'black');
      setLastMove(lastMove);
    });

    socket.on('gameOver', ({ winner, result, reason }: { winner: string, result: string, reason?: string }) => {
      if (result === 'draw') {
        setResult('draw');
      } else {
        setResult(`${winner} wins${reason ? ` by ${reason}` : ''}`);
      }
      setGameStatus('gameOver');
    });

    socket.on('opponentDisconnected', () => {
      setGameStatus('opponentDisconnected');
    });

    socket.on('error', (message: string) => {
      setErrorMessage(message);
      setTimeout(() => setErrorMessage(null), 3000);
    });

    socket.on('invalidMove', () => {
      setErrorMessage('Invalid move');
      setTimeout(() => setErrorMessage(null), 3000);
    });

    // Cleanup listeners on unmount
    return () => {
      socket.off('roomCreated');
      socket.off('roomJoined');
      socket.off('gameStart');
      socket.off('boardUpdate');
      socket.off('gameOver');
      socket.off('opponentDisconnected');
      socket.off('error');
      socket.off('invalidMove');
    };
  }, []);

  // Create a new game room
  const createRoom = () => {
    socket.emit('createRoom');
  };

  // Join an existing game room
  const joinRoom = () => {
    if (!joinId) {
      setErrorMessage('Please enter a Room ID');
      setTimeout(() => setErrorMessage(null), 3000);
      return;
    }
    socket.emit('joinRoom', joinId);
  };

  // Handle piece movement
  const onDrop = (sourceSquare: string, targetSquare: string) => {
    if (gameStatus !== 'playing') return false;
    const move = { from: sourceSquare, to: targetSquare };
    socket.emit('move', { roomId, move });
    return true; // Optimistic update; server will validate
  };

  // Resign from the game
  const resign = () => {
    if (window.confirm('Are you sure you want to resign?')) {
      socket.emit('resign', roomId);
    }
  };

  // Determine if it's the player's turn
  const isMyTurn = color && turn === color;

  // Highlight the last move
  const squareStyles = lastMove
    ? {
        [lastMove.from]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' },
        [lastMove.to]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' },
      }
    : {};

  // Inline styles for basic layout and responsiveness
  const containerStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  };

  const buttonStyle = {
    padding: '10px 20px',
    margin: '5px',
    cursor: 'pointer',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
  };

  const errorStyle = {
    color: 'red',
    marginBottom: '10px',
    textAlign: 'center',
  };

  return (
    <div style={containerStyle}>
      {errorMessage && <div style={errorStyle}>{errorMessage}</div>}
      {!roomId ? (
        <div>
          <button style={buttonStyle} onClick={createRoom}>
            Create New Game
          </button>
          <div style={{ marginTop: '10px' }}>
            <input
              type="text"
              placeholder="Enter Room ID"
              value={joinId}
              onChange={(e) => setJoinId(e.target.value)}
              style={{ padding: '8px', marginRight: '10px', borderRadius: '4px' }}
            />
            <button style={buttonStyle} onClick={joinRoom}>
              Join Game
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p>
            <strong>Room ID:</strong> {roomId}
          </p>
          <p>
            <strong>You are:</strong> {color}
          </p>
          {gameStatus === 'waitingForOpponent' && (
            <p>Waiting for opponent to join...</p>
          )}
          {gameStatus === 'playing' && <p>It's {turn}'s turn</p>}
          {gameStatus === 'gameOver' && <p>Game over: {result}</p>}
          {gameStatus === 'opponentDisconnected' && (
            <p>Opponent disconnected. Game over.</p>
          )}
          {gameStatus === 'playing' && (
            <Chessboard
              position={fen}
              onPieceDrop={onDrop}
              boardOrientation={color as 'white' | 'black'}
              arePiecesDraggable={Boolean(isMyTurn)}
              customSquareStyles={squareStyles}
            />
          )}
          {gameStatus === 'playing' && (
            <button style={{ ...buttonStyle, backgroundColor: '#f44336' }} onClick={resign}>
              Resign
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default ChessGame;
