// Weather object structure used in multiple types
type WeatherInfo = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

type WindInfo = {
  speed: number;
  deg: number;
  gust: number;
};

type MainWeatherData = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
  temp_kf: number;
};

type CloudsInfo = {
  all: number;
};

type SysInfo = {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
};

type Coordinates = {
  lon: number;
  lat: number;
};

export type ILocationWeatherResponse = {
  coord: Coordinates;
  weather: WeatherInfo[];
  base: string;
  main: MainWeatherData;
  visibility: number;
  wind: WindInfo;
  clouds: CloudsInfo;
  dt: number;
  sys: SysInfo;
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

export type ICityCoordsResponse = {
  name: string;
  local_names: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
};

export type IWeatherMapper = {
  title: { en: string; kr: string };
  description: { en: string; kr: string };
  icon: string;
  icon_night?: string;
};

export type WeatherData = {
  [key: number]: IWeatherMapper;
};

export type WeatherMessageResponse = {
  response: string;
  data: {
    cod: string;
    message: number;
    cnt: number;
    city: string;
    day_data: WeatherDayData;
    lang: string;
  };
};

export type WeatherDayData = {
  dt: number;
  main: MainWeatherData;
  weather: WeatherInfo[];
  clouds: CloudsInfo;
  wind: WindInfo;
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
};
type WeatherCityData = {
  id: number;
  name: string;
  coord: Coordinates;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
};

export type WeatherForcastData = {
  cod: number;
  message: number;
  cnt: number;
  list: WeatherDayData[];
  city: WeatherCityData;
};
