"use client";
import { Poppins } from "next/font/google";
import "./globals.css";
import SideBar from "@/components/SideBar/SideBar";
import { Provider } from "react-redux";
import { store } from "../store";

import "swiper/css";
import "swiper/css/pagination";
import "leaflet/dist/leaflet.css";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.className}>
      <body className="p-0 m-0 flex w-full">
        <Provider store={store}>
          <div className="px-16 py-14 flex w-full h-screen">
            <SideBar />
            <div className="mx-16 w-full">
              {children}
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
}
