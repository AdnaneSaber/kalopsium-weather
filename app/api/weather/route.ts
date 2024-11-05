import { ILocationWeatherResponse } from "@/types/weather";
import axios from "axios";
import { type NextRequest } from "next/server";
const API_KEY = process.env.WEATHER_APIKEY;
const BASE_URL = process.env.WEATHER_URL;

export const GET = async (request: NextRequest): Promise<Response> => {
  const searchParams = request.nextUrl.searchParams;
  const latitude = searchParams.get("latitude");
  const longitude = searchParams.get("longitude");
  if (!longitude || !latitude) {
    return Response.json({ message: "Longitude and latitude are required." });
  }
  try {
    const url = `${BASE_URL}/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
    const { data, status } = await axios.get<ILocationWeatherResponse>(url);

    if (status === 200) {
      return Response.json(data, { status: 200 });
    } else {
      return Response.json(data, { status: status });
    }
  } catch (error) {
    return Response.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
};
