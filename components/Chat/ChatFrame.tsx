import React from "react";
import Chatbubble from "./Chatbubble";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useTranslations } from "use-intl";

const ChatFrame = () => {
  const messages = useSelector((state: RootState) => state.chatbot.messages);
  const error = useSelector((state: RootState) => state.chatbot.error);
  const t = useTranslations()
  return (
    <div className="w-full relative z-10 pl-6 pr-1.5 py-3 rounded-3xl bg-gray-600/45 backdrop-blur-xl text-white outline-none shadow-lg h-full">
      <div className="h-full flex flex-col pr-5 t-3 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:transparent [&::-webkit-scrollbar-thumb]:bg-gray-600/60 [&::-webkit-scrollbar-thumb]:rounded-lg">
        {messages.map((message, key) => (
          <div key={key}>
            <Chatbubble key={key + "user"} me={true} text={message.user} />
            <Chatbubble
              key={key + "bot"}
              me={false}
              text={message.bot || "..."}
            />
            {error && (
              <p className="text-red-600 font-bold">
                {t('chat_error')}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatFrame;
