
// Constants for players
const HUMAN = 'X';  // Human player
const AI = 'O';     // Bot player

// Function to check if there are moves left in the given area
const isMovesLeft = (board: string[][], centerRow: number, centerCol: number, range: number) => {
  const startRow = Math.max(0, centerRow - range);
  const endRow = Math.min(board.length - 1, centerRow + range);
  const startCol = Math.max(0, centerCol - range);
  const endCol = Math.min(board.length - 1, centerCol + range);

  for (let i = startRow; i <= endRow; i++) {
    for (let j = startCol; j <= endCol; j++) {
      if (!board[i][j]) return true;
    }
  }
  return false;
};

// Function to evaluate the board state
const evaluate = (board: string[][], lastMove: { row: number; col: number }) => {
  const directions = [
    [0, 1],  // horizontal
    [1, 0],  // vertical
    [1, 1],  // diagonal
    [1, -1]  // anti-diagonal
  ];

  for (const [dx, dy] of directions) {
    let count = 1;
    let forward = true;
    let backward = true;
    
    for (let i = 1; i < 5; i++) {
      // Check forward direction
      if (forward) {
        const newRow = lastMove.row + (dx * i);
        const newCol = lastMove.col + (dy * i);
        if (newRow >= 0 && newRow < board.length && 
            newCol >= 0 && newCol < board.length) {
          if (board[newRow][newCol] === board[lastMove.row][lastMove.col]) {
            count++;
          } else {
            forward = false;
          }
        } else {
          forward = false;
        }
      }

      // Check backward direction
      if (backward) {
        const newRow = lastMove.row - (dx * i);
        const newCol = lastMove.col - (dy * i);
        if (newRow >= 0 && newRow < board.length && 
            newCol >= 0 && newCol < board.length) {
          if (board[newRow][newCol] === board[lastMove.row][lastMove.col]) {
            count++;
          } else {
            backward = false;
          }
        } else {
          backward = false;
        }
      }
    }

    if (count >= 5) {
      return board[lastMove.row][lastMove.col] === AI ? 1000 : -1000;
    }
  }

  return 0;
};

// Minimax function with alpha-beta pruning
const minimax = (
  board: string[][],
  depth: number,
  alpha: number,
  beta: number,
  isMax: boolean,
  centerRow: number,
  centerCol: number,
  lastMove: { row: number; col: number } | null
): number => {
  if (depth === 0 || !lastMove) return 0;
  
  const score = evaluate(board, lastMove);
  if (score === 1000 || score === -1000) return score;
  
  if (!isMovesLeft(board, centerRow, centerCol, 3)) return 0;

  if (isMax) {
    let best = -Infinity;
    const range = 3;
    const startRow = Math.max(0, centerRow - range);
    const endRow = Math.min(board.length - 1, centerRow + range);
    const startCol = Math.max(0, centerCol - range);
    const endCol = Math.min(board.length - 1, centerCol + range);

    for (let i = startRow; i <= endRow; i++) {
      for (let j = startCol; j <= endCol; j++) {
        if (!board[i][j]) {
          board[i][j] = AI;
          best = Math.max(best, minimax(board, depth - 1, alpha, beta, false, i, j, { row: i, col: j }));
          board[i][j] = '';
          alpha = Math.max(alpha, best);
          if (beta <= alpha) break;
        }
      }
    }
    return best;
  } else {
    let best = Infinity;
    const range = 3;
    const startRow = Math.max(0, centerRow - range);
    const endRow = Math.min(board.length - 1, centerRow + range);
    const startCol = Math.max(0, centerCol - range);
    const endCol = Math.min(board.length - 1, centerCol + range);

    for (let i = startRow; i <= endRow; i++) {
      for (let j = startCol; j <= endCol; j++) {
        if (!board[i][j]) {
          board[i][j] = HUMAN;
          best = Math.min(best, minimax(board, depth - 1, alpha, beta, true, i, j, { row: i, col: j }));
          board[i][j] = '';
          beta = Math.min(beta, best);
          if (beta <= alpha) break;
        }
      }
    }
    return best;
  }
};

// Function to find the best move
const findBestMove = (
  board: string[][],
  centerRow: number,
  centerCol: number,
  lastMove: { row: number; col: number } | null
): { row: number; col: number } | null => {
  let bestVal = -Infinity;
  let bestMove = null;
  const range = 3;
  const startRow = Math.max(0, centerRow - range);
  const endRow = Math.min(board.length - 1, centerRow + range);
  const startCol = Math.max(0, centerCol - range);
  const endCol = Math.min(board.length - 1, centerCol + range);

  for (let i = startRow; i <= endRow; i++) {
    for (let j = startCol; j <= endCol; j++) {
      if (!board[i][j]) {
        board[i][j] = AI;
        const moveVal = minimax(board, 3, -Infinity, Infinity, false, i, j, { row: i, col: j });
        board[i][j] = '';

        if (moveVal > bestVal) {
          bestVal = moveVal;
          bestMove = { row: i, col: j };
        }
      }
    }
  }

  return bestMove;
};

