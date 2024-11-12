import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ILocationWeatherResponse } from "@/types/weather";
import { userLocationType } from "@/types";

interface WeatherState {
  location: userLocationType;
  data: ILocationWeatherResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  location: {
    latitude: 0,
    longitude: 0,
  },
  data: null,
  loading: false,
  error: null,
};

export const fetchWeatherData = createAsyncThunk<
  ILocationWeatherResponse,
  { location: userLocationType; lang: string },
  { rejectValue: string }
>(
  "weather/fetchWeatherData",
  async ({ location, lang }, { rejectWithValue }) => {
    try {
      const { latitude, longitude } = location;
      const response = await axios.get(
        `/api/weather?latitude=${latitude}&longitude=${longitude}&lang=${lang}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch weather data"
      );
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<userLocationType>) => {
      state.location = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchWeatherData.fulfilled,
        (state, action: PayloadAction<ILocationWeatherResponse>) => {
          state.data = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Failed to fetch weather data";
      });
  },
});

export const { setLocation } = weatherSlice.actions;
export default weatherSlice.reducer;
