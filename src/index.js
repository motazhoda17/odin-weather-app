import "./styles.css";
import { fetchWeather } from "./weatherApi.js";

// Step 2 of the assignment: just log the raw data for now.
fetchWeather("London")
  .then((data) => console.log(data))
  .catch((error) => console.error(error.message));
