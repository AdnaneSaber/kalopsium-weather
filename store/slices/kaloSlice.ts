import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserLocation {
  longitude: number;
  latitude: number;
}

interface KaloState {
  userLocation: UserLocation;
}

const initialState: KaloState = {
  userLocation: {
    longitude: 0,
    latitude: 0,
  },
};

const kaloSlice = createSlice({
  name: 'kalo',
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<UserLocation>) => {
      const { longitude, latitude } = action.payload;
      if (
        longitude !== state.userLocation.longitude ||
        latitude !== state.userLocation.latitude
      ) {
        state.userLocation = action.payload;
      }
    },
  },
});

export const { setLocation } = kaloSlice.actions;
export default kaloSlice.reducer;
