import { API_KEY } from "./config.js";

const BASE_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";

// Fetches the raw weather data for a location (city, address, zip code...).
// Returns the JSON from the API, or throws an Error with a helpful message.
export async function fetchWeather(location) {
  if (!API_KEY || API_KEY === "YOUR_API_KEY_HERE") {
    throw new Error(
      "No API key set. Copy src/config.example.js to src/config.js and add your key.",
    );
  }

  // encodeURIComponent makes spaces and commas safe to put in a URL,
  // e.g. "New York, NY" -> "New%20York%2C%20NY"
  // We always ask for US units (Fahrenheit, mph) and convert to Celsius
  // ourselves, so switching units doesn't need another API call.
  const url =
    `${BASE_URL}/${encodeURIComponent(location)}` +
    `?unitGroup=us&include=current,days&key=${API_KEY}&contentType=json`;

  const response = await fetch(url);

  // fetch only rejects on network failures. A bad location or bad key still
  // "succeeds", so we have to check response.ok ourselves.
  if (!response.ok) {
    if (response.status === 400) {
      throw new Error(`Couldn't find "${location}". Check the spelling and try again.`);
    }
    if (response.status === 401) {
      throw new Error("The API key was rejected. Double-check src/config.js.");
    }
    if (response.status === 429) {
      throw new Error("Daily request limit reached. Try again tomorrow.");
    }
    throw new Error(`Something went wrong (error ${response.status}).`);
  }

  return response.json();
}
