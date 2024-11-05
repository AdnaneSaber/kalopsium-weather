"use client"
import React, { useEffect, useState } from "react";
import LocationComponent from "../Location";
import { mapSlideType } from "@/types";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperClass } from "swiper/react";
import { Pagination } from "swiper/modules";
import HumiditySlide from "./HumiditySlide";
import { Lora, Poppins } from "next/font/google";
import ReactDOMServer from "react-dom/server";
import TempFeelsLike from "./TempFeelsLike";
import { ChevronRight, Navigation } from "react-feather";
import Map from "../Map";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

import "swiper/css/pagination";
const poppins = Poppins({
  weight: "300",
  subsets: ["latin"],
});
const lora = Lora({
  weight: "500",
  subsets: ["latin"],
  style: ["italic"],
});

const initialMaps = [
  {
    mapComponent: <Map key={1} index={1} posix={[126.983861, 37.57022]} />,
    city: "Seoul",
    country: "South Korea",
    time: "8:00 PM",
  },
  {
    mapComponent: <Map key={2} index={2} posix={[-7.62, 33.5945]} />,
    city: "Casablanca",
    country: "Morocco",
    time: "8:00 PM",
  },
];

const SideBar = () => {
  const [activeMapIndex, setActiveMapIndex] = useState(0);
  const [maps, setMaps] = useState<mapSlideType[]>(initialMaps);
  const { userLocation } = useSelector((state: RootState) => state.kalo);
  const handleSlideChange = (swiper: SwiperClass) => {
    setActiveMapIndex(swiper.activeIndex);
  };
  // useEffect(() => {
  //   let finalMaps = [];

  //   if (userLocation.latitude !== 0 && userLocation.longitude !== 0) {
  //     finalMaps = initialMaps.slice();
  //     finalMaps.unshift({
  //       mapComponent: (
  //         <Map
  //           key={0}
  //           index={0}
  //           posix={[userLocation.longitude, userLocation.latitude]}
  //         />
  //       ),
  //       city: "idk",
  //       country: "idk",
  //       time: "",
  //     });
  //   } else {
  //     finalMaps = initialMaps;
  //   }

  //   setMaps(finalMaps);
  // }, [userLocation]);
  useEffect(() => {
    let finalMaps = [];
    if (userLocation.latitude !== 0 && userLocation.longitude !== 0) {
      finalMaps = initialMaps.slice();
      finalMaps.unshift({
        mapComponent: (
          <Map
            key={0}
            index={0}
            posix={[userLocation.longitude, userLocation.latitude]}
          />
        ),
        city: "idk",
        country: "idk",
        time: "",
      });
    } else {
      finalMaps = initialMaps;
    }
    setMaps(finalMaps);
  }, [userLocation]);
  const slides: React.JSX.Element[] = [
    <HumiditySlide key={1} value={75} tooltipText="Humidity" />,
    <TempFeelsLike key={2} value={18} tooltipText="Temperature" />,
  ];

  return (
    <div className="w-80 flex flex-col justify-between gap-10 py-16 px-6 border border-white/30 mx-16 my-8 top-0 left-0 bottom-0 fixed rounded-3xl backdrop-blur-xl bg-[#7d7d7d4d]/30">
      <h1 className={"self-center text-4xl " + lora.className}>Kalopsium</h1>
      <div>
        <h3 className={"text-lightgrey/90 text-sm m-2 " + poppins.className}>
          Status
        </h3>
        <Swiper spaceBetween={50} slidesPerView={1} className="w-full h-48">
          {slides.map((slide, key) => (
            <SwiperSlide
              key={key}
              className="rounded-3xl bg-black/40 w-full h-full"
            >
              {slide}
            </SwiperSlide>
          ))}
        </Swiper>
        <h3
          className={
            "text-white/60 text-sm m-2 flex items-center gap-1 text-center justify-center " +
            poppins.className
          }
        >
          Swipe for more details
          <ChevronRight size={20} />
        </h3>
      </div>
      {maps.length && (
        <div>
          <h3 className={"text-lightgrey/90 text-sm m-2 " + poppins.className}>
            Area
          </h3>
          <div className="overflow-hidden w-full relative -top-7">
            <Swiper
              slidesPerView={"auto"}
              centeredSlides={true}
              draggable={false}
              pagination={{
                el: ".swiper-pagination",
                clickable: true,
                renderBullet: function (index, classname) {
                  return ReactDOMServer.renderToString(
                    <span
                      className={
                        classname +
                        "  flex items-center !w-2 !h-2 " +
                        (index === activeMapIndex &&
                        userLocation.latitude &&
                        userLocation.longitude
                          ? " !bg-transparent "
                          : " border border-white/40 rounded-full !bg-white")
                      }
                    >
                      {index === activeMapIndex &&
                      userLocation.latitude &&
                      userLocation.longitude ? (
                        <Navigation
                          fill="#ffffff"
                          size={15}
                          className="-translate-y-1 -translate-x-1"
                        />
                      ) : (
                        ""
                      )}
                    </span>
                  );
                },
              }}
              allowTouchMove={false}
              modules={[Pagination]}
              onSlideChange={handleSlideChange}
              className="w-[540px] h-52 -left-1/2 relative !top-0 !py-8"
            >
              <div className="swiper-pagination absolute !top-0 !left-2/3 h-8 !w-20 flex items-center gap-2 !-translate-x-1/2"></div>
              {maps.map((map, key) => (
                <SwiperSlide
                  key={key}
                  className={
                    "rounded-full overflow-hidden !w-40 !h-40 relative flex transition-opacity " +
                    (activeMapIndex === key ? "" : " !scale-75 ")
                  }
                >
                  <div
                    className={
                      "w-full h-full block !transition-all rounded-full " +
                      (activeMapIndex === key ? "opacity-1" : "opacity-45")
                    }
                  >
                    {map.mapComponent}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="rounded-3xl bg-black/20 border border-white/15 px-5 py-3 text-center w-9/12 m-auto">
            <span className={"text-lightgrey/90 text-sm " + poppins.className}>
              {maps[activeMapIndex].city}, {maps[activeMapIndex].country}
            </span>
          </div>
        </div>
      )}
      <LocationComponent />
    </div>
  );
};

export default SideBar;
