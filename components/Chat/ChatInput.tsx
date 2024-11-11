import { AppDispatch, RootState } from "@/store";
import { handleMessage } from "@/store/slices/chatbotSlide";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ChatInput = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.chatbot.loading);
  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ): Promise<void> => {
    if (event.key === "Enter") {
      dispatch(handleMessage(inputValue));
      setInputValue("");
    }
  };
  return (
    <div className="focus-within:before:opacity-80 focus-within:after:opacity-50 neonglow relative flex items-center justify-center w-full">
      <div className="kalopsai-input-icon"></div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
        placeholder="Ask Kalopsai..."
        className="neon-input w-full relative z-10 pl-14 pr-6 py-3 rounded-full bg-gray-600/70 text-white outline-none shadow-lg placeholder:text-gray-300 placeholder:font-light placeholder:text-base"
      />
    </div>
  );
};

export default ChatInput;
