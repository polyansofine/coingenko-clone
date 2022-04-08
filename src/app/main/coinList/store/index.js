import { combineReducers } from '@reduxjs/toolkit';
import coins from './coinsSlice';

const reducer = combineReducers({
  coins,
});

export default reducer;
