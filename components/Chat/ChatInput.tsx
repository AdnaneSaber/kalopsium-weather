import React from "react";

const ChatInput = () => {
  return (
    <div className="focus-within:before:opacity-80 focus-within:after:opacity-50 neonglow relative flex items-center justify-center w-full">
      <div className="kalopsai-input-icon"></div>
      <input
        type="text"
        placeholder="Ask Kalopsai..."
        className="neon-input w-full relative z-10 pl-14 pr-6 py-3 rounded-full bg-gray-600/70 text-white outline-none shadow-lg placeholder:text-gray-300 placeholder:font-light placeholder:text-base"
      />
    </div>
  );
};

export default ChatInput;
