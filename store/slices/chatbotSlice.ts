import axios from "axios";
import type { PayloadAction } from "@reduxjs/toolkit";
import { WeatherMessageResponse } from "@/types/weather";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface ChatbotState {
  messages: { user: string; bot: string | null }[];
  data: WeatherMessageResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: ChatbotState = {
  messages: [],
  data: null,
  loading: false,
  error: null,
};

export const handleMessage = createAsyncThunk<
  WeatherMessageResponse,
  string,
  { rejectValue: string }
>(
  "chatbot/handleMessage",
  async (query: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post("/api/chatbot", { query });
      dispatch(updateMessage({ user: query, bot: response.data.response }));

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch weather data"
      );
    }
  }
);

const chatbotSlice = createSlice({
  name: "chatbot",
  initialState,
  reducers: {
    addMessage: (
      state,
      action: PayloadAction<{ user: string; bot: string | null }>
    ) => {
      state.messages.push(action.payload);
    },

    updateMessage: (
      state,
      action: PayloadAction<{ user: string; bot: string | null }>
    ) => {
      const lastMessage = state.messages[state.messages.length - 1];
      if (lastMessage && lastMessage.user === action.payload.user) {
        lastMessage.bot = action.payload.bot;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleMessage.pending, (state, action) => {
        state.loading = true;
        state.error = null;

        state.messages.push({ user: action.meta.arg, bot: null });
      })
      .addCase(
        handleMessage.fulfilled,
        (state, action: PayloadAction<WeatherMessageResponse>) => {
          state.data = action.payload;
          state.loading = false;
        }
      )
      .addCase(handleMessage.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Failed to fetch weather data";
      });
  },
});

export const { addMessage, updateMessage } = chatbotSlice.actions;
export default chatbotSlice.reducer;
