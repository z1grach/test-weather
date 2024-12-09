import { configureStore } from '@reduxjs/toolkit';
import { mobileReducer } from './mobileSlice';
import { cacheReducer } from './cacheSlice';
import { locationReducer } from './locationSlice';

export const store = configureStore({
  reducer: {
    mobile: mobileReducer,
    cache: cacheReducer,
    location: locationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
