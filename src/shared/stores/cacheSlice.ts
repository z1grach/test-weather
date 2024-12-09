import { createSlice, PayloadAction } from '@reduxjs/toolkit';
/* @ts-ignore */ /* eslint-disable-next-line import/no-extraneous-dependencies */
import crypto from 'crypto-js';

const initialCacheSearch = () => {
  const data = localStorage.getItem('cacheSearch');

  if (!data) return {};

  return JSON.parse(data);
};

const initialHashSearch = () => {
  const data = localStorage.getItem('hashSearch');

  if (!data) return {};

  return JSON.parse(data);
};

export interface ICacheSlice {
  cacheSearch: Record<string, string>;
  hashSearch: Record<string, object>;
}

const initialState: ICacheSlice = {
  cacheSearch: initialCacheSearch(),
  hashSearch: initialHashSearch(),
};

export const cacheSlice = createSlice({
  name: 'cacheSlice',
  initialState,
  reducers: {
    setCacheSearch: (
      state,
      action: PayloadAction<{ str: string; data: object }>,
    ) => {
      const json = JSON.stringify(action.payload.data);
      const hash = crypto.MD5(json).toString();

      state.cacheSearch[action.payload.str] = hash;
      state.hashSearch[hash] = action.payload.data;

      localStorage.setItem('cacheSearch', JSON.stringify(state.cacheSearch));
      localStorage.setItem('hashSearch', JSON.stringify(state.hashSearch));
    },
  },
});

export const { setCacheSearch } = cacheSlice.actions;

export const cacheReducer = cacheSlice.reducer;
