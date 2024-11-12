import Chat from "@/components/Chat";
import Footer from "@/components/Landing/Footer";
import RegionWeatherWidget from "@/components/Landing/RegionWeatherWidget";
import Wallpaper from "@/components/Landing/Wallpaper";

export function generateMetadata() {
  return {
    title: "Kalopsium - Weather Assistant",
    description: "Kalopsium - Weather AI assistant",
  };
}
export default async function Home() {
  return (
    <>
      <Wallpaper />
      <div className="grid grid-cols-11 grid-rows-7 w-full h-full">
        <div className="col-span-5 row-span-4 flex flex-col h-full w-full justify-between">
          <RegionWeatherWidget />
        </div>
        <div className="col-span-6 row-span-4">
          <Chat />
        </div>
        <div className="col-span-11 row-span-3">
          <Footer />
        </div>
      </div>
    </>
  );
}
