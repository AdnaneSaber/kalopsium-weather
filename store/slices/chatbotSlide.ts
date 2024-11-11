import axios from "axios";
import type { PayloadAction } from "@reduxjs/toolkit";
import { WeatherMessageResponse } from "@/types/weather";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define the state shape for the chatbot
interface ChatbotState {
  messages: { user: string; bot: string | null }[]; // Array of messages between the user and the bot
  data: WeatherMessageResponse | null; // Holds the response data from the chatbot
  loading: boolean; // Indicates if a request is in progress
  error: string | null; // Holds any error message
}

// Initial state setup
const initialState: ChatbotState = {
  messages: [],
  data: null,
  loading: false,
  error: null,
};

// Async thunk for handling the chatbot request
export const handleMessage = createAsyncThunk<
  WeatherMessageResponse, // Return type
  string, // Argument type (the query)
  { rejectValue: string } // Type for rejectValue (error message)
>("chatbot/handleMessage", async (query: string, { dispatch, rejectWithValue }) => {
  try {
    const response = await axios.post("/api/chatbot", { query });

    // After receiving the bot's response, update the same message entry
    dispatch(updateMessage({ user: query, bot: response.data.response }));

    return response.data; // Return the data so it can be saved in state.data
  } catch (error) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch weather data"
    );
  }
});

// Slice for managing chatbot state
const chatbotSlice = createSlice({
  name: "chatbot",
  initialState,
  reducers: {
    // Action to add a message to the chatbot conversation
    addMessage: (
      state,
      action: PayloadAction<{ user: string; bot: string | null }>
    ) => {
      state.messages.push(action.payload); // Add user and placeholder bot message
    },
    // Action to update the bot's response for the last message
    updateMessage: (
      state,
      action: PayloadAction<{ user: string; bot: string | null }>
    ) => {
      const lastMessage = state.messages[state.messages.length - 1];
      if (lastMessage && lastMessage.user === action.payload.user) {
        lastMessage.bot = action.payload.bot; // Update the bot response in the same message
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleMessage.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        // Immediately add the user message with a null bot response
        state.messages.push({ user: action.meta.arg, bot: null });
      })
      .addCase(
        handleMessage.fulfilled,
        (state, action: PayloadAction<WeatherMessageResponse>) => {
          state.data = action.payload; // Set the received data
          state.loading = false;
        }
      )
      .addCase(handleMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to fetch weather data";
      });
  },
});

// Export the actions to add and update messages
export const { addMessage, updateMessage } = chatbotSlice.actions;
export default chatbotSlice.reducer;
