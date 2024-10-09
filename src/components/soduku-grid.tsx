import React from 'react';
import './soduku-grid.css';

interface SudokuGridProps {
  initialGrid: number[][];
  currentGrid: number[][];
  setCell: (row: number, col: number, value: number) => void;
}

const SudokuGrid: React.FC<SudokuGridProps> = ({ initialGrid, currentGrid, setCell }) => {
  return (
    <div className="sudoku-grid">
      {currentGrid.map((row, rowIndex) => (
        <div key={rowIndex} className="sudoku-row">
          {row.map((cell, colIndex) => {
            const isInitial = initialGrid[rowIndex][colIndex] !== 0;
            return (
              <input
                key={colIndex}
                type="number"
                min="1"
                max="9"
                pattern='\d'
                value={cell === 0 ? '' : cell}
                disabled={isInitial}
                onChange={(e) => {
                  const value = (parseInt(e.target.value) || 0) % 10;
                  setCell(rowIndex, colIndex, value);
                }}
                className={`sudoku-cell ${isInitial ? 'initial' : ''} ${
                  (colIndex + 1) % 3 === 0 && colIndex !== 8 ? 'border-right' : ''
                } ${(rowIndex + 1) % 3 === 0 && rowIndex !== 8 ? 'border-bottom' : ''}`}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default SudokuGrid;
