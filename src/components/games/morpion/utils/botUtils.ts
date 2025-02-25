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

  // If it's easy mode, keep the old simpler logic
  if (difficulty === 'easy') {
    return calculateSimpleMove(board, boardSize);
  }

  // For medium and hard modes, use minimax with different depths
  const maxDepth = difficulty === 'medium' ? 3 : 5;
  let bestScore = -Infinity;
  let bestMove: { row: number; col: number } | null = null;

  // Consider only moves within a reasonable distance from existing pieces
  const validPositions = getValidPositions(board, boardSize);

  for (const position of validPositions) {
    const { row, col } = position;
    if (!board[row][col]) {
      board[row][col] = 'O';
      const score = minimax(board, maxDepth, -Infinity, Infinity, false, boardSize);
      board[row][col] = '';

      if (score > bestScore) {
        bestScore = score;
        bestMove = { row, col };
      }
    }
  }

  return bestMove;
};

const calculateSimpleMove = (board: string[][], boardSize: number) => {
  const validMoves = [];
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (!board[i][j]) {
        validMoves.push({ row: i, col: j });
      }
    }
  }
  if (validMoves.length === 0) return null;
  return validMoves[Math.floor(Math.random() * validMoves.length)];
};

const getValidPositions = (board: string[][], boardSize: number) => {
  const positions = [];
  const existingMoves = new Set<string>();

  // First, collect all existing moves
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (board[i][j]) {
        existingMoves.add(`${i},${j}`);
        // Add adjacent positions
        for (let di = -2; di <= 2; di++) {
          for (let dj = -2; dj <= 2; dj++) {
            const newI = i + di;
            const newJ = j + dj;
            if (
              newI >= 0 && newI < boardSize &&
              newJ >= 0 && newJ < boardSize &&
              !board[newI][newJ]
            ) {
              positions.push({ row: newI, col: newJ });
            }
          }
        }
      }
    }
  }

  // Remove duplicates and return unique positions
  return Array.from(new Set(positions.map(p => JSON.stringify(p))))
    .map(p => JSON.parse(p));
};

const evaluateBoard = (board: string[][], boardSize: number): number => {
  // Check all possible winning lines
  const directions = [
    [0, 1], // horizontal
    [1, 0], // vertical
    [1, 1], // diagonal down-right
    [1, -1] // diagonal down-left
  ];

  let maxBotScore = 0;
  let maxPlayerScore = 0;

  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      for (const [dx, dy] of directions) {
        let botCount = 0;
        let playerCount = 0;
        let empty = 0;

        // Look ahead up to 5 positions
        for (let step = 0; step < 5; step++) {
          const x = i + dx * step;
          const y = j + dy * step;

          if (x >= 0 && x < boardSize && y >= 0 && y < boardSize) {
            if (board[x][y] === 'O') botCount++;
            else if (board[x][y] === 'X') playerCount++;
            else empty++;
          }
        }

        // Update scores based on consecutive pieces
        if (playerCount === 0) {
          if (botCount === 5) return 10000; // Winning position
          if (botCount === 4 && empty === 1) maxBotScore = Math.max(maxBotScore, 1000);
          if (botCount === 3 && empty === 2) maxBotScore = Math.max(maxBotScore, 100);
        }

        if (botCount === 0) {
          if (playerCount === 5) return -10000; // Losing position
          if (playerCount === 4 && empty === 1) maxPlayerScore = Math.max(maxPlayerScore, 800);
          if (playerCount === 3 && empty === 2) maxPlayerScore = Math.max(maxPlayerScore, 80);
        }
      }
    }
  }

  return maxBotScore - maxPlayerScore;
};

const minimax = (
  board: string[][],
  depth: number,
  alpha: number,
  beta: number,
  isMaximizing: boolean,
  boardSize: number
): number => {
  // Base cases
  const score = evaluateBoard(board, boardSize);
  if (Math.abs(score) >= 10000 || depth === 0) {
    return score;
  }

  if (isMaximizing) {
    let maxScore = -Infinity;
    const validPositions = getValidPositions(board, boardSize);

    for (const position of validPositions) {
      const { row, col } = position;
      if (!board[row][col]) {
        board[row][col] = 'O';
        const score = minimax(board, depth - 1, alpha, beta, false, boardSize);
        board[row][col] = '';
        maxScore = Math.max(maxScore, score);
        alpha = Math.max(alpha, score);
        if (beta <= alpha) break;
      }
    }
    return maxScore;
  } else {
    let minScore = Infinity;
    const validPositions = getValidPositions(board, boardSize);

    for (const position of validPositions) {
      const { row, col } = position;
      if (!board[row][col]) {
        board[row][col] = 'X';
        const score = minimax(board, depth - 1, alpha, beta, true, boardSize);
        board[row][col] = '';
        minScore = Math.min(minScore, score);
        beta = Math.min(beta, score);
        if (beta <= alpha) break;
      }
    }
    return minScore;
  }
};
