
export const calculateBotMove = (
  board: string[][],
  lastMove: { row: number; col: number } | null,
  boardSize: number,
  difficulty: string
): { row: number; col: number } | null => {
  if (!lastMove) {
    // First move: Always play center for optimal strategy
    const center = Math.floor(boardSize / 2);
    return { row: center, col: center };
  }

  // Minimax with alpha-beta pruning
  let bestScore = -Infinity;
  let bestMove: { row: number; col: number } | null = null;

  // Helper function to evaluate board state
  const evaluateBoard = (board: string[][], depth: number): number => {
    // Check for wins in all directions from each position
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        if (!board[i][j]) continue;

        const directions = [
          [1, 0], [0, 1], [1, 1], [1, -1]
        ];

        for (const [dx, dy] of directions) {
          let count = 1;
          let x = i + dx;
          let y = j + dy;
          
          // Count in forward direction
          while (x >= 0 && x < boardSize && y >= 0 && y < boardSize && board[x][y] === board[i][j]) {
            count++;
            x += dx;
            y += dy;
          }
          
          // Count in backward direction
          x = i - dx;
          y = j - dy;
          while (x >= 0 && x < boardSize && y >= 0 && y < boardSize && board[x][y] === board[i][j]) {
            count++;
            x -= dx;
            y -= dy;
          }

          if (count >= 5) {
            return board[i][j] === 'O' ? 1000 - depth : depth - 1000;
          }
        }
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
    isMaximizing: boolean
  ): number => {
    const evaluation = evaluateBoard(board, depth);
    if (evaluation !== 0) return evaluation;
    if (depth >= 6) return 0; // Limit depth for performance

    if (isMaximizing) {
      let maxEvaluation = -Infinity;
      for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
          if (!board[i][j] && isValidMove(i, j, board)) {
            board[i][j] = 'O';
            const evaluation = minimax(board, depth + 1, alpha, beta, false);
            board[i][j] = '';
            maxEvaluation = Math.max(maxEvaluation, evaluation);
            alpha = Math.max(alpha, evaluation);
            if (beta <= alpha) break;
          }
        }
      }
      return maxEvaluation;
    } else {
      let minEvaluation = Infinity;
      for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
          if (!board[i][j] && isValidMove(i, j, board)) {
            board[i][j] = 'X';
            const evaluation = minimax(board, depth + 1, alpha, beta, true);
            board[i][j] = '';
            minEvaluation = Math.min(minEvaluation, evaluation);
            beta = Math.min(beta, evaluation);
            if (beta <= alpha) break;
          }
        }
      }
      return minEvaluation;
    }
  };

  // Helper to check if a move is valid based on proximity to existing moves
  const isValidMove = (row: number, col: number, board: string[][]): boolean => {
    // First few moves should be near the center
    if (countMoves(board) < 3) {
      const center = Math.floor(boardSize / 2);
      const rowDiff = Math.abs(row - center);
      const colDiff = Math.abs(col - center);
      return rowDiff <= 3 && colDiff <= 3;
    }

    // After that, moves should be adjacent to existing ones
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],          [0, 1],
      [1, -1],  [1, 0],  [1, 1]
    ];

    for (const [dx, dy] of directions) {
      const newRow = row + dx;
      const newCol = col + dy;
      if (
        newRow >= 0 && newRow < boardSize &&
        newCol >= 0 && newCol < boardSize &&
        board[newRow][newCol]
      ) {
        return true;
      }
    }
    return false;
  };

  // Helper to count total moves on board
  const countMoves = (board: string[][]): number => {
    return board.flat().filter(Boolean).length;
  };

  // Find best move using minimax
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (!board[i][j] && isValidMove(i, j, board)) {
        board[i][j] = 'O';
        const score = minimax(board, 0, -Infinity, Infinity, false);
        board[i][j] = '';

        if (score > bestScore) {
          bestScore = score;
          bestMove = { row: i, col: j };
        }
      }
    }
  }

  // If no move found (shouldn't happen), play near last move
  if (!bestMove && lastMove) {
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],          [0, 1],
      [1, -1],  [1, 0],  [1, 1]
    ];

    for (const [dx, dy] of directions) {
      const newRow = lastMove.row + dx;
      const newCol = lastMove.col + dy;
      if (
        newRow >= 0 && newRow < boardSize &&
        newCol >= 0 && newCol < boardSize &&
        !board[newRow][newCol]
      ) {
        return { row: newRow, col: newCol };
      }
    }
  }

  return bestMove;
};
