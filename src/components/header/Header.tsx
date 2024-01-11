import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';

const Header = () => {
	const { balance } = useSelector((state: RootState) => state.user);
	const { currentBet, winningAmount } = useSelector((state: RootState) => state.rockpaperscissors);
	
  return (
	<Navbar bg="dark" data-bs-theme="dark">
	<Container className='d-flex justify-content-evenly'>
	  <h6 className='text-white'>Balance: {balance}</h6>
	  <h6 className='text-white'>Bet: {currentBet}</h6>
	  <h6 className='text-white'>Win: {winningAmount}</h6>
	</Container>
  </Navbar>
  )
}

export default Header