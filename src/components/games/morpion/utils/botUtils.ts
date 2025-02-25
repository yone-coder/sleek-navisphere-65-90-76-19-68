
// Constants for players
const HUMAN = 'X';
const AI = 'O';

// Evaluate position scores for better moves
const evaluatePosition = (board: string[][], pos: { row: number; col: number }, symbol: string) => {
  const directions = [
    [0, 1],  // horizontal
    [1, 0],  // vertical
    [1, 1],  // diagonal
    [1, -1]  // anti-diagonal
  ];
  
  let maxCount = 0;
  
  for (const [dx, dy] of directions) {
    let count = 1;
    let spaces = 0;
    
    // Check forward
    for (let i = 1; i < 5; i++) {
      const newRow = pos.row + (dx * i);
      const newCol = pos.col + (dy * i);
      if (newRow < 0 || newRow >= board.length || newCol < 0 || newCol >= board.length) break;
      if (board[newRow][newCol] === '') spaces++;
      if (board[newRow][newCol] === symbol) count++;
      else if (board[newRow][newCol] !== '') break;
    }
    
    // Check backward
    for (let i = 1; i < 5; i++) {
      const newRow = pos.row - (dx * i);
      const newCol = pos.col - (dy * i);
      if (newRow < 0 || newRow >= board.length || newCol < 0 || newCol >= board.length) break;
      if (board[newRow][newCol] === '') spaces++;
      if (board[newRow][newCol] === symbol) count++;
      else if (board[newRow][newCol] !== '') break;
    }
    
    maxCount = Math.max(maxCount, count);
  }
  
  return maxCount;
};

// Check if a move is within valid range of existing moves
const isValidMove = (board: string[][], row: number, col: number, range: number = 2) => {
  for (let i = Math.max(0, row - range); i <= Math.min(board.length - 1, row + range); i++) {
    for (let j = Math.max(0, col - range); j <= Math.min(board.length - 1, col + range); j++) {
      if (board[i][j]) return true;
    }
  }
  return false;
};

export const calculateBotMove = (
  board: string[][],
  lastMove: { row: number; col: number } | null,
  boardSize: number,
  difficulty: string
): { row: number; col: number } | null => {
  const validMoves: { row: number; col: number; score: number }[] = [];
  
  // If no last move, play near the center
  if (!lastMove) {
    const center = Math.floor(boardSize / 2);
    return { row: center, col: center };
  }

  // Search for valid moves around existing pieces
  const searchRange = 3;
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (!board[i][j] && isValidMove(board, i, j)) {
        // Try the move
        board[i][j] = AI;
        const aiScore = evaluatePosition(board, { row: i, col: j }, AI);
        board[i][j] = '';
        
        // Check opponent's potential score at this position
        board[i][j] = HUMAN;
        const humanScore = evaluatePosition(board, { row: i, col: j }, HUMAN);
        board[i][j] = '';

        let score = aiScore * 10;
        
        // Block opponent's winning moves
        if (humanScore >= 4) {
          score += 1000;
        }
        
        // Prefer moves closer to center
        const centerDist = Math.abs(i - boardSize/2) + Math.abs(j - boardSize/2);
        score -= centerDist;
        
        // Add randomness based on difficulty
        if (difficulty === 'easy') {
          score += Math.random() * 1000;
        } else if (difficulty === 'medium') {
          score += Math.random() * 500;
        }
        
        validMoves.push({ row: i, col: j, score });
      }
    }
  }

  if (validMoves.length === 0) return null;
  
  // Sort moves by score and pick the best one
  validMoves.sort((a, b) => b.score - a.score);
  return validMoves[0];
};
