import React from 'react';
import { formatBalance } from '../../../utils/Functions';

interface PositionsButtonProps {
	name: string;
	handleAddBet: (amount: number, position: string) => void;
	betAmount:number;
	selectedPositions: string[];
	gameStarted: boolean;
	setSelectedPositions: React.Dispatch<React.SetStateAction<string[]>>;
	handleSelectPosition:(position: string) => void;
}

const PositionsButton: React.FC<PositionsButtonProps> = ({ name, betAmount, selectedPositions, gameStarted, handleSelectPosition }) => {

  return (
    <button
      className={`position-btn disabled ${gameStarted ? 'disabled' : ''} ${name.toLowerCase()}`}
      onClick={() => handleSelectPosition(name)}
    >{selectedPositions.includes(name) ? <span className="chip">{formatBalance(betAmount)}</span> : <span className="empty-chip"></span>}	
      {name}
    </button>
  );
};

export default PositionsButton;
