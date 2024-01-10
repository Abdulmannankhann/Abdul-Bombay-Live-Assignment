interface CheckResultProps {
	selectedPositions: string[];
	computerPosition: string;
  }
  
  const checkResult = ({ selectedPositions, computerPosition }: CheckResultProps): string => {
	const selected = selectedPositions.map((position) => position.toLowerCase()).sort().join(',');
  
	if (selectedPositions.length === 1) {
	  if (
		(computerPosition === 'rock' && selected.includes('paper')) ||
		(computerPosition === 'paper' && selected.includes('scissors')) ||
		(computerPosition === 'scissors' && selected.includes('rock'))
	  ) {
		return 'win';
	  } else if (
		(computerPosition === 'rock' && selected.includes('scissors')) ||
		(computerPosition === 'paper' && selected.includes('rock')) ||
		(computerPosition === 'scissors' && selected.includes('paper'))
	  ) {
		return 'lose';
	  } else {
		return 'tie';
	  }
	} else if (selectedPositions.length === 2) {
	  if (
		(computerPosition === 'rock' && selected === 'paper,rock') ||
		(computerPosition === 'paper' && selected === 'paper,rock') ||
		(computerPosition === 'scissors' && selected === 'paper,scissors')
	  ) {
		return 'win';
	  } else if (
		(computerPosition === 'rock' && selected === 'paper,scissors') ||
		(computerPosition === 'paper' && selected === 'rock,scissors') ||
		(computerPosition === 'scissors' && selected === 'paper,rock')
	  ) {
		return 'win';
	  } else {
		return 'lose';
	  }
	} else {
	  return 'invalid';
	}
  };
  
  export default checkResult;
  