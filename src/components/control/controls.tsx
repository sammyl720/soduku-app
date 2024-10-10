import React from 'react';
import styles from './controls.module.css';
import { FaPlay, FaUndo } from 'react-icons/fa';

interface ControlsProps {
  onNewGame: () => void;
  onReset: () => void;
}

const Controls: React.FC<ControlsProps> = ({ onNewGame, onReset }) => {
  return (
    <div className={styles.controlsContainer}>
      <button className={styles.newGameButton} onClick={onNewGame}>
        <FaPlay className={styles.icon} />
        New Game
      </button>
      <button className={styles.controlButton} onClick={onReset}>
        <FaUndo className={styles.icon} />
        Reset
      </button>
      {/* Add more controls like "Check Solution", "Reset", etc., if desired */}
    </div>
  );
};

export default Controls;
