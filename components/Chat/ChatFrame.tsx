import React from "react";
import Chatbubble from "./Chatbubble";

const ChatFrame = () => {
  return (
    <div className="w-full relative z-10 pl-6 pr-1.5 py-3 rounded-3xl bg-gray-600/45 backdrop-blur-xl text-white outline-none shadow-lg h-full">
      <div className="h-full flex flex-col pr-5 t-3 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:transparent [&::-webkit-scrollbar-thumb]:bg-gray-600/60 [&::-webkit-scrollbar-thumb]:rounded-lg">
        <Chatbubble me={true} text="Hello world" />
        {/* <Chatbubble me={false} text="Hello world" />
        <Chatbubble me={true} text="Hello world" />
        <Chatbubble me={false} text="Hello world" />
        <Chatbubble me={true} text="Hello world" />
        <Chatbubble me={false} text="Hello world" />
        <Chatbubble me={true} text="Hello world" />
        <Chatbubble me={false} text="Hello world" />
        <Chatbubble me={true} text="Hello world" />
        <Chatbubble me={false} text="Hello world" />  */}
      </div>
    </div>
  );
};

export default ChatFrame;
