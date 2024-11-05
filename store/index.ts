import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./slices/weatherSlice";
import chatbotReducer from "./slices/chatbotSlide";
import kaloReducer from "./slices/kaloSlice";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    chatbot: chatbotReducer,
    kalo: kaloReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
