import React, { useState } from 'react';
import ResultArea from './ResultArea';
import Position from './Positions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/store';
import { setBet, setWinningAmount } from '../../../redux/slices/rpsSlice';
import { debitBalance } from '../../../redux/slices/userSlice';
import { initialPositionBets, initialWarningState } from '../../../utils/InitialStates';
import WarningModal from '../../modals/WarningModal';
import { WarningState } from '../../../types/types';
import { MINIMUM_BETTING_AMOUNT, POSITION_SELECTION_LIMIT } from '../../../utils/Constants';

interface RPSGameBoardProps {}

const RPSGameBoard: React.FC<RPSGameBoardProps> = () => {
	const dispatch = useDispatch();
	const { balance } = useSelector((state: RootState) => state.user);
	const { currentBet } = useSelector((state: RootState) => state.rockpaperscissors);

	//States
	const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
	const [gameStarted, setGameStarted] = useState<boolean>(false);
	const [gameOver, setGameOver] = useState<boolean>(false);
	const [positionBets, setPositionBets] = useState<{ [key: string]: number }>(initialPositionBets);
	const [warnings, setWarnings] = useState<WarningState>(initialWarningState);

	const handleSelectPosition = (position: string): void => {
		if (balance < MINIMUM_BETTING_AMOUNT) {
		  setWarnings({ show: true, title: "Oops", body: "Your account is running low on funds!" });
		  return;
		}
	  
		if (gameStarted) {
		  return;
		}
	  
		const newSelectedPositions = [...selectedPositions];
		const positionIndex = newSelectedPositions.indexOf(position);
	  
		if (newSelectedPositions.length === 0 || newSelectedPositions.length === 1) {
		  if (positionIndex === -1) {
			newSelectedPositions.push(position);
			setSelectedPositions(newSelectedPositions);
			handleAddBet(MINIMUM_BETTING_AMOUNT, position);
		  } else {
			handleAddBet(MINIMUM_BETTING_AMOUNT, position);
		  }
		} else if (newSelectedPositions.length === 2) {
		  if (positionIndex === -1) {
			setWarnings({ show: true, title: "Invalid selection", body: `Only ${POSITION_SELECTION_LIMIT} positions are allowed at a time!` });
		  } else {
			handleAddBet(MINIMUM_BETTING_AMOUNT, position);
		  }
		}
	  };
	  

  const handleAddBet = (amount: number, position: string): void => {
    if (balance < amount) {
		setWarnings({show:true, title:"Oops", body:"Your account is running low on funds!"})
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

  const closeWarnings = () => {
	setWarnings((prev)=>({...prev,show:false}))
  }

  const handlePlayButtonClick = () => {
    const buttonText = gameOver ? "Play Again" : "Play";
    const buttonClickHandler = gameStarted ? resetGame : handleStartGame;
	const disabled = gameStarted ? !gameOver : selectedPositions.length === 0 || gameStarted;

    return (
      <button className='primary-btn' onClick={buttonClickHandler} disabled={disabled}>
        {buttonText}
      </button>
    );
  };

  return (
    <div className='container'>		
		{gameStarted ? (
				<ResultArea
				selectedPositions={selectedPositions}
				setGameOver={setGameOver}
				/>

		) : (<div className='game-container'></div>)
		}

          <div className='position-container'>
			<Position name="Rock" handleAddBet={handleAddBet} betAmount={positionBets.Rock} selectedPositions={selectedPositions} setSelectedPositions={setSelectedPositions} gameStarted={gameStarted} handleSelectPosition={handleSelectPosition}/>
			<Position name="Paper" handleAddBet={handleAddBet} betAmount={positionBets.Paper} selectedPositions={selectedPositions} setSelectedPositions={setSelectedPositions} gameStarted={gameStarted} handleSelectPosition={handleSelectPosition}/>
			<Position name="Scissors" handleAddBet={handleAddBet} betAmount={positionBets.Scissors} selectedPositions={selectedPositions} setSelectedPositions={setSelectedPositions} gameStarted={gameStarted} handleSelectPosition={handleSelectPosition}/>
          </div>

          <div className='d-flex justify-content-center mt-2'>
			{handlePlayButtonClick()}
          </div>

		  <WarningModal show={warnings.show} title={warnings.title} body={warnings.body} handleClose={closeWarnings}/>
        </div>
  );
};

export default RPSGameBoard;
