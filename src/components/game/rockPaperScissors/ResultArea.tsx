/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/store';
import { creditBalance } from '../../../redux/slices/userSlice';
import checkRockPaperScissors from '../../algorithm/resultAnalyzer';
import { POSITION_NAMES } from '../../../utils/Constants';
import FadeInWrapper from '../../motion/FadeInWrapper';

interface ResultAreaProps {
  selectedPositions: string[];
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResultArea: React.FC<ResultAreaProps> = ({ selectedPositions, setGameOver }) => {
	const dispatch = useDispatch();
	const { currentBet:betAmount, winningAmount } = useSelector((state: RootState) => state.rockpaperscissors);

	//States
	const [computerPosition, setComputerPosition] = useState<string>('');
	const [showResult, setShowResult] = useState<boolean>(false);
	const selectedPositionsDisplay = selectedPositions.length > 1 ? `${selectedPositions.join(", ")}` : `${selectedPositions}`;
	const winningDivRef = useRef<HTMLDivElement>(null);
	const [resultText, setResultText] = useState<React.ReactNode | null>(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * POSITION_NAMES.length);
    setComputerPosition(POSITION_NAMES[randomIndex]);

    // After 3 seconds, showing the result
    const timeoutId = setTimeout(() => {
      setShowResult(true);
	  setGameOver(true);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  const handleAddToWallet = (): void => {
	dispatch(creditBalance(winningAmount))
  }

  useEffect(() => {
    if (showResult) {
      getResult();
    }
  }, [showResult]);

  const getResult = (): void => {
    const result = checkRockPaperScissors({
      selectedPositions,
      computerPosition: computerPosition.toLowerCase(),
    });

    if (result === 'win') {
      setResultText(
        <>
          <h2 className='win'>{selectedPositionsDisplay} Won</h2>
          <h2 className='text-highlight'>You Win <strong className='text-white'>{winningAmount}</strong></h2>
          {/*<button className='secondary-btn' onClick={handleAddToWallet}>Add to Wallet</button>*/}
        </>
      );
	  handleAddToWallet()
    } else if (result === 'lose') {
      setResultText(
        <>
          <h2 className='loose'>{selectedPositionsDisplay} Lost</h2>
          <h2 className='text-highlight'>You Lost <strong className='text-white'>{betAmount}</strong></h2>
        </>
      );
    } else if (result === 'tie') {
      setResultText(
        <>
          <h2 className='tie'>It's a Tie</h2>
          <h2 className='text-highlight'>You Lost <strong className='text-white'>{betAmount}</strong></h2>
        </>
      );
    } else {
      setResultText(<h2 className='text-highlight'>Invalid Result</h2>);
    }
  };

  useEffect(() => {
    getResult();
  }, []);
  
  return (
    <div  ref={winningDivRef}>
	  {showResult ? (
	  <FadeInWrapper key={1}>
		<div className='game-container'>{resultText}</div>
		</FadeInWrapper>
		) : (
			<FadeInWrapper key={2}>
		<div className='game-container flex-row gap-5'>
			<h2 className='text-white'>{computerPosition}</h2>
			<h5 className='text-highlight'>VS</h5>
			<h2 className='text-white'>{selectedPositionsDisplay}</h2>
		</div>
		</FadeInWrapper>
      )}
    </div>
  );
};

export default ResultArea;