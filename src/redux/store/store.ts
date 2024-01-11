// store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from "../slices/userSlice";
import rpsReducer from "../slices/rpsSlice"

const store = configureStore({
  reducer: {
	user:userReducer,
	rockpaperscissors:rpsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
