import { Montserrat } from "next/font/google";
import React from "react";

type propsType = {
  me: boolean;
  text: string;
};
const montserrat = Montserrat({
  weight: ["100", "200", "300", "400", "500"],
  subsets: ["latin"],
});
const Chatbubble = ({ me, text }: propsType) => {
  const meClassName =
    "px-6 py-3 ml-auto max-w-96 border border-white/15 rounded-3xl bg-black/5 backdrop-blur-xl ";
  const botClassName = "bubble-chat pl-12 pt-3 mr-auto ";
  return (
    <div
      className={
        "flex mb-4 font-extralight relative " +
        (me ? meClassName : botClassName) +
        montserrat.className
      }
    >
      <span>
        Chatbubble Chatbubble Chatbubble Chatbubble Chatbubble Chatbubble
      </span>
    </div>
  );
};

export default Chatbubble;
