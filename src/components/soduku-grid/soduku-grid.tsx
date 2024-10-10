import React from 'react';
import styles from './soduku-grid.module.css';

interface SudokuGridProps {
  initialGrid: number[][];
  currentGrid: number[][];
  setCell: (row: number, col: number, value: number) => void;
}

const SudokuGrid: React.FC<SudokuGridProps> = ({
  initialGrid,
  currentGrid,
  setCell,
}) => {
  return (
    <div className={styles.sudokuGrid}>
      {currentGrid.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isInitial = initialGrid[rowIndex][colIndex] !== 0;
          const isBorderRight = (colIndex + 1) % 3 === 0 && colIndex !== 8;
          const isBorderBottom = (rowIndex + 1) % 3 === 0 && rowIndex !== 8;
          const cellClasses = `${styles.sudokuCell} ${isInitial ? styles.initial : ''} ${
            isBorderRight ? styles.borderRight : ''
          } ${isBorderBottom ? styles.borderBottom : ''}`;

          return (
            <input
              key={colIndex}
              type="number"
              min="1"
              max="9"
              inputMode="numeric"
              title={`Row ${rowIndex + 1} Column ${colIndex + 1}`}
              pattern="\d"
              value={cell === 0 ? '' : cell}
              disabled={isInitial}
              onChange={(e) => {
                const value = (parseInt(e.target.value) || 0) % 10;
                setCell(rowIndex, colIndex, value);
              }}
              className={cellClasses}
            />
          );
        })
      )}
    </div>
  );
};

export default SudokuGrid;