export const calculateBotMove = (
  board: string[][],
  lastMove: { row: number; col: number } | null,
  boardSize: number,
  difficulty: string
): { row: number; col: number } | null => {
  // If it's the first move, play near the center
  if (!lastMove) {
    const center = Math.floor(boardSize / 2);
    return { row: center, col: center };
  }

  // For hard difficulty, use minimax
  if (difficulty === 'hard') {
    return findBestMove(board, lastMove.row, lastMove.col, lastMove);
  }

  // For easier difficulties, use the existing strategy
  const centerRow = lastMove.row;
  const centerCol = lastMove.col;

  // Function to detect threats
  const detectThreeInARow = (symbol: string): { row: number; col: number } | null => {
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        if (board[i][j]) continue;

        // Check all 8 directions
        const directions = [
          [-1, -1], [-1, 0], [-1, 1],
          [0, -1],           [0, 1],
          [1, -1],  [1, 0],  [1, 1]
        ];

        for (const [dx, dy] of directions) {
          let count = 0;
          let openEnds = 0;

          // Check backward
          let x = i - dx;
          let y = j - dy;
          while (x >= 0 && x < boardSize && y >= 0 && y < boardSize && board[x][y] === symbol) {
            count++;
            x -= dx;
            y -= dy;
          }
          if (x >= 0 && x < boardSize && y >= 0 && y < boardSize && board[x][y] === '') {
            openEnds++;
          }

          // Check forward
          x = i + dx;
          y = j + dy;
          while (x >= 0 && x < boardSize && y >= 0 && y < boardSize && board[x][y] === symbol) {
            count++;
            x += dx;
            y += dy;
          }
          if (x >= 0 && x < boardSize && y >= 0 && y < boardSize && board[x][y] === '') {
            openEnds++;
          }

          if (count >= 3 && openEnds > 0) {
            return { row: i, col: j };
          }
        }
      }
    }
    return null;
  };

  // Check for immediate win
  const checkWin = (symbol: string): { row: number; col: number } | null => {
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        if (!board[i][j]) {
          // Try placing the symbol
          board[i][j] = symbol;
          
          // Check all 8 directions
          const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],           [0, 1],
            [1, -1],  [1, 0],  [1, 1]
          ];

          for (const [dx, dy] of directions) {
            let count = 1;
            
            // Check forward
            let x = i + dx;
            let y = j + dy;
            while (x >= 0 && x < boardSize && y >= 0 && y < boardSize && board[x][y] === symbol) {
              count++;
              x += dx;
              y += dy;
            }

            // Check backward
            x = i - dx;
            y = j - dy;
            while (x >= 0 && x < boardSize && y >= 0 && y < boardSize && board[x][y] === symbol) {
              count++;
              x -= dx;
              y -= dy;
            }

            if (count >= 5) {
              board[i][j] = '';
              return { row: i, col: j };
            }
          }
          
          board[i][j] = '';
        }
      }
    }
    return null;
  };

  // First priority: Check for immediate win
  const winningMove = detectThreeInARow('O');
  if (winningMove) return winningMove;

  // Second priority: Block opponent's win
  const blockingMove = detectThreeInARow('X');
  if (blockingMove) return blockingMove;

  // Get all valid moves with scores
  const validMoves: { row: number; col: number; score: number }[] = [];
  const range = 3;
  const startRow = Math.max(0, centerRow - range);
  const endRow = Math.min(boardSize - 1, centerRow + range);
  const startCol = Math.max(0, centerCol - range);
  const endCol = Math.min(boardSize - 1, centerCol + range);

  for (let i = startRow; i <= endRow; i++) {
    for (let j = startCol; j <= endCol; j++) {
      if (!board[i][j]) {
        let score = 0;
        
        // Position-based scoring
        const distanceFromCenter = Math.abs(i - centerRow) + Math.abs(j - centerCol);
        score += Math.max(0, (6 - distanceFromCenter) * 50);

        // Difficulty adjustments
        const randomFactor = difficulty === 'easy' ? 0.5 : 0.25;
        score += Math.random() * score * randomFactor;

        validMoves.push({ row: i, col: j, score });
      }
    }
  }

  if (validMoves.length === 0) return null;

  // Sort by score and pick the best move
  validMoves.sort((a, b) => b.score - a.score);
  return validMoves[0];
};
