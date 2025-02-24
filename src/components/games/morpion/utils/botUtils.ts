
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

  // Function to evaluate threat level in a direction
  const evaluateDirection = (row: number, col: number, dx: number, dy: number, symbol: string): number => {
    let count = 0;
    let openEnds = 0;
    let consecutive = 0;
    let maxConsecutive = 0;

    // Check both directions
    for (let direction = -1; direction <= 1; direction += 2) {
      let x = row;
      let y = col;
      let spaces = 0;
      consecutive = 0;
      
      // Look 4 spaces in each direction
      for (let step = 0; step < 4; step++) {
        x += dx * direction;
        y += dy * direction;
        
        if (x < 0 || x >= boardSize || y < 0 || y >= boardSize) break;
        
        if (board[x][y] === symbol) {
          consecutive++;
          count++;
        } else if (board[x][y] === '') {
          spaces++;
          if (consecutive > 0) break;
        } else {
          break;
        }
      }
      
      maxConsecutive = Math.max(maxConsecutive, consecutive);
      if (spaces > 0) openEnds++;
    }

    // Calculate threat level
    if (count >= 4) return 100000;  // Immediate threat
    if (count === 3 && openEnds === 2) return 50000;  // Strong threat
    if (count === 3 && openEnds === 1) return 10000;  // Moderate threat
    if (count === 2 && openEnds === 2) return 5000;   // Potential threat
    
    return count * 100 + openEnds * 50;  // Base score
  };

  // Function to check for immediate win or block with enhanced threat detection
  const checkImmediateWinOrBlock = (symbol: string): { row: number; col: number } | null => {
    let bestMove = null;
    let maxThreat = 0;

    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        if (!board[i][j]) {
          // Temporarily place the symbol
          board[i][j] = symbol;
          let totalThreat = 0;
          
          // Check all 8 directions
          const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],           [0, 1],
            [1, -1],  [1, 0],  [1, 1]
          ];

          let isWinning = false;
          for (const [dx, dy] of directions) {
            let count = 1;
            let openEnds = 0;
            
            // Check in positive direction
            let x = i + dx;
            let y = j + dy;
            let blocked = false;
            while (x >= 0 && x < boardSize && y >= 0 && y < boardSize && !blocked) {
              if (board[x][y] === symbol) {
                count++;
              } else if (board[x][y] === '') {
                openEnds++;
                blocked = true;
              } else {
                blocked = true;
              }
              x += dx;
              y += dy;
            }

            // Check in negative direction
            x = i - dx;
            y = j - dy;
            blocked = false;
            while (x >= 0 && x < boardSize && y >= 0 && y < boardSize && !blocked) {
              if (board[x][y] === symbol) {
                count++;
              } else if (board[x][y] === '') {
                openEnds++;
                blocked = true;
              } else {
                blocked = true;
              }
              x -= dx;
              y -= dy;
            }

            if (count >= 5) {
              isWinning = true;
              break;
            }

            // Calculate threat level
            let threatLevel = count * 100;
            if (count >= 3 && openEnds > 0) {
              threatLevel *= (openEnds + 1);  // Bonus for open ends
            }
            totalThreat += threatLevel;
          }

          // Remove the temporary symbol
          board[i][j] = '';

          if (isWinning) return { row: i, col: j };
          
          if (totalThreat > maxThreat) {
            maxThreat = totalThreat;
            bestMove = { row: i, col: j };
          }
        }
      }
    }

    return maxThreat >= 1000 ? bestMove : null;  // Only return if significant threat
  };

  // First priority: Check for immediate win
  const winningMove = checkImmediateWinOrBlock('O');
  if (winningMove) return winningMove;

  // Second priority: Block opponent's win or strong threat
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
        
        // Check all 8 directions for threats and opportunities
        const directions = [
          [-1, -1], [-1, 0], [-1, 1],
          [0, -1],           [0, 1],
          [1, -1],  [1, 0],  [1, 1]
        ];

        // Evaluate threats and opportunities in each direction
        for (const [dx, dy] of directions) {
          // Defensive evaluation (opponent's threats)
          const defensiveScore = evaluateDirection(i, j, dx, dy, 'X');
          score += defensiveScore * 1.2;  // Slightly prioritize defense

          // Offensive evaluation (bot's opportunities)
          const offensiveScore = evaluateDirection(i, j, dx, dy, 'O');
          score += offensiveScore;
        }

        // Positional scoring
        const centerRow = Math.floor(boardSize / 2);
        const centerCol = Math.floor(boardSize / 2);
        const distanceToCenter = Math.abs(i - centerRow) + Math.abs(j - centerCol);
        score += Math.max(0, (10 - distanceToCenter) * 100);

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
