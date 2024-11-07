"use client";
import React from "react";
import ChatFrame from "./ChatFrame";
import ChatInput from "./ChatInput";

const Chat = () => {
  return (
    <div className="pt-16 flex items-center justify-center h-full w-full flex-col gap-4 m-auto">
      <ChatFrame />
      <ChatInput />
    </div>
  );
};

export default Chat;
