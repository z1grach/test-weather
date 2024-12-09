import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IMobileState {
  isMobile: boolean;
}

const initialState: IMobileState = {
  isMobile: false,
};

export const mobileSlice = createSlice({
  name: 'mobileSlice',
  initialState,
  reducers: {
    setIsMobile: (state, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload;
    },
  },
});

export const { setIsMobile } = mobileSlice.actions;

export const mobileReducer = mobileSlice.reducer;
