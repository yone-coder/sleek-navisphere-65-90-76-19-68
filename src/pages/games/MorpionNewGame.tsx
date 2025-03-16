import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

function MorpionNewGame() {
  const [socket, setSocket] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [player, setPlayer] = useState(null);
  const [board, setBoard] = useState(Array(50).fill().map(() => Array(50).fill(null)));
  const [turn, setTurn] = useState('X');
  const [winner, setWinner] = useState(null);
  const [lastMove, setLastMove] = useState(null);
  const [status, setStatus] = useState('Create or Join a Game');
  const [joinRoomId, setJoinRoomId] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // Controls popup visibility
  const [popupMessage, setPopupMessage] = useState(''); // Popup message content

  useEffect(() => {
    const newSocket = io('https://morpion-backend.onrender.com'); // Replace with your backend URL
    setSocket(newSocket);

    newSocket.on('roomCreated', ({ roomId }) => {
      setRoomId(roomId);
      setPlayer('X');
      setStatus('Waiting for opponent...');
      setGameStarted(false);
    });

    newSocket.on('roomJoined', ({ roomId, player }) => {
      setRoomId(roomId);
      setPlayer(player);
    });

    newSocket.on('gameStart', ({ board, turn }) => {
      setBoard(board);
      setTurn(turn);
      setWinner(null);
      setLastMove(null);
      setGameStarted(true);
      setStatus(`Game Started! You are ${player}`);
    });

    newSocket.on('boardUpdate', ({ board, turn, lastMove }) => {
      setBoard(board);
      setTurn(turn);
      setLastMove(lastMove);
    });

    newSocket.on('gameOver', ({ winner, reason }) => {
      setWinner(winner);
      setStatus(`Game Over: ${winner === 'draw' ? 'It\'s a Draw!' : `${winner} Wins by ${reason}`}`);
      setPopupMessage(winner === 'draw' ? "It's a Draw!" : `${winner} Wins!`);
      setShowPopup(true);
      setGameStarted(false);
    });

    newSocket.on('opponentDisconnected', () => {
      setStatus('Opponent Disconnected');
      setPopupMessage('Opponent Disconnected');
      setShowPopup(true);
      setRoomId(null);
      setPlayer(null);
      setBoard(Array(50).fill().map(() => Array(50).fill(null)));
      setTurn('X');
      setWinner(null);
      setLastMove(null);
      setGameStarted(false);
    });

    newSocket.on('error', (message) => {
      setErrorMessage(message);
      setTimeout(() => setErrorMessage(null), 3000);
    });

    return () => newSocket.disconnect();
  }, []);

  const createRoom = () => socket.emit('createRoom');
  const joinRoom = () => joinRoomId ? socket.emit('joinRoom', joinRoomId) : setErrorMessage('Enter a Room ID');
  const makeMove = (x, y) => player === turn && !board[x][y] && !winner && gameStarted && socket.emit('move', { roomId, x, y });
  const resign = () => window.confirm('Are you sure you want to resign?') && socket.emit('resign', roomId);
  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    setErrorMessage('Room ID copied!');
    setTimeout(() => setErrorMessage(null), 2000);
  };

  const resetGame = () => {
    setRoomId(null);
    setPlayer(null);
    setBoard(Array(50).fill().map(() => Array(50).fill(null)));
    setTurn('X');
    setWinner(null);
    setLastMove(null);
    setGameStarted(false);
    setStatus('Create or Join a Game');
    setShowPopup(false);
  };

  const renderCell = (x, y) => {
    const isLastMove = lastMove && lastMove.x === x && lastMove.y === y;
    return (
      <div
        onClick={() => makeMove(x, y)}
        style={{
          width: '20px',
          height: '20px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px',
          fontWeight: 'bold',
          color: board[x][y] === 'X' ? '#ff6b6b' : '#4ecdc4',
          backgroundColor: isLastMove ? 'rgba(255, 215, 0, 0.3)' : board[x][y] ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
          cursor: !board[x][y] && !winner && player === turn && gameStarted ? 'pointer' : 'default',
          transition: 'all 0.3s ease',
        }}
      >
        {board[x][y]}
      </div>
    );
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e1e2f 0%, #2d2d44 100%)',
      color: '#ffffff',
      fontFamily: "'Poppins', sans-serif",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '20px',
        padding: '30px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)',
        maxWidth: '1200px',
        width: '100%',
      }}>
        {errorMessage && (
          <div style={{
            position: 'absolute',
            top: '20px',
            background: 'rgba(255, 75, 75, 0.9)',
            padding: '10px 20px',
            borderRadius: '10px',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
          }}>
            {errorMessage}
          </div>
        )}
        <h1 style={{ fontSize: '36px', fontWeight: '600', marginBottom: '20px', textAlign: 'center', letterSpacing: '1px' }}>
          Morpion: Connect 5
        </h1>
        {!roomId ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <button
              onClick={createRoom}
              style={{
                padding: '15px 30px',
                fontSize: '18px',
                fontWeight: '500',
                background: 'linear-gradient(90deg, #ff6b6b, #ff8e53)',
                border: 'none',
                borderRadius: '50px',
                color: '#fff',
                cursor: 'pointer',
                boxShadow: '0 5px 15px rgba(255, 107, 107, 0.4)',
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              Create New Game
            </button>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <input
                type="text"
                placeholder="Enter Room ID"
                value={joinRoomId}
                onChange={(e) => setJoinRoomId(e.target.value)}
                style={{
                  padding: '15px',
                  fontSize: '16px',
                  borderRadius: '50px',
                  border: 'none',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  width: '250px',
                  outline: 'none',
                  boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.2)',
                }}
              />
              <button
                onClick={joinRoom}
                style={{
                  padding: '15px 30px',
                  fontSize: '18px',
                  fontWeight: '500',
                  background: 'linear-gradient(90deg, #4ecdc4, #45b7d1)',
                  border: 'none',
                  borderRadius: '50px',
                  color: '#fff',
                  cursor: 'pointer',
                  boxShadow: '0 5px 15px rgba(78, 205, 196, 0.4)',
                  transition: 'transform 0.2s ease',
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                Join Game
              </button>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <p style={{ fontSize: '18px', opacity: '0.8' }}>
                Room ID: {roomId}
                <button
                  onClick={copyRoomId}
                  style={{
                    marginLeft: '10px',
                    padding: '5px 15px',
                    fontSize: '14px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    border: 'none',
                    borderRadius: '20px',
                    color: '#fff',
                    cursor: 'pointer',
                    transition: 'background 0.3s ease',
                  }}
                  onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
                  onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
                >
                  Copy
                </button>
              </p>
              <p style={{ fontSize: '18px', fontWeight: '500', color: player === 'X' ? '#ff6b6b' : '#4ecdc4' }}>
                You are: {player}
              </p>
            </div>
            <p style={{ fontSize: '20px', marginBottom: '20px', color: turn === 'X' ? '#ff6b6b' : '#4ecdc4' }}>
              {status}
            </p>
            <div style={{ width: '1000px', height: '1000px', overflow: 'auto', margin: '0 auto', borderRadius: '10px', boxShadow: '0 5px 20px rgba(0, 0, 0, 0.2)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(50, 20px)', gap: '1px', background: 'rgba(255, 255, 255, 0.02)' }}>
                {board.map((row, x) =>
                  row.map((_, y) => (
                    <React.Fragment key={`${x}-${y}`}>
                      {renderCell(x, y)}
                    </React.Fragment>
                  ))
                )}
              </div>
            </div>
            {!winner && gameStarted && (
              <button
                onClick={resign}
                style={{
                  marginTop: '20px',
                  padding: '10px 20px',
                  fontSize: '16px',
                  background: 'linear-gradient(90deg, #ff4757, #ff6b81)',
                  border: 'none',
                  borderRadius: '50px',
                  color: '#fff',
                  cursor: 'pointer',
                  boxShadow: '0 5px 15px rgba(255, 71, 87, 0.4)',
                  transition: 'transform 0.2s ease',
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                Resign
              </button>
            )}
          </div>
        )}
        {showPopup && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }} onClick={resetGame}>
            <div style={{
              backgroundColor: '#2d2d44',
              padding: '40px',
              borderRadius: '20px',
              textAlign: 'center',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
              maxWidth: '400px',
              width: '90%',
            }} onClick={(e) => e.stopPropagation()}>
              <h2 style={{ fontSize: '32px', marginBottom: '20px', color: '#ffffff' }}>
                {popupMessage}
              </h2>
              <button
                onClick={resetGame}
                style={{
                  padding: '15px 30px',
                  fontSize: '18px',
                  fontWeight: '500',
                  background: 'linear-gradient(90deg, #ff6b6b, #ff8e53)',
                  border: 'none',
                  borderRadius: '50px',
                  color: '#fff',
                  cursor: 'pointer',
                  boxShadow: '0 5px 15px rgba(255, 107, 107, 0.4)',
                  transition: 'transform 0.2s ease',
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                Start New Game
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MorpionNewGame;
