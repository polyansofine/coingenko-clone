import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from 'axios';

export const getCoins = createAsyncThunk(
  'coinList/getCoins',
  async (page, { dispatch, getState }) => {
    const filter = getState().coinList.coinsList.filterCoinList;
    const searchTxt = getState().coinList.coins.searchText;
    let temp = '';
    if (filter.length > 0) {
      temp = '&ids=';
      // eslint-disable-next-line array-callback-return
      filter.map((item) => {
        temp = `${temp + item.id}%2C`;
      });
    } else {
      if (searchTxt.length > 0) {
        temp = `&ids=${searchTxt}`;
        return 0;
      }
      temp = '';
    }
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd${temp.substring(
        0,
        temp.length - 3
      )}&order=market_cap_desc&per_page=100&page=${
        page + 1
      }&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
    );
    const data = await response.data;

    return data;
  }
);

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
