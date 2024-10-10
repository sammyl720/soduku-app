import SudokuGenerator, { SudokuGrid } from './soduku-generator';

class TestGridGenerator extends SudokuGenerator {
  public setGrid(grid: SudokuGrid) {
    this.grid = grid;
  }

  public getGrid() {
    return this.grid;
  }

  public override initializeGrid(): SudokuGrid {
    return super.initializeGrid();
  }

  public override shuffle(array: number[]): number[] {
    return super.shuffle(array);
  }

  public override generateCompleteGrid(): boolean {
    return super.generateCompleteGrid();
  }

  public override removeCells(difficulty: 'easy' | 'medium' | 'hard'): void {
    super.removeCells(difficulty);
  }
}

describe('SudokuGenerator', () => {
  let generator: TestGridGenerator;

  beforeEach(() => {
    generator = new TestGridGenerator();
  });

  describe('initializeGrid', () => {
    it('should initialize a 9x9 grid filled with zeros', () => {
      const grid = generator.initializeGrid();
      expect(grid).toHaveLength(9);
      grid.forEach((row: number[]) => {
        expect(row).toHaveLength(9);
        row.forEach((cell) => {
          expect(cell).toBe(0);
        });
      });
    });
  });

  describe('shuffle', () => {
    it('should shuffle the array without losing or duplicating elements', () => {
      const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      const shuffledArray = generator.shuffle([...array]);

      expect(shuffledArray).toHaveLength(array.length);
      expect(shuffledArray.sort()).toEqual(array);
      // There's a small chance that shuffle returns the same array, but it's negligible for testing purposes
    });

    it('should return a different order than the original array', () => {
      const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      const shuffledArray = generator.shuffle([...array]);

      // It's possible, though unlikely, that the shuffled array is identical
      // We'll allow for this small possibility
      const isDifferent = shuffledArray.some(
        (value, index) => value !== array[index]
      );
      expect(isDifferent).toBe(true);
    });
  });

  describe('generateCompleteGrid', () => {
    it('should generate a complete, valid Sudoku grid', () => {
      const success = generator.generateCompleteGrid();
      const grid = generator.getGrid();

      expect(success).toBe(true);
      expect(grid).toHaveLength(9);
      grid.forEach((row: number[]) => {
        expect(row).toHaveLength(9);
        row.forEach((cell: number) => {
          expect(cell).toBeGreaterThanOrEqual(1);
          expect(cell).toBeLessThanOrEqual(9);
        });
      });

      // Additional validation to ensure no duplicates in rows, columns, and subgrids
      for (let row = 0; row < 9; row++) {
        const rowSet = new Set(grid[row]);
        expect(rowSet.size).toBe(9);
      }

      for (let col = 0; col < 9; col++) {
        const colSet = new Set(grid.map((row) => row[col]));
        expect(colSet.size).toBe(9);
      }

      for (let boxRow = 0; boxRow < 3; boxRow++) {
        for (let boxCol = 0; boxCol < 3; boxCol++) {
          const boxSet = new Set<number>();
          for (let row = boxRow * 3; row < boxRow * 3 + 3; row++) {
            for (let col = boxCol * 3; col < boxCol * 3 + 3; col++) {
              boxSet.add(grid[row][col]);
            }
          }
          expect(boxSet.size).toBe(9);
        }
      }
    });
  });

  describe('removeCells', () => {
    it('should remove 40 cells for easy difficulty', () => {
      generator.generateCompleteGrid();
      generator.removeCells('easy');
      const grid = generator['grid'];
      const emptyCells = grid.flat().filter((cell) => cell === 0).length;
      expect(emptyCells).toBe(40);
    });

    it('should remove 50 cells for medium difficulty', () => {
      generator.generateCompleteGrid();
      generator.removeCells('medium');
      const grid = generator['grid'];
      const emptyCells = grid.flat().filter((cell) => cell === 0).length;
      expect(emptyCells).toBe(50);
    });

    it('should remove 60 cells for hard difficulty', () => {
      generator.generateCompleteGrid();
      generator.removeCells('hard');
      const grid = generator['grid'];
      const emptyCells = grid.flat().filter((cell) => cell === 0).length;
      expect(emptyCells).toBe(60);
    });
  });

  describe('generateSudoku', () => {
    it('should generate a Sudoku puzzle with the correct number of empty cells based on difficulty', () => {
      const difficulties: Array<{
        level: 'easy' | 'medium' | 'hard';
        emptyCells: number;
      }> = [
        { level: 'easy', emptyCells: 40 },
        { level: 'medium', emptyCells: 50 },
        { level: 'hard', emptyCells: 60 },
      ];

      difficulties.forEach(({ level, emptyCells }) => {
        const puzzle = generator.generateSudoku(level);
        const totalEmpty = puzzle.flat().filter((cell) => cell === 0).length;
        expect(totalEmpty).toBe(emptyCells);

        // Optional: Validate the puzzle's correctness (no duplicates in rows, columns, subgrids)
        // Note: Since cells are removed, validation only ensures no duplicates in filled cells
        for (let row = 0; row < 9; row++) {
          const rowNumbers = puzzle[row].filter((cell) => cell !== 0);
          const rowSet = new Set(rowNumbers);
          expect(rowSet.size).toBe(rowNumbers.length);
        }

        for (let col = 0; col < 9; col++) {
          const colNumbers = puzzle
            .map((row) => row[col])
            .filter((cell) => cell !== 0);
          const colSet = new Set(colNumbers);
          expect(colSet.size).toBe(colNumbers.length);
        }

        for (let boxRow = 0; boxRow < 3; boxRow++) {
          for (let boxCol = 0; boxCol < 3; boxCol++) {
            const boxNumbers: number[] = [];
            for (let row = boxRow * 3; row < boxRow * 3 + 3; row++) {
              for (let col = boxCol * 3; col < boxCol * 3 + 3; col++) {
                const cell = puzzle[row][col];
                if (cell !== 0) boxNumbers.push(cell);
              }
            }
            const boxSet = new Set(boxNumbers);
            expect(boxSet.size).toBe(boxNumbers.length);
          }
        }
      });
    });
  });
});

describe('GridGenerator.isValid()', () => {
  let generator: TestGridGenerator;
  beforeEach(() => {
    // Set up a known grid state
    generator = new TestGridGenerator();
    const testGrid: SudokuGrid = [
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9],
    ];

    generator.setGrid(testGrid);
  });

  it('should return true if the number can be placed in the cell', () => {
    const canPlace = generator['isValid'](0, 2, 4); // Row 0, Col 2, Num 4
    expect(canPlace).toBe(true);
  });

  it('should return false if the number already exists in the same row', () => {
    const canPlace = generator['isValid'](0, 2, 5); // Row 0, Col 2, Num 5 exists in row
    expect(canPlace).toBe(false);
  });

  it('should return false if the number already exists in the same column', () => {
    const canPlace = generator['isValid'](2, 2, 8); // Row 2, Col 2, Num 8 exists in column
    expect(canPlace).toBe(false);
  });

  it('should return false if the number already exists in the same subgrid', () => {
    const canPlace = generator['isValid'](4, 4, 8); // Row 4, Col 4, Num 8 exists in subgrid
    expect(canPlace).toBe(false);
  });
});
