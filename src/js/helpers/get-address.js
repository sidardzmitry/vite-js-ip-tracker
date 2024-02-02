import { API_KEY } from "../helpers";

export async function getAddress(ip = "8.8.8.8") {
  const response = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${ip}`
  );

  return await response.json();
}
