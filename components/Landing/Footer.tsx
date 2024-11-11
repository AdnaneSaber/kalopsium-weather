"use client";
import { RootState } from "@/store";
import { WeatherDayData, WeatherForcastData } from "@/types/weather";
import axios from "axios";
import { Montserrat } from "next/font/google";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const montserrat = Montserrat({
  weight: ["100", "200", "300", "400", "500"],
  subsets: ["latin"],
});
const Footer = () => {
  const { data: locationData } = useSelector(
    (state: RootState) => state.weather
  );
  const [daysData, setDaysData] = useState<WeatherDayData[]>();
  const listDays = () => {
    const today = new Date();
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const currentDayIndex = today.getDay();
    console.log(currentDayIndex);
    const nextFiveDays = [];

    for (let i = 0; i <= 4; i++) {
      const nextDayIndex = (currentDayIndex + i) % 7;
      const nextDayName = daysOfWeek[nextDayIndex];
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i + 1);

      const dateString = nextDate.toISOString().split("T")[0];

      nextFiveDays.push({
        day: nextDayName,
        date: dateString,
      });
    }
    return nextFiveDays;
  };
  useEffect(() => {
    if (locationData?.coord.lat) {
      (async () => {
        const { data } = await axios.get<WeatherForcastData>(
          `/api/weather/week/?latitude=${locationData?.coord.lat}&longitude=${locationData?.coord.lon}`
        );
        setDaysData(data.list);
      })();
    }
  }, [locationData]);
  useEffect(() => {
    console.log(daysData);
  }, [daysData]);

  return (
    <div className="py-10 w-full h-full flex flex-col justify-between">
      <div className="w-full flex justify-between h-full">
        {listDays().map(({ day, date }, index) => (
          <div key={index} className="flex flex-col justify-between">
            <div
              className={
                "text-xl font-light text-center " + montserrat.className
              }
            >
              {day}
            </div>
            <div
              className={
                "text-5xl font-light text-center " + montserrat.className
              }
            >
              {daysData
                ? Math.round(
                    daysData?.filter((el) => el.dt_txt.indexOf(date) != -1)[0]
                      ?.main.temp
                  ) + "°"
                : ""}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Footer;
