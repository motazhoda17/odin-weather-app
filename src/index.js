import "./styles.css";
import { fetchWeather } from "./weatherApi.js";
import { processWeatherData } from "./processWeather.js";

const form = document.querySelector("#search-form");
const input = document.querySelector("#location-input");

// Step 4: search with the form, still just logging the result.
async function searchWeather(location) {
  try {
    const rawData = await fetchWeather(location);
    console.log(processWeatherData(rawData));
  } catch (error) {
    console.error(error.message);
  }
}

form.addEventListener("submit", (event) => {
  // Stop the form from reloading the page (its default behaviour).
  event.preventDefault();

  const location = input.value.trim();
  if (location === "") return;

  searchWeather(location);
});
