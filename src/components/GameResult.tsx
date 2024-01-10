import React, { useEffect, useRef, useState } from 'react';
import checkResult from './checkResult';
import Card from 'react-bootstrap/Card';
import Confetti from 'react-confetti'

interface GameResultProps {
  selectedPositions: string[];
  balance: number;
  betAmount:number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
  setGameFinished: React.Dispatch<React.SetStateAction<boolean>>;
}

const GameResult: React.FC<GameResultProps> = ({ selectedPositions, balance, betAmount, setBalance, setGameStarted, setGameFinished }) => {
  const [computerPosition, setComputerPosition] = useState<string>('');
  const [showResult, setShowResult] = useState<boolean>(false);
  const winningAmount = selectedPositions.length === 1 ? betAmount * 14 : betAmount * 3;
  const selectedPositionsDisplay = selectedPositions.length > 1 ? `${selectedPositions.join(", ")}` : `${selectedPositions}`
  const winningDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate a random computer position when the component mounts
    const positions = ['Rock', 'Paper', 'Scissors'];
    const randomIndex = Math.floor(Math.random() * positions.length);
    setComputerPosition(positions[randomIndex]);

    // After 2 seconds, show the result
    const timeoutId = setTimeout(() => {
      setShowResult(true);
	  setGameFinished(true);
    }, 3000);

    // Clear the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, []);

  // Use the checkResult function from the separate file
  const result = checkResult({
    selectedPositions,
    computerPosition: computerPosition.toLowerCase(),
  });

  const getResult = (): React.ReactNode => {
    switch (result) {
      case 'win':
        return <>
		<Confetti width={winningDivRef?.current?.clientWidth} height={winningDivRef?.current?.clientHeight}/>
		<h2 className='win'>{selectedPositionsDisplay} Won</h2>
		<h2>You Win {winningAmount}</h2>
		</>;
      case 'lose':
        return <>
		<h2 className='loose'>{selectedPositionsDisplay} Lost</h2>
		<h2>You Lost {betAmount}</h2>
		</>;
      case 'tie':
        return <>
		<h2 className='tie'>It's a Tie</h2>
		<h2>You Lost {betAmount}</h2>
		</>;
      default:
        return 'Invalid result';
    }
  };
  
  return (
    <div className='container'>
	  <div ref={winningDivRef}>{showResult ? ( 
	  <>
	  <Card style={{minHeight:"400px", borderColor:"gray"}}>
		<Card.Body className='d-flex justify-content-evenly align-items-center'>
			<div className='d-flex flex-column align-items-center'>{getResult()}</div>
		</Card.Body>
	  </Card>
	  </>
      ) : (
        <>
		<Card style={{minHeight:"400px", borderColor:"gray"}}>
			<Card.Body className='d-flex justify-content-evenly align-items-center'>
        <h2>{computerPosition}</h2>
        <h2>VS</h2>
        <h2>{selectedPositionsDisplay}</h2>
      </Card.Body>
    </Card>
		</>
      )}
    </div>
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