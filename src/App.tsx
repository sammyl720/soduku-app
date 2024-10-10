import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import SudokuGridComponent from './components/soduku-grid/soduku-grid';
import DifficultySelector from './components/difficulty-selector/difficulty-selector';
import Controls from './components/control/controls';
import SudokuGenerator, { SudokuGrid } from './utils/soduku-generator';

const App: React.FC = () => {
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>(
    'easy'
  );
  const [initialGrid, setInitialGrid] = useState<SudokuGrid>([]);
  const [currentGrid, setCurrentGrid] = useState<SudokuGrid>([]);

  const generator = new SudokuGenerator();

  const initializeGame = () => {
    const newGrid = generator.generateSudoku(difficulty);
    setInitialGrid(newGrid);
    setCurrentGrid(JSON.parse(JSON.stringify(newGrid))); // Deep copy
  };

  useEffect(() => {
    initializeGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty]);

  const setCell = (row: number, col: number, value: number) => {
    const updatedGrid = currentGrid.map((r) => [...r]);
    updatedGrid[row][col] = value;
    setCurrentGrid(updatedGrid);
  };

  const checkSolution = () => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const value = currentGrid[row][col];
        if (value === 0 || !isValid(currentGrid, value, row, col, row, col)) {
          alert('Incorrect solution!');
          return;
        }
      }
    }
    alert('Congratulations! You solved the puzzle.');
  };

  // Helper function to validate the current grid
  const isValid = (
    grid: SudokuGrid,
    num: number,
    row: number,
    col: number,
    excludeRow: number,
    excludeCol: number
  ): boolean => {
    // Check row and column
    for (let i = 0; i < 9; i++) {
      if (i !== excludeCol && grid[row][i] === num) return false;
      if (i !== excludeRow && grid[i][col] === num) return false;
    }

    // Check 3x3 subgrid
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let r = startRow; r < startRow + 3; r++) {
      for (let c = startCol; c < startCol + 3; c++) {
        if ((r !== excludeRow || c !== excludeCol) && grid[r][c] === num)
          return false;
      }
    }

    return true;
  };

  return (
    <div className={styles.appContainer}>
      <h1 className={styles.appTitle}>Sudoku Game</h1>
      <DifficultySelector
        difficulty={difficulty}
        setDifficulty={setDifficulty}
      />
      <Controls onNewGame={initializeGame} />
      <SudokuGridComponent
        initialGrid={initialGrid}
        currentGrid={currentGrid}
        setCell={setCell}
      />
      <button className={styles.checkButton} onClick={checkSolution}>
        Check Solution
      </button>
    </div>
  );
};

export default App;
