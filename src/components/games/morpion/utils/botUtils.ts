
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

  // Function to detect three in a row threats
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
  const winningMove = checkWin('O');
  if (winningMove) return winningMove;

  // Second priority: Block opponent's win
  const blockingMove = checkWin('X');
  if (blockingMove) return blockingMove;

  // Third priority: Block three in a row threats
  const blockThree = detectThreeInARow('X');
  if (blockThree) return blockThree;

  // Get all valid moves with scores
  const validMoves: { row: number; col: number; score: number }[] = [];
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (!board[i][j]) {
        if (board.flat().filter(Boolean).length === 1 && !isValidSecondMove(i, j)) {
          continue;
        }

        let score = 0;
        
        // Check all 8 directions for strategic value
        const directions = [
          [-1, -1], [-1, 0], [-1, 1],
          [0, -1],           [0, 1],
          [1, -1],  [1, 0],  [1, 1]
        ];

        for (const [dx, dy] of directions) {
          // Count consecutive pieces and empty spaces
          let botPieces = 0;
          let playerPieces = 0;
          let emptySpaces = 0;

          for (let step = -4; step <= 4; step++) {
            const x = i + dx * step;
            const y = j + dy * step;
            
            if (x >= 0 && x < boardSize && y >= 0 && y < boardSize) {
              if (board[x][y] === 'O') botPieces++;
              else if (board[x][y] === 'X') playerPieces++;
              else emptySpaces++;
            }
          }

          // Scoring based on piece configuration
          if (botPieces >= 2) score += botPieces * 100;
          if (playerPieces >= 2) score += playerPieces * 80;
          score += emptySpaces * 10;
        }

        // Position-based scoring
        const centerRow = Math.floor(boardSize / 2);
        const centerCol = Math.floor(boardSize / 2);
        const distanceToCenter = Math.abs(i - centerRow) + Math.abs(j - centerCol);
        score += Math.max(0, (10 - distanceToCenter) * 50);

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
