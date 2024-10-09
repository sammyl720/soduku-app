import React from 'react';

interface DifficultySelectorProps {
  difficulty: 'easy' | 'medium' | 'hard';
  setDifficulty: (difficulty: 'easy' | 'medium' | 'hard') => void;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({ difficulty, setDifficulty }) => {
  return (
    <div className="difficulty-selector">
      <label>Select Difficulty: </label>
      <select title='difficulty selector' value={difficulty} onChange={(e) => setDifficulty(e.target.value as any)}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>
  );
};

export default DifficultySelector;
