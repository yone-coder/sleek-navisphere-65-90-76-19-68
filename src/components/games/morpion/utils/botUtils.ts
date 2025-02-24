
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

  // Function to check if a position is valid for second move
  const isValidSecondMove = (row: number, col: number) => {
    const centerRow = Math.floor(boardSize / 2);
    const centerCol = Math.floor(boardSize / 2);
    const rowDiff = Math.abs(row - centerRow);
    const colDiff = Math.abs(col - centerCol);
    return rowDiff <= 3 && colDiff <= 3;
  };

  // Get all valid moves
  const validMoves: { row: number; col: number; score: number }[] = [];
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (!board[i][j]) {
        if (board.flat().filter(Boolean).length === 1 && !isValidSecondMove(i, j)) {
          continue;
        }
        let score = 0;
        
        // Check surrounding cells
        for (let di = -1; di <= 1; di++) {
          for (let dj = -1; dj <= 1; dj++) {
            if (di === 0 && dj === 0) continue;
            let playerCount = 0;
            let botCount = 0;
            let blocked = 0;
            
            // Look in both directions
            for (let step = -4; step <= 4; step++) {
              const row = i + di * step;
              const col = j + dj * step;
              
              if (row < 0 || row >= boardSize || col < 0 || col >= boardSize) continue;
              
              if (board[row][col] === 'X') playerCount++;
              else if (board[row][col] === 'O') botCount++;
              else if (step === -1 || step === 1) blocked++;
            }
            
            // Ultra defensive scoring
            // Highest priority: Block opponent's potential wins
            if (playerCount >= 3) {
              score += Math.pow(playerCount, 3) * 100;
            }
            
            // Medium priority: Defend against potential threats
            if (playerCount >= 2 && blocked === 0) {
              score += Math.pow(playerCount, 2) * 50;
            }
            
            // Lower priority: Build own moves
            if (botCount >= 3) {
              score += Math.pow(botCount, 2) * 30;
            }
            
            // Bonus for moves that both block and build
            if (playerCount > 0 && botCount > 0) {
              score += (playerCount + botCount) * 10;
            }
          }
        }

        // Add position-based scoring (prefer moves closer to the last move)
        if (lastMove) {
          const distance = Math.abs(i - lastMove.row) + Math.abs(j - lastMove.col);
          score += Math.max(0, (10 - distance) * 5);
        }

        // Add minimal randomness based on difficulty
        const randomFactor = difficulty === 'easy' ? 0.3 : 
                           difficulty === 'medium' ? 0.15 : 0.05;
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
