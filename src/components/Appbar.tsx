import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const Appbar = () => {
  return (
	<Navbar bg="dark" data-bs-theme="dark">
	<Container className='d-flex justify-content-center'>
	  <h6 className='text-white'>Bombay Live</h6>
	</Container>
  </Navbar>
  )
}

export default Appbar