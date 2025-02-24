
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
        let hasThreatsNearby = false;
        
        // Check surrounding cells in all 8 directions
        const directions = [
          [-1, 0], [1, 0], // vertical
          [0, -1], [0, 1], // horizontal
          [-1, -1], [1, 1], // diagonal \
          [-1, 1], [1, -1]  // diagonal /
        ];

        for (const [di, dj] of directions) {
          let playerCount = 0;
          let botCount = 0;
          let emptyBefore = false;
          let emptyAfter = false;
          
          // Check 5 cells in this direction
          for (let step = -4; step <= 4; step++) {
            const row = i + di * step;
            const col = j + dj * step;
            
            if (row < 0 || row >= boardSize || col < 0 || col >= boardSize) continue;
            
            const cell = board[row][col];
            if (cell === 'X') {
              playerCount++;
              // Reset consecutive count if there's a gap
              if (playerCount === 3 && (emptyBefore || emptyAfter)) {
                hasThreatsNearby = true;
              }
            } else if (cell === 'O') {
              botCount++;
            } else {
              // Track empty spaces before and after the sequence
              if (step < 0) emptyBefore = true;
              if (step > 0) emptyAfter = true;
            }
          }

          // Ultra defensive scoring
          // Immediate block needed (opponent has 4 in a row)
          if (playerCount >= 4) {
            score += 100000;
          }
          // Critical defense (opponent has 3 in a row with space)
          else if (playerCount === 3 && (emptyBefore || emptyAfter)) {
            score += 10000;
          }
          // Potential threat (opponent has 2 in a row with spaces)
          else if (playerCount === 2 && emptyBefore && emptyAfter) {
            score += 1000;
          }

          // Offensive scoring
          // Bot can win next move
          if (botCount >= 4) {
            score += 50000;
          }
          // Bot has strong position (3 in a row with space)
          else if (botCount === 3 && (emptyBefore || emptyAfter)) {
            score += 5000;
          }
          // Bot building position (2 in a row with spaces)
          else if (botCount === 2 && emptyBefore && emptyAfter) {
            score += 500;
          }

          // Bonus for moves that both defend and attack
          if (playerCount > 0 && botCount > 0) {
            score += (playerCount + botCount) * 100;
          }

          // Extra bonus for moves near threats
          if (hasThreatsNearby) {
            score *= 1.5;
          }
        }

        // Position-based scoring (prefer moves closer to the last move)
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
