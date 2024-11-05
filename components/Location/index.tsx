import { AppDispatch } from "@/store";
import { setLocation } from "@/store/slices/weatherSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const LocationComponent = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        dispatch(
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        );
      });
    }
  }, [dispatch]);
  return null;
};

export default LocationComponent;
