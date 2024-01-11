import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  balance: number;
}

const initialState: UserState = {
	balance: 5000,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    creditBalance: (state, action: PayloadAction<number>) => {
      state.balance = state.balance + action.payload;
    },
	debitBalance: (state, action: PayloadAction<number>) => {
		state.balance = state.balance - action.payload;
	  },
  },
});

export const { creditBalance, debitBalance } = userSlice.actions;
export default userSlice.reducer;
