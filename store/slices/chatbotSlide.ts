import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChatbotState {
  messages: { user: string; bot: string }[];
}

const initialState: ChatbotState = {
  messages: [],
};

const chatbotSlice = createSlice({
  name: 'chatbot',
  initialState,
  reducers: {
    addMessage: (
      state,
      action: PayloadAction<{ user: string; bot: string }>
    ) => {
      state.messages.push(action.payload);
    },
  },
});

export const { addMessage } = chatbotSlice.actions;
export default chatbotSlice.reducer;
