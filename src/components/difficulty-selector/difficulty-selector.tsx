import React from 'react';
import styles from './difficulty-selector.module.css';

type Difficulty = 'easy' | 'medium' | 'hard';

interface DifficultySelectorProps {
  difficulty: Difficulty;
  setDifficulty: (difficulty: 'easy' | 'medium' | 'hard') => void;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  difficulty,
  setDifficulty,
}) => {
  return (
    <div className={styles.selectorContainer}>
      <label className={styles.selectorLabel} htmlFor="difficulty-select">
        Select Difficulty:{' '}
      </label>
      <select
        id="difficulty-select"
        className={styles.selector}
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value as Difficulty)}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>
  );
};

export default DifficultySelector;
