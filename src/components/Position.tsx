import React from 'react';
import { formatBalance } from '../utils/Functions';

interface PositionButtonProps {
	name: string;
	handleAddBet: (amount: number, position: string) => void;
	betAmount:number;
	selectedPositions: string[];
	gameStarted: boolean;
	setSelectedPositions: React.Dispatch<React.SetStateAction<string[]>>;
}

const PositionButton: React.FC<PositionButtonProps> = ({ name, handleAddBet, betAmount, selectedPositions, gameStarted, setSelectedPositions }) => {
  const handleSelectPosition = (position: string): void => {

    if (!gameStarted) {
      const newSelectedPositions = [...selectedPositions];
      const positionIndex = newSelectedPositions.indexOf(position);

	  if(newSelectedPositions.length === 0){
		newSelectedPositions.push(position);
		setSelectedPositions(newSelectedPositions);
		handleAddBet(500, name)
	  } else if(newSelectedPositions.length === 1){
		if(positionIndex !== -1){
			handleAddBet(500, name)
		} else {
			newSelectedPositions.push(position);
		setSelectedPositions(newSelectedPositions);
		handleAddBet(500, name)
		}
	  } else if(newSelectedPositions.length === 2){
		if(positionIndex !== -1){
			handleAddBet(500, name)
		} else {
			alert("Only 2 positions at a time!")
		}
	  }
    }
  };

  return (
    <button
      className={`betButton disabled ${gameStarted ? 'disabled' : ''} ${name.toLowerCase()}`}
      onClick={() => handleSelectPosition(name)}
    >{selectedPositions.includes(name) ? <span className="chip">{formatBalance(betAmount)}</span> : <span className="empty-chip"></span>}	
      {name}
    </button>
  );
};

export default PositionButton;
