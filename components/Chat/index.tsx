"use client";
import React from "react";
import ChatFrame from "./ChatFrame";
import ChatInput from "./ChatInput";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import WeatherWidgets from "../Weather/WeatherWidgets";

const Chat = () => {
  const messages = useSelector((state: RootState) => state.chatbot.messages);
  return (
    <div className="pt-16 flex items-center justify-center h-full w-full flex-col gap-4 m-auto">
      {messages.length > 0 ? <ChatFrame /> : <WeatherWidgets />}
      <ChatInput />
    </div>
  );
};

export default Chat;
