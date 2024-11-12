import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./slices/weatherSlice";
import chatbotReducer from "./slices/chatbotSlice";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    chatbot: chatbotReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
