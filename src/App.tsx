import Header from './components/header/Header';
import BettingArea from './components/game/rockPaperScissors/RPSGameBoard';
import "./App.css"

function App() {

  return (
    <div className="App">
		<Header/>
		<BettingArea/>
    </div>
  );
}

export default App;
