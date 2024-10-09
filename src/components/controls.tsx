import React from 'react';

interface ControlsProps {
  onNewGame: () => void;
}

const Controls: React.FC<ControlsProps> = ({ onNewGame }) => {
  return (
    <div className="controls">
      <button onClick={onNewGame}>New Game</button>
      {/* Add more controls like "Check Solution", "Reset", etc., if desired */}
    </div>
  );
};

export default Controls;
