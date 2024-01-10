import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import ChipImage from "../assets/images/500-chip.png";
import GameResult from './GameResult';
import Position from './Position';

interface BettingScreenProps {
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
}

interface Chip {
  id: number;
  position: { top: number; left: number };
}

const BettingArea: React.FC<BettingScreenProps> = ({ balance, setBalance }) => {
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
  const [betAmount, setBetAmount] = useState<number>(0);
  const [chips, setChips] = useState<Chip[]>([]);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameFinished, setGameFinished] = useState<boolean>(false);

  const addBet = (amount: number): void => {
    if (balance <= betAmount) {
      return;
    }

    const newChips: Chip[] = Array.from({ length: amount / 500 }, (_, i) => ({
      id: i,
      position: {
        top: Math.random() * 80,
        left: Math.random() * 80,
      },
    }));
    setChips((prevChips) => [...prevChips, ...newChips]);
    setBetAmount((prev) => prev + amount);
  };

  const undoBet = (): void => {
    if (betAmount === 0) {
      return;
    }
    setBetAmount((prev) => prev - 500);
    setChips((prevChips) => prevChips.slice(0, -1));
  };

  const startGame = (): void => {
	if(betAmount === 0){
		alert("Choose a bet!")
		return
	}
    setGameStarted(true);
  };

  const resetGame = (): void => {
	  setGameStarted(false);
	  setGameFinished(false);
	  setBetAmount(0);
	  setChips([]);
	  setSelectedPositions([]);
  };

  return (
    <div className='container'>
		<div className='container mt-2'>
          <div className='row'>
            <h6 className='col-md-4 text-center'>Balance: {balance}</h6>
            <h6 className='col-md-4 text-center'>Your Bet: {betAmount}</h6>
            <h6 className='col-md-4 text-center'>Win: {selectedPositions.length === 1 ? betAmount * 14 : betAmount * 3}</h6>
          </div>
		</div>

          {gameStarted ? 
		          <GameResult
				  selectedPositions={selectedPositions}
				  betAmount={betAmount}
				  balance={balance}
				  setBalance={setBalance}
				  setGameStarted={setGameStarted}
				  setGameFinished={setGameFinished}
				/> : <div className="table-container">
            <div className="circular-table">
              {chips.map((chip) => (
                <img
                  key={chip.id}
                  className="chip-img"
                  src={ChipImage}
                  alt="Casino Chip"
                  style={{ top: `${chip.position.top}%`, left: `${chip.position.left}%` }}
                />
              ))}
            </div>

            <div className="buttons-container">
              <Button size='sm' variant='outline-dark' onClick={() => addBet(500)} disabled={betAmount >= balance}>
                Add 500 Bet
              </Button>
              <Button size='sm' variant='outline-dark' onClick={undoBet} disabled={betAmount === 0}>
                Undo Bet
              </Button>
            </div>

          </div>}

          <div className='d-flex justify-content-center mt-2'>
			<Position name="Rock" selectedPositions={selectedPositions} setSelectedPositions={setSelectedPositions} gameStarted={gameStarted}/>
			<Position name="Paper" selectedPositions={selectedPositions} setSelectedPositions={setSelectedPositions} gameStarted={gameStarted}/>
			<Position name="Scissors" selectedPositions={selectedPositions} setSelectedPositions={setSelectedPositions} gameStarted={gameStarted}/>
          </div>

          <div className='d-flex justify-content-center mt-2'>
            {!gameStarted ? <Button variant='dark' onClick={startGame} disabled={selectedPositions.length === 0 || gameStarted}>
              {gameFinished ? "Play Again" : "Play"}
            </Button> :
			<Button variant='dark' onClick={resetGame} disabled={!gameFinished}>
			{gameFinished ? "Play Again" : "Play"}
		  </Button>
			}
          </div>
        </div>
  );
};

export default BettingArea;
