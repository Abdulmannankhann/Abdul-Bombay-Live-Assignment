import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RPSState  {
  currentBet: number;
  winningAmount:number;
}

const initialState: RPSState  = {
	currentBet: 0,
	winningAmount:0
};

const rpsSlice  = createSlice({
  name: 'rps',
  initialState,
  reducers: {
	addBet: (state, action: PayloadAction<number>) => {
		state.currentBet += action.payload;
	  },
	setBet: (state, action: PayloadAction<number>) => {
		state.currentBet = action.payload;
	  },
	setWinningAmount: (state, action: PayloadAction<number>) => {
		state.winningAmount = action.payload;
	  },
  },
});

export const { addBet, setBet, setWinningAmount } = rpsSlice.actions;
export default rpsSlice.reducer;
