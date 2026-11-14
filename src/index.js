import "./styles.css";
import { fetchWeather } from "./weatherApi.js";
import { processWeatherData } from "./processWeather.js";
import { renderWeather } from "./ui.js";

const form = document.querySelector("#search-form");
const input = document.querySelector("#location-input");
const unitToggle = document.querySelector("#unit-toggle");

// The app remembers the last weather we got and which unit to show.
// That way the °F/°C toggle can just redraw, without another API call.
let currentWeather = null;
let unit = "F";

async function searchWeather(location) {
  try {
    const rawData = await fetchWeather(location);
    currentWeather = processWeatherData(rawData);
    renderWeather(currentWeather, unit);
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

unitToggle.addEventListener("click", () => {
  unit = unit === "F" ? "C" : "F";
  // The button shows the unit you can switch TO.
  unitToggle.textContent = unit === "F" ? "Show °C" : "Show °F";

  if (currentWeather) renderWeather(currentWeather, unit);
});
