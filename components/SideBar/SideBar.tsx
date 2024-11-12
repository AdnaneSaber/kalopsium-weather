"use client";
import React, { useEffect, useMemo, useState } from "react";
import LocationComponent from "../Location";
import { mapSlideType } from "@/types";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperClass } from "swiper/react";
import { Pagination } from "swiper/modules";
import HumiditySlide from "./HumiditySlide";
import { Poppins } from "next/font/google";
import ReactDOMServer from "react-dom/server";
import TempFeelsLike from "./TempFeelsLike";
import { ChevronRight, Navigation } from "react-feather";
import Map from "../Map";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";

import "swiper/css/pagination";
import { fetchWeatherData } from "@/store/slices/weatherSlice";
import { useLocale, useTranslations } from "next-intl";
const poppins = Poppins({
  weight: ["100", "200", "300"],
  subsets: ["latin"],
});

const SideBar = () => {
  const t = useTranslations();
  const initialMaps = useMemo(() => {
    return [
      {
        mapComponent: (
          <Map key={1} index={1} posix={[2.3200410217200766, 48.8588897]} />
        ),
        city: t("cities.paris"),
        country: "FR",
      },
      {
        mapComponent: (
          <Map key={2} index={2} posix={[37.6174943, 55.7504461]} />
        ),
        city: t("cities.moscow"),
        country: "RU",
      },
    ];
  }, [t]);
  const [activeMapIndex, setActiveMapIndex] = useState(0);
  const [maps, setMaps] = useState<mapSlideType[]>(initialMaps);
  const { location } = useSelector((state: RootState) => state.weather);
  const dispatch = useDispatch<AppDispatch>();
  const lang = useLocale();
  const { data: locationData } = useSelector(
    (state: RootState) => state.weather
  );

  const handleSlideChange = (swiper: SwiperClass) => {
    setActiveMapIndex(swiper.activeIndex);
  };
  useEffect(() => {
    if (location.latitude !== 0 && location.longitude !== 0) {
      dispatch(fetchWeatherData({ location, lang }));
    } else {
      setMaps(initialMaps);
    }
  }, [dispatch, location, lang, initialMaps]);
  useEffect(() => {
    if (locationData) {
      const finalMaps = initialMaps.slice();
      finalMaps.unshift({
        mapComponent: (
          <Map
            key={0}
            index={0}
            posix={[locationData.coord.lon, locationData.coord.lat]}
          />
        ),
        city: locationData.name,
        country: locationData.sys.country,
      });
      setMaps(finalMaps);
    }
  }, [locationData, initialMaps]);

  const slides: React.JSX.Element[] = [
    <HumiditySlide
      key={1}
      value={locationData?.main.humidity || 75}
      tooltipText={t("humidity")}
    />,
    <TempFeelsLike
      key={2}
      value={locationData?.main.feels_like || 18}
      tooltipText={t("temperature")}
    />,
  ];

  return (
    <div className="w-80 flex flex-col justify-between gap-10 pt-16 pb-10 px-6 border border-white/30 top-0 left-0 bottom-0 relative rounded-3xl backdrop-blur-xl bg-[#7d7d7d4d]/15">
      <h1
        className={"self-center text-4xl italic font-thin " + poppins.className}
      >
        Kalopsium
      </h1>
      <div>
        <h3 className={"text-lightgrey/90 text-sm m-2 " + poppins.className}>
          {t("status")}
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
            "text-white/60 text-xs m-2 flex items-center gap-1 text-center justify-center " +
            poppins.className
          }
        >
          {t("swipe")}
          <ChevronRight size={20} />
        </h3>
      </div>
      {maps.length && (
        <div>
          <h3 className={"text-lightgrey/90 text-sm m-2 " + poppins.className}>
            {t("area")}
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
                        location.latitude &&
                        location.longitude
                          ? " !bg-transparent "
                          : " border border-white/40 rounded-full !bg-white")
                      }
                    >
                      {index === activeMapIndex &&
                      location.latitude &&
                      location.longitude ? (
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
                      (activeMapIndex === key ? "opacity-75" : "opacity-45")
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
