import React from 'react';
import Select, { SingleValue } from 'react-select';
import styles from './difficulty-selector.module.css';
import { FaSmile, FaMeh, FaFrown } from 'react-icons/fa'; // Importing icons for difficulty levels

type Difficulty = 'easy' | 'medium' | 'hard';

interface DifficultyOption {
  value: Difficulty;
  label: React.ReactNode;
}

interface DifficultySelectorProps {
  difficulty: Difficulty;
  setDifficulty: (difficulty: 'easy' | 'medium' | 'hard') => void;
}

const options: DifficultyOption[] = [
  {
    value: 'easy',
    label: (
      <div className={styles.option}>
        <FaSmile className={styles.icon} />
        Easy
      </div>
    ),
  },
  {
    value: 'medium',
    label: (
      <div className={styles.option}>
        <FaMeh className={styles.icon} />
        Medium
      </div>
    ),
  },
  {
    value: 'hard',
    label: (
      <div className={styles.option}>
        <FaFrown className={styles.icon} />
        Hard
      </div>
    ),
  },
];

const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  difficulty,
  setDifficulty,
}) => {
  const selectedOption = options.find((option) => option.value === difficulty);

  const handleChange = (option: SingleValue<DifficultyOption>) => {
    if (option) {
      setDifficulty(option.value);
    }
  };

  return (
    <div className={styles.selectorContainer}>
      <label className={styles.selectorLabel} htmlFor="difficulty-select">
        Select Difficulty:
      </label>
      <Select
        id="difficulty-select"
        className={styles.selector}
        value={selectedOption}
        onChange={handleChange}
        options={options}
        components={{
          IndicatorSeparator: () => null,
        }}
        styles={{
          control: (provided) => ({
            ...provided,
            minHeight: '38px',
          }),
          menu: (provided) => ({
            ...provided,
            zIndex: 9999,
          }),
        }}
      />
    </div>
  );
};

export default DifficultySelector;
