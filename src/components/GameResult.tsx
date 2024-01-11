import React, { useEffect, useRef, useState } from 'react';
import checkResult from './algorithm/resultAnalyzer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { creditBalance } from '../redux/slices/userSlice';

interface GameResultProps {
  selectedPositions: string[];
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  resetGame:() => void;
}

const GameResult: React.FC<GameResultProps> = ({ selectedPositions, setGameStarted, setGameOver, resetGame }) => {
	const dispatch = useDispatch()
	const { currentBet:betAmount, winningAmount } = useSelector((state: RootState) => state.rockpaperscissors);
  const [computerPosition, setComputerPosition] = useState<string>('');
  const [showResult, setShowResult] = useState<boolean>(false);
  const selectedPositionsDisplay = selectedPositions.length > 1 ? `${selectedPositions.join(", ")}` : `${selectedPositions}`
  const winningDivRef = useRef<HTMLDivElement>(null);
  const [resultText, setResultText] = useState<React.ReactNode | null>(null);

  useEffect(() => {
    // Generate a random computer position when the component mounts
    const positions = ['Rock', 'Paper', 'Scissors'];
    const randomIndex = Math.floor(Math.random() * positions.length);
    setComputerPosition(positions[randomIndex]);

    // After 2 seconds, show the result
    const timeoutId = setTimeout(() => {
      setShowResult(true);
	  setGameOver(true);
    }, 3000);

    // Clear the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, []);

  // Use the checkResult function from the separate file
  const result = checkResult({
    selectedPositions,
    computerPosition: computerPosition.toLowerCase(),
  });

  const handleAddToWallet = (): void => {
	dispatch(creditBalance(winningAmount))
  }

  useEffect(() => {
    // Check the result only when the component is initially rendered
    if (showResult) {
      getResult();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showResult]);

  const getResult = (): void => {
    const result = checkResult({
      selectedPositions,
      computerPosition: computerPosition.toLowerCase(),
    });

    if (result === 'win') {
      setResultText(
        <>
          <h2 className='win'>{selectedPositionsDisplay} Won</h2>
          <h2 className='text-highlight'>You Win <strong className='text-white'>{winningAmount}</strong></h2>
          {/*<button className='secondary-button' onClick={handleAddToWallet}>Add to Wallet</button>*/}
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
    getResult(); // Call getResult on component mount
  }, []); // Empty dependency array means it runs once on mount
  
  return (
    <div  ref={winningDivRef}>
	  {showResult ? (<div className='game-container'>{resultText}</div>) : (
		<div className='game-container flex-row gap-5'>
			<h2 className='text-white'>{computerPosition}</h2>
			<h5 className='text-highlight'>VS</h5>
			<h2 className='text-white'>{selectedPositionsDisplay}</h2>
		</div>
      )}
    </div>
  );
};

export default GameResult;

/*
Change calculate Result logic:
if(Selected Position length == 1){
	if computer = Rock & selectedPostion array has Paper than Win  
	if computer = Rock & selectedPostion array has Scissors than Loose  
	if computer = Rock & selectedPostion array has Rock than Tie  
	

	if computer = Paper & selectedPostion array has Paper than Tie  
	if computer = Paper & selectedPostion array has Scissors than Win  
	if computer = Paper & selectedPostion array has Rock than Loose 

	if computer = Scissors & selectedPostion array has Paper than Loose  
	if computer = Scissors & selectedPostion array has Scissors than Tiw  
	if computer = Scissors & selectedPostion array has Rock than Win 
}

if(Selected Position length == 2){

	if computer = Rock & selectedPostion array has Rock, Paper than Win
	if computer = Rock & selectedPostion array has Paper, Scissors than Win 
	if computer = Rock & selectedPostion array has Scissors, Rock  than Loose 

	if computer = Paper & selectedPostion array has Rock, Paper than Loose
	if computer = Paper & selectedPostion array has Paper, Scissors than Win 
	if computer = Paper & selectedPostion array has Scissors, Rock  than Win 

	if computer = Scissors & selectedPostion array has Rock, Paper than Win
	if computer = Scissors & selectedPostion array has Paper, Scissors than Loose 
	if computer = Scissors & selectedPostion array has Scissors, Rock  than Win 

}

*/