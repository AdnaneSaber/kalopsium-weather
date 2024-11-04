import { kaloContextTypes } from "@/types";
import { createContext, useContext, useState } from "react";

const kaloContextDefaultValues: kaloContextTypes = {
  theme: "dark",
  toggleTheme: () => {},
  setLocation: () => {},
  userLocation: {
    longitude: 0,
    latitude: 0,
  },
};

const KaloContext = createContext<kaloContextTypes>(kaloContextDefaultValues);

export function useKaloContext() {
  return useContext(KaloContext);
}

type Props = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: Props) {
  const [theme, setTheme] = useState<kaloContextTypes["theme"]>("dark");
  const [userLocation, setUserLocation] = useState<
    kaloContextTypes["userLocation"]
  >(kaloContextDefaultValues.userLocation);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  const setLocation = (location: kaloContextTypes["userLocation"]) => {
    // Check if the new location is different before updating
    if (
      location.longitude !== userLocation.longitude ||
      location.latitude !== userLocation.latitude
    ) {
      setUserLocation(location);
    }
  };

  const value = {
    theme,
    userLocation,
    toggleTheme,
    setLocation,
  };

  return (
    <KaloContext.Provider value={value}>
      {children}
    </KaloContext.Provider>
  );
}
