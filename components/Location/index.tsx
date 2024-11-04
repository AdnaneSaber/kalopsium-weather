import { userLocationType } from "@/types";
import { useEffect } from "react";

export default function LocationComponent({
  setLocation,
}: {
  setLocation: ({ latitude, longitude }: userLocationType) => void;
}) {
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  }, [setLocation]);
  return null;
}
