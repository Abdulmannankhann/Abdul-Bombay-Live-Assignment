import React from 'react';

interface PositionProps {
	name: string;
	selectedPositions: string[];
	gameStarted: boolean;
	setSelectedPositions: React.Dispatch<React.SetStateAction<string[]>>;
}

const Position: React.FC<PositionProps> = ({ name, selectedPositions, gameStarted, setSelectedPositions }) => {
  const handleSelectPosition = (position: string): void => {
    if (!gameStarted) {
      const newSelectedPositions = [...selectedPositions];
      const positionIndex = newSelectedPositions.indexOf(position);

      if (positionIndex !== -1) {
        newSelectedPositions.splice(positionIndex, 1);
      } else {
        if (newSelectedPositions.length === 2) {
          alert('Only 2 positions at a time!');
          return;
        } else {
          newSelectedPositions.push(position);
        }
      }
      setSelectedPositions(newSelectedPositions);
    }
  };

  return (
    <div
      className={`box ${selectedPositions.includes(name) ? 'selected' : ''} ${gameStarted ? 'disabled' : ''}`}
      onClick={() => handleSelectPosition(name)}
    >
      {name}
    </div>
  );
};

export default Position;
