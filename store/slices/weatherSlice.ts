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
  // ** SAVING DATA should be null
  data: {
    "coord": {
        "lon": 126.9813,
        "lat": 37.5694
    },
    "weather": [
        {
            "id": 800,
            "main": "Clear",
            "description": "clear sky",
            "icon": "01n"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 10.02,
        "feels_like": 7.91,
        "temp_min": 9.74,
        "temp_max": 10.71,
        "pressure": 1027,
        "humidity": 32,
        "sea_level": 1027,
        "grnd_level": 1021
    },
    "visibility": 10000,
    "wind": {
        "speed": 3.6,
        "deg": 330
    },
    "clouds": {
        "all": 0
    },
    "dt": 1730883412,
    "sys": {
        "type": 1,
        "id": 8105,
        "country": "KR",
        "sunrise": 1730844133,
        "sunset": 1730881751
    },
    "timezone": 32400,
    "id": 1835848,
    "name": "Seoul",
    "cod": 200
},
  loading: false,
  error: null,
};

export const fetchWeatherData = createAsyncThunk<
  ILocationWeatherResponse,
  userLocationType,
  { rejectValue: string }
>(
  "weather/fetchWeatherData",
  async (location: userLocationType, { rejectWithValue }) => {
    try {
      const { latitude, longitude } = location;
      const response = await axios.get(
        `/api/weather?latitude=${latitude}&longitude=${longitude}`
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
