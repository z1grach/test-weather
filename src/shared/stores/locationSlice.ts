import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ISavedLocation {
  id: string;
  name: string;
  country: string;
}

export interface ILocationSlice {
  savedLocations: ISavedLocation[];
}

const initialLocation = () => {
  const data = localStorage.getItem('locations');

  if (!data) return [];

  return JSON.parse(data);
};

const initialState: ILocationSlice = {
  savedLocations: initialLocation(),
};

export const locationSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    addSavedLocation: (state, action: PayloadAction<ISavedLocation>) => {
      const idx = state.savedLocations.findIndex(
        (item) => item.id === action.payload.id,
      );

      if (idx !== -1) return;

      state.savedLocations.push(action.payload);

      localStorage.setItem('locations', JSON.stringify(state.savedLocations));
    },

    deleteSavedLocation: (state, action: PayloadAction<string>) => {
      state.savedLocations = state.savedLocations.filter(
        (item) => item.id !== action.payload,
      );

      localStorage.setItem('locations', JSON.stringify(state.savedLocations));
    },
  },
});

export const { addSavedLocation, deleteSavedLocation } = locationSlice.actions;

export const locationReducer = locationSlice.reducer;
