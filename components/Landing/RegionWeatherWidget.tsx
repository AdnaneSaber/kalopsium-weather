"use client";
import { convertTimestampToDate } from "@/lib";
import { WeatherMapper } from "@/lib/constants";
import { RootState } from "@/store";
import { Montserrat } from "next/font/google";
import React from "react";
import { MapPin } from "react-feather";
import { useSelector } from "react-redux";

const montserrat = Montserrat({
  weight: ["100", "200", "300", "400", "500"],
  subsets: ["latin"],
});
const RegionWeatherWidget = () => {
  const { data: locationData } = useSelector(
    (state: RootState) => state.weather
  );
  return (
    <>
      <h4
        className={
          "mt-16 text-xl flex gap-4 items-center " + montserrat.className
        }
      >
        <MapPin size={24} strokeWidth={1} />
        <span className="font-normal">
          {locationData?.name}, {locationData?.sys.country}
        </span>
        <span className="text-base text-lightgrey">
          {"( "}
          {convertTimestampToDate(locationData?.dt as number, "dddd, MMMM DD")}
          {" )"}
        </span>
      </h4>
      <div className="flex gap-20 items-center">
        <h3 className={"text-8xl font-extralight " + montserrat.className}>
          {locationData?.main.temp.toFixed(0)}°
        </h3>
        <div className="flex flex-col gap-2">
          <div className="rounded-3xl bg-white/10 backdrop-blur-sm w-36 border border-white/15 px-4 py-1 flex justify-between items-center">
            <span
              className={
                "text-lightgrey/85 font-extralight text-base " +
                montserrat.className
              }
            >
              H
            </span>
            <span className={"font-light text-lg " + montserrat.className}>
              {locationData?.main.temp_max?.toFixed(0)}°
            </span>
          </div>
          <div className="rounded-3xl bg-white/10 backdrop-blur-sm w-36 border border-white/15 px-4 py-1 flex justify-between items-center">
            <span
              className={
                "text-lightgrey/85 font-extralight text-base " +
                montserrat.className
              }
            >
              L
            </span>
            <span className={"font-light text-lg " + montserrat.className}>
              {locationData?.main.temp_min?.toFixed(0)}°
            </span>
          </div>
        </div>
      </div>
      <div>
        <h3
          className={
            "text-6xl text-lightgrey/45 font-normal flex flex-col gap-3 " +
            montserrat.className
          }
        >
          {locationData && (
            <>
              <span>
                {WeatherMapper[locationData?.weather[0].id as number].title}
              </span>
              <span>
                {
                  WeatherMapper[locationData?.weather[0].id as number]
                    .description
                }
              </span>
            </>
          )}
        </h3>
      </div>
    </>
  );
};

export default RegionWeatherWidget;
