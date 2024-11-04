"use client";
import { Poppins } from "next/font/google";
import "./globals.css";
import SideBar from "@/components/SideBar/SideBar";
import Image from "next/image";
import { ThemeProvider } from "./theme-provider";

import 'swiper/css';
import 'swiper/css/pagination';
import "leaflet/dist/leaflet.css"


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
      <body className="p-16 my-8">
        <ThemeProvider>
          <Image
            src={"/skynight.jpg"}
            alt="Kalopsium"
            width={4000}
            height={4000}
            priority
            className="w-screen h-screen absolute top-0 left-0 object-center"
          />
          <SideBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
