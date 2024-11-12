"use client";
import { imagesMapper } from "@/db/images";
import { RootState } from "@/store";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

const Wallpaper = () => {
  const { data: locationData } = useSelector(
    (state: RootState) => state.weather
  );
  return (
    <>
      <div className="inset-0 absolute -z-10 bg-slate-900/40"></div>
      {locationData ? (
        <Image
          src={imagesMapper[locationData?.weather[0].id as number][0]}
          alt="Kalopsium"
          width={4000}
          height={4000}
          priority
          className="w-screen h-screen fixed top-0 left-0 object-center object-cover -z-20 brightness-50"
        />
      ) : (
        <Image
          src={"/sky.jpg"}
          alt="Kalopsium"
          width={4000}
          height={4000}
          priority
          className="w-screen h-screen fixed top-0 left-0 object-center object-cover -z-20 brightness-50"
        />
      )}
    </>
  );
};

export default Wallpaper;
