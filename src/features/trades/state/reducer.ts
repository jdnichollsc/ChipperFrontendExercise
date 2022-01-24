import {createSlice} from '@reduxjs/toolkit';

import {History} from '../../../api';
import {clearHistory, fetchTradeHistory, setHistoryError} from './actions';

interface TradesState {
  data: History | undefined;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: any;
}

const initialState = {
  data: undefined,
  status: 'idle',
  error: null,
} as TradesState;

const tradesSlice = createSlice({
  name: 'trade',
  initialState,
  reducers: {
    clearHistory: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(fetchTradeHistory.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(fetchTradeHistory.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload || [];
    });
    builder.addCase(fetchTradeHistory.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
    builder.addCase(setHistoryError, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(clearHistory, (state, action) => {
      state.error = action.payload;
    });
  },
});

export const tradesSliceReducer = tradesSlice.reducer;
