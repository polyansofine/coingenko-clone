import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from 'axios';

export const getCoins = createAsyncThunk('coinList/getCoins', async (page) => {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${
      page + 1
    }&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
  );
  const data = await response.data;
  console.log(
    '🚀 -> file: CoinListSlice.js -> line 11 -> getCoins -> data',
    data
  );

  return data;
});

// export const removeOrders = createAsyncThunk(
//   'eCommerceApp/orders/removeOrders',
//   async (orderIds, { dispatch, getState }) => {
//     await axios.post('/api/e-commerce-app/remove-orders', { orderIds });

//     return orderIds;
//   }
// );

const coinsAdapter = createEntityAdapter({});

export const { selectAll: selectCoins, selectById: selectOrderById } =
  coinsAdapter.getSelectors((state) => {
    console.log('state==', state);
    return state.coinList.coins;
  });

const coinsSlice = createSlice({
  name: 'coinList/coins',
  initialState: coinsAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setCoinsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getCoins.fulfilled]: coinsAdapter.setAll,
  },
});

export const { setCoinsSearchText } = coinsSlice.actions;

export default coinsSlice.reducer;
