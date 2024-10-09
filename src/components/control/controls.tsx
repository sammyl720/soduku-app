import React from 'react';
import styles from './controls.module.css';

interface ControlsProps {
  onNewGame: () => void;
}

const Controls: React.FC<ControlsProps> = ({ onNewGame }) => {
  return (
    <div className={styles.controlsContainer}>
      <button className={styles.newGameButton} onClick={onNewGame}>
        New Game
      </button>
      {/* Add more controls like "Check Solution", "Reset", etc., if desired */}
    </div>
  );
};

export default Controls;
