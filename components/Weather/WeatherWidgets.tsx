import { RootState } from "@/store";
import { useTranslation } from "next-i18next";
import { Montserrat } from "next/font/google";
import React from "react";
import { useSelector } from "react-redux";

const montserrat = Montserrat({
  weight: ["100", "200", "300", "400", "500"],
  subsets: ["latin"],
});
const WeatherWidgets = () => {
  const messages = useSelector((state: RootState) => state.chatbot.messages);
  const { t } = useTranslation();
  return (
    <div
      className={
        "h-80 flex flex-col gap-3 transition-all text-lightgrey/90 " +
        montserrat.className +
        (messages.length ? " invisible" : " ")
      }
    >
      <h1 className="text-3xl font-normal mb-4">{t("welcome")}</h1>
      <p className="text-lg">
        Get real-time weather updates, air quality insights, and forecasts for
        any location. Simply type in a question to get started, or explore
        current conditions in Banpobondong, KR.
      </p>
      <h4 className="text-xl font-medium mt-4">
        &quot;Kalopsai, what&apos;s the weather like today?&quot;
      </h4>
    </div>
  );
};

export default WeatherWidgets;
