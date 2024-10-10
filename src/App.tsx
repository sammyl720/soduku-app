import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import SudokuGridComponent from './components/soduku-grid/soduku-grid';
import DifficultySelector from './components/difficulty-selector/difficulty-selector';
import Controls from './components/control/controls';
import SudokuGenerator, {
  SudokuGrid,
} from './utils/soduku-generator/soduku-generator';
import { ToastContainer, toast } from 'react-toastify';
import ConfettiExplosion from './components/confetti-explosion/confetti-explosion';
import { FaPlane } from 'react-icons/fa'; // Importing icons for difficulty levels

const App: React.FC = () => {
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>(
    'easy'
  );
  const [initialGrid, setInitialGrid] = useState<SudokuGrid>([]);
  const [currentGrid, setCurrentGrid] = useState<SudokuGrid>([]);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  const generator = new SudokuGenerator();

  const initializeGame = () => {
    const newGrid = generator.generateSudoku(difficulty);
    setInitialGrid(newGrid);
    setCurrentGrid(structuredClone(newGrid)); // Deep copy
    setShowConfetti(false);
  };

  const resetGame = () => {
    setCurrentGrid(structuredClone(initialGrid)); // Deep copy
    setShowConfetti(false);
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
          toast.error('Incorrect solution!');
          return;
        }
      }
    }
    toast.success(
      <div>
        <strong>Congratulations!</strong>
        <p>You solved the puzzle.</p>
      </div>
    );
    // Trigger confetti
    setShowConfetti(true);
    // Stop confetti after a certain duration
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000); // Confetti lasts for 5 seconds
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
      <header className={styles.header}>
        <h1 className={styles.appTitle}>Sudoku Master</h1>
      </header>
      <DifficultySelector
        difficulty={difficulty}
        setDifficulty={setDifficulty}
      />
      <Controls onNewGame={initializeGame} onReset={resetGame} />
      <SudokuGridComponent
        initialGrid={initialGrid}
        currentGrid={currentGrid}
        setCell={setCell}
      />
      <button className={styles.checkButton} onClick={checkSolution}>
        Check Solution
        <FaPlane className={styles.icon} />
      </button>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <ConfettiExplosion active={showConfetti} duration={5000} />
    </div>
  );
};

export default App;
