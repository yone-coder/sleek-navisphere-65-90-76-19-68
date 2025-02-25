
// Function to check if a cell is within valid range of existing moves
const isValidMove = (board: string[][], row: number, col: number, boardSize: number): boolean => {
  // For the first move after center, check distance from center
  if (board.flat().filter(Boolean).length === 1) {
    const centerRow = Math.floor(boardSize / 2);
    const centerCol = Math.floor(boardSize / 2);
    const rowDiff = Math.abs(row - centerRow);
    const colDiff = Math.abs(col - centerCol);
    return rowDiff <= 3 && colDiff <= 3;
  }

  // For subsequent moves, check proximity to existing moves
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (board[i][j]) {
        const rowDiff = Math.abs(row - i);
        const colDiff = Math.abs(col - j);
        if (rowDiff <= 2 && colDiff <= 2) return true;
      }
    }
  }
  return false;
};

// Check if there's a winner
const checkWinner = (board: string[][], symbol: string, boardSize: number): boolean => {
  // Check for 5 in a row in all directions
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (board[i][j] !== symbol) continue;

      const directions = [
        [0, 1],  // horizontal
        [1, 0],  // vertical
        [1, 1],  // diagonal down-right
        [1, -1], // diagonal down-left
      ];

      for (const [dx, dy] of directions) {
        let count = 1;
        // Check forward
        for (let step = 1; step < 5; step++) {
          const x = i + dx * step;
          const y = j + dy * step;
          if (x < 0 || x >= boardSize || y < 0 || y >= boardSize || board[x][y] !== symbol) break;
          count++;
        }
        // Check backward
        for (let step = 1; step < 5; step++) {
          const x = i - dx * step;
          const y = j - dy * step;
          if (x < 0 || x >= boardSize || y < 0 || y >= boardSize || board[x][y] !== symbol) break;
          count++;
        }
        if (count >= 5) return true;
      }
    }
  }
  return false;
};

// Minimax algorithm with alpha-beta pruning
const minimax = (
  board: string[][],
  depth: number,
  alpha: number,
  beta: number,
  isMaximizing: boolean,
  boardSize: number
): number => {
  // Base cases
  if (checkWinner(board, 'O', boardSize)) return 100 - depth; // Bot wins
  if (checkWinner(board, 'X', boardSize)) return -100 + depth; // Player wins
  if (depth === 0) return 0; // Depth limit reached

  if (isMaximizing) {
    let maxEval = -Infinity;
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        if (!board[i][j] && isValidMove(board, i, j, boardSize)) {
          board[i][j] = 'O';
          const evaluation = minimax(board, depth - 1, alpha, beta, false, boardSize);
          board[i][j] = '';
          maxEval = Math.max(maxEval, evaluation);
          alpha = Math.max(alpha, evaluation);
          if (beta <= alpha) break;
        }
      }
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        if (!board[i][j] && isValidMove(board, i, j, boardSize)) {
          board[i][j] = 'X';
          const evaluation = minimax(board, depth - 1, alpha, beta, true, boardSize);
          board[i][j] = '';
          minEval = Math.min(minEval, evaluation);
          beta = Math.min(beta, evaluation);
          if (beta <= alpha) break;
        }
      }
    }
    return minEval;
  }
};

export const calculateBotMove = (
  board: string[][],
  lastMove: { row: number; col: number } | null,
  boardSize: number,
  difficulty: string
): { row: number; col: number } | null => {
  // For first move, play near the center
  if (!lastMove) {
    const center = Math.floor(boardSize / 2);
    return { row: center, col: center };
  }

  let bestScore = -Infinity;
  let bestMove: { row: number; col: number } | null = null;

  // Set depth based on difficulty
  const maxDepth = difficulty === 'easy' ? 2 : 
                  difficulty === 'medium' ? 3 : 4;

  // Try each possible move
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (!board[i][j] && isValidMove(board, i, j, boardSize)) {
        board[i][j] = 'O';
        const score = minimax(board, maxDepth, -Infinity, Infinity, false, boardSize);
        board[i][j] = '';

        // Add some randomness for easy/medium difficulties
        const randomFactor = difficulty === 'easy' ? Math.random() * 50 : 
                           difficulty === 'medium' ? Math.random() * 25 : 0;
        
        if (score + randomFactor > bestScore) {
          bestScore = score + randomFactor;
          bestMove = { row: i, col: j };
        }
      }
    }
  }

  return bestMove;
};
