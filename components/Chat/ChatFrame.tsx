import React from "react";
import Chatbubble from "./Chatbubble";

const ChatFrame = () => {
    const message = "For Casablanca on November 5th, 2024, the temperature is expected to be around 22.25 degrees Celsius, with a high of 25.14 degrees Celsius and a low of 21.87 degrees Celsius. The weather will be clear with minimal cloud cover."
    const question = "what's the weather like in casablanca today"
  return (
    <div className="w-full relative z-10 pl-6 pr-1.5 py-3 rounded-3xl bg-gray-600/45 backdrop-blur-xl text-white outline-none shadow-lg h-full">
      <div className="h-full flex flex-col pr-5 t-3 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:transparent [&::-webkit-scrollbar-thumb]:bg-gray-600/60 [&::-webkit-scrollbar-thumb]:rounded-lg">
        <Chatbubble me={true} text={question} />
        <Chatbubble me={false} text={message} />
        <Chatbubble me={true} text={question} />
        <Chatbubble me={false} text={message} />
        <Chatbubble me={true} text={question} />
        <Chatbubble me={false} text={message} />
        <Chatbubble me={true} text={question} />
        <Chatbubble me={false} text={message} />
        <Chatbubble me={true} text={question} />
        <Chatbubble me={false} text={message} />
      </div>
    </div>
  );
};

export default ChatFrame;
