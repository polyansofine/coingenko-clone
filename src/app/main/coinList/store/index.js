import { combineReducers } from '@reduxjs/toolkit';
import coins from './coinsSlice';
import coinsList from './coinsListSlice';

const reducer = combineReducers({
  coins,
  coinsList,
});

export default reducer;
