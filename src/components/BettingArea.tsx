import React, { useState } from 'react';
import GameResult from './GameResult';
import Position from './Position';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { setBet, setWinningAmount } from '../redux/slices/rpsSlice';
import { debitBalance } from '../redux/slices/userSlice';
import { initialPositionBets } from '../utils/InitialStates';

interface BettingScreenProps {}

const BettingArea: React.FC<BettingScreenProps> = () => {
	const dispatch = useDispatch();
	const { balance } = useSelector((state: RootState) => state.user);
	const { currentBet } = useSelector((state: RootState) => state.rockpaperscissors);
	const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
	const [gameStarted, setGameStarted] = useState<boolean>(false);
	const [gameOver, setGameOver] = useState<boolean>(false);
	const [positionBets, setPositionBets] = useState<{ [key: string]: number }>(initialPositionBets);

  const handleAddBet = (amount: number, position: string): void => {
    if (balance < amount) {
      return;
    }
	const bet = currentBet + amount;
    setPositionBets((prev) => ({ ...prev, [position]: prev[position] + amount }));
	dispatch(setBet(bet))
	dispatch(debitBalance(amount))
	const winningAmount:number = selectedPositions.length === 1 ? bet * 14 : bet * 3;
	dispatch(setWinningAmount(winningAmount))
  };

  const handleStartGame = (): void => {
	if(currentBet === 0){
		alert("Choose a bet!")
		return
	}
    setGameStarted(true);
  };

  const resetGame = (): void => {
	  setGameStarted(false);
	  setGameOver(false);
	  setSelectedPositions([]);
	  setPositionBets(initialPositionBets)
	  dispatch(setBet(0))
	  dispatch(setWinningAmount(0))
  };

  return (
    <div className='container'>		
		{gameStarted ? (
			<GameResult
			selectedPositions={selectedPositions}
			setGameStarted={setGameStarted}
			setGameOver={setGameOver}
			resetGame={resetGame}
		  />
		) : (<div className='game-container'></div>)
		}

          <div className='position-container'>
			<Position name="Rock" handleAddBet={handleAddBet} betAmount={positionBets.Rock} selectedPositions={selectedPositions} setSelectedPositions={setSelectedPositions} gameStarted={gameStarted}/>
			<Position name="Paper" handleAddBet={handleAddBet} betAmount={positionBets.Paper} selectedPositions={selectedPositions} setSelectedPositions={setSelectedPositions} gameStarted={gameStarted}/>
			<Position name="Scissors" handleAddBet={handleAddBet} betAmount={positionBets.Scissors} selectedPositions={selectedPositions} setSelectedPositions={setSelectedPositions} gameStarted={gameStarted}/>
          </div>

          <div className='d-flex justify-content-center mt-2'>
            {!gameStarted ? <button className='primary-button' onClick={handleStartGame} disabled={selectedPositions.length === 0 || gameStarted}>
              {gameOver ? "Play Again" : "Play"}
            </button> :
			<button className='primary-button' onClick={resetGame} disabled={!gameOver}>
			{gameOver ? "Play Again" : "Play"}
		  </button>
			}
          </div>
        </div>
  );
};

export default BettingArea;
