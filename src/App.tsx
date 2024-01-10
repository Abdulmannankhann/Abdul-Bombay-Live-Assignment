import React, { useState } from 'react';
import Appbar from './components/Appbar';
import BettingArea from './components/BettingArea';
import "./App.css"

function App() {
	const [balance, setBalance] = useState<number>(5000);

  return (
    <div className="App">
		<Appbar/>
		<BettingArea balance={balance} setBalance={setBalance}/>
    </div>
  );
}

export default App;
