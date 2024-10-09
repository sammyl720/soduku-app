export type SudokuGrid = number[][];

// Shuffles an array in place using Fisher-Yates algorithm
function shuffle(array: number[]): number[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Checks if placing num at (row, col) is valid
function isValid(
  grid: SudokuGrid,
  row: number,
  col: number,
  num: number
): boolean {
  // Check row and column
  for (let i = 0; i < 9; i++) {
    if (grid[row][i] === num || grid[i][col] === num) return false;
  }

  // Check 3x3 subgrid
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let r = startRow; r < startRow + 3; r++) {
    for (let c = startCol; c < startCol + 3; c++) {
      if (grid[r][c] === num) return false;
    }
  }

  return true;
}

// Generates a complete Sudoku grid using backtracking
function generateCompleteGrid(grid: SudokuGrid): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        for (const num of numbers) {
          if (isValid(grid, row, col, num)) {
            grid[row][col] = num;
            if (generateCompleteGrid(grid)) {
              return true;
            }
            grid[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

// Removes numbers from the complete grid based on difficulty
export function generateSudoku(
  difficulty: 'easy' | 'medium' | 'hard'
): SudokuGrid {
  // Initialize empty grid
  const grid: SudokuGrid = Array.from({ length: 9 }, () => Array(9).fill(0));

  // Generate a complete grid
  generateCompleteGrid(grid);

  // Determine number of cells to remove based on difficulty
  let cellsToRemove: number;
  switch (difficulty) {
    case 'easy':
      cellsToRemove = 40;
      break;
    case 'medium':
      cellsToRemove = 50;
      break;
    case 'hard':
      cellsToRemove = 60;
      break;
    default:
      cellsToRemove = 40;
  }

  // Remove cells
  while (cellsToRemove > 0) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (grid[row][col] !== 0) {
      grid[row][col] = 0;
      cellsToRemove--;
    }
  }

  return grid;
}
