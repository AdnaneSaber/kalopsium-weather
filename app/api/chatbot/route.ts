import { WeatherMessageResponse } from "@/types/weather";
import axios from "axios";
const BASE_URL = process.env.KALOPSIUM_AI_URL;

export const POST = async (request: Request): Promise<Response> => {
  let query = null;
  try {
    query = await request.json();
  } catch (error) {
    return Response.json({ message: "Query is required.", error });
  }
  try {
    const url = `${BASE_URL}messenger/`;
    const { data, status } = await axios.post<WeatherMessageResponse>(
      url,
      query
    );

    if (status === 200) {
      return Response.json(data, { status: 200 });
    } else {
      return Response.json(data, { status });
    }
  } catch (error) {
    return Response.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
};
