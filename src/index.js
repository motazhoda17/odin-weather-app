import "./styles.css";
import { fetchWeather } from "./weatherApi.js";
import { processWeatherData } from "./processWeather.js";

// Step 3: log only the data we need.
async function logWeather(location) {
  try {
    const rawData = await fetchWeather(location);
    console.log(processWeatherData(rawData));
  } catch (error) {
    console.error(error.message);
  }
}

logWeather("London");
