type SudokuGrid = number[][];

class SudokuGenerator {
  protected grid: SudokuGrid;

  constructor() {
    this.grid = this.initializeGrid();
  }

  // Initialize an empty 9x9 grid
  protected initializeGrid(): SudokuGrid {
    return Array.from({ length: 9 }, () => Array(9).fill(0));
  }

  // Fisher-Yates shuffle algorithm
  protected shuffle(array: number[]): number[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Check if placing num at (row, col) is valid
  protected isValid(row: number, col: number, num: number): boolean {
    // Check row and column
    for (let i = 0; i < 9; i++) {
      if (this.grid[row][i] === num || this.grid[i][col] === num) return false;
    }

    // Check 3x3 subgrid
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let r = startRow; r < startRow + 3; r++) {
      for (let c = startCol; c < startCol + 3; c++) {
        if (this.grid[r][c] === num) return false;
      }
    }

    return true;
  }

  // Generate a complete Sudoku grid using backtracking
  protected generateCompleteGrid(): boolean {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (this.grid[row][col] === 0) {
          const numbers = this.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
          for (const num of numbers) {
            if (this.isValid(row, col, num)) {
              this.grid[row][col] = num;
              if (this.generateCompleteGrid()) {
                return true;
              }
              this.grid[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  // Remove cells from the complete grid based on difficulty
  protected removeCells(difficulty: 'easy' | 'medium' | 'hard'): void {
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

    while (cellsToRemove > 0) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      if (this.grid[row][col] !== 0) {
        this.grid[row][col] = 0;
        cellsToRemove--;
      }
    }
  }

  // Public method to generate a Sudoku puzzle based on difficulty
  public generateSudoku(difficulty: 'easy' | 'medium' | 'hard'): SudokuGrid {
    this.grid = this.initializeGrid();
    this.generateCompleteGrid();
    this.removeCells(difficulty);
    return this.grid;
  }
}

export default SudokuGenerator;
export type { SudokuGrid };
