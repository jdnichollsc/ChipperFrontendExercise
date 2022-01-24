import {createAsyncThunk, createAction} from '@reduxjs/toolkit';
import {api, History} from '../../../api';

export const fetchTradeHistory = createAsyncThunk(
  'trades/fetchHistory',
  async () => {
    const response = await api.history();
    return response.parsedBody as History;
  },
);

export const setHistoryError = createAction('setHistoryError');
export const clearHistory = createAction('clearHistory');
