
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

  // Function to check for immediate win or block
  const checkImmediateWinOrBlock = (symbol: string): { row: number; col: number } | null => {
    // Check all possible positions
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        if (!board[i][j]) {
          // Temporarily place the symbol
          board[i][j] = symbol;
          
          // Check if this creates a win
          let isWinning = false;
          
          // Check all 8 directions
          const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],           [0, 1],
            [1, -1],  [1, 0],  [1, 1]
          ];

          for (const [dx, dy] of directions) {
            let count = 1;
            
            // Check in positive direction
            let x = i + dx;
            let y = j + dy;
            while (x >= 0 && x < boardSize && y >= 0 && y < boardSize && board[x][y] === symbol) {
              count++;
              x += dx;
              y += dy;
            }

            // Check in negative direction
            x = i - dx;
            y = j - dy;
            while (x >= 0 && x < boardSize && y >= 0 && y < boardSize && board[x][y] === symbol) {
              count++;
              x -= dx;
              y -= dy;
            }

            if (count >= 5) {
              isWinning = true;
              break;
            }
          }

          // Remove the temporary symbol
          board[i][j] = '';

          if (isWinning) {
            return { row: i, col: j };
          }
        }
      }
    }
    return null;
  };

  // First priority: Check for immediate win
  const winningMove = checkImmediateWinOrBlock('O');
  if (winningMove) return winningMove;

  // Second priority: Block opponent's win
  const blockingMove = checkImmediateWinOrBlock('X');
  if (blockingMove) return blockingMove;

  // Get all valid moves with scores
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
          [-1, -1], [-1, 0], [-1, 1], // diagonal and vertical up
          [0, -1],           [0, 1],  // horizontal
          [1, -1],  [1, 0],  [1, 1]   // diagonal and vertical down
        ];

        for (const [di, dj] of directions) {
          let playerCount = 0;
          let botCount = 0;
          let emptyBefore = false;
          let emptyAfter = false;
          let consecutivePlayer = 0;
          let consecutiveBot = 0;
          
          // Analyze pattern in this direction
          for (let step = -4; step <= 4; step++) {
            const row = i + di * step;
            const col = j + dj * step;
            
            if (row < 0 || row >= boardSize || col < 0 || col >= boardSize) continue;
            
            const cell = board[row][col];
            if (cell === 'X') {
              playerCount++;
              consecutivePlayer++;
              consecutiveBot = 0;
              if (consecutivePlayer >= 3) hasThreatsNearby = true;
            } else if (cell === 'O') {
              botCount++;
              consecutiveBot++;
              consecutivePlayer = 0;
            } else {
              if (step < 0) emptyBefore = true;
              if (step > 0) emptyAfter = true;
              consecutivePlayer = 0;
              consecutiveBot = 0;
            }
          }

          // Defensive scoring (preventing opponent wins)
          if (playerCount >= 4) score += 100000;  // Critical block needed
          else if (playerCount === 3 && (emptyBefore && emptyAfter)) score += 50000;  // Prevent potential win
          else if (playerCount === 2 && emptyBefore && emptyAfter) score += 5000;     // Early defense

          // Offensive scoring (creating winning opportunities)
          if (botCount >= 4) score += 200000;  // Immediate win possible
          else if (botCount === 3 && (emptyBefore && emptyAfter)) score += 80000;  // Create strong threat
          else if (botCount === 2 && emptyBefore && emptyAfter) score += 8000;     // Build offensive position

          // Pattern-based scoring
          if (consecutiveBot >= 2) score += consecutiveBot * 1000;  // Value consecutive pieces
          if (emptyBefore && emptyAfter) score += 500;  // Value moves with space to expand

          // Strategic position scoring
          const centerRow = Math.floor(boardSize / 2);
          const centerCol = Math.floor(boardSize / 2);
          const distanceToCenter = Math.abs(i - centerRow) + Math.abs(j - centerCol);
          score += Math.max(0, (10 - distanceToCenter) * 100);  // Prefer central positions

          // Threat-based bonus
          if (hasThreatsNearby) score *= 1.5;
        }

        // Difficulty adjustments
        const randomFactor = difficulty === 'easy' ? 0.5 : 
                           difficulty === 'medium' ? 0.25 : 0.1;
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
