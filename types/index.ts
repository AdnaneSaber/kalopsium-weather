export type kaloContextTypes = {
  theme: "light" | "dark";
  toggleTheme: () => void;
  setLocation: ({ longitude, latitude }: userLocationType) => void;
  userLocation: userLocationType;
};

export type userLocationType = {
  longitude: number;
  latitude: number;
};

export type mapSlideType = {
  mapComponent: React.JSX.Element;
  city: string;
  country: string;
};
