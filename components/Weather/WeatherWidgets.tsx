"use client";
import { RootState } from "@/store";
import { Montserrat } from "next/font/google";
import React from "react";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";

const montserrat = Montserrat({
  weight: ["100", "200", "300", "400", "500"],
  subsets: ["latin"],
});
const WeatherWidgets = () => {
  const messages = useSelector((state: RootState) => state.chatbot.messages);
  const locationData = useSelector((state: RootState) => state.weather.data);
  const t = useTranslations();
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
        {t("description", {
          country: locationData?.sys.country,
          city: locationData?.name,
        })}
      </p>
      <h4 className="text-xl font-medium mt-4">
        {t('question')}
      </h4>
    </div>
  );
};

export default WeatherWidgets;
