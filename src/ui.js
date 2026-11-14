import { formatTemp } from "./units.js";
import { getIcon } from "./icons.js";
import { applyTheme } from "./theme.js";

const weatherContainer = document.querySelector("#weather");
const statusMessage = document.querySelector("#status");
const searchButton = document.querySelector("#search-form button");

// Small helper so we don't repeat createElement + className + textContent.
// We use textContent (not innerHTML) so text from the API or the user can
// never be run as HTML.
function createElement(tag, className, text = "") {
  const element = document.createElement(tag);
  element.className = className;
  element.textContent = text;
  return element;
}

// Turns "2026-11-14" into a short day name like "Sat".
function formatDay(dateString) {
  // Adding "T00:00" makes JavaScript read the date in local time. Without
  // it, the date is read as UTC and can show up as the day before.
  const date = new Date(`${dateString}T00:00`);
  return date.toLocaleDateString("en-US", { weekday: "short" });
}

function createCurrentCard(weather, unit) {
  const { current } = weather;
  const card = createElement("section", "current");

  card.append(
    createElement("h2", "current__location", weather.location),
    createElement("p", "current__icon", getIcon(current.icon)),
    createElement("p", "current__temp", formatTemp(current.temp, unit)),
    createElement("p", "current__conditions", current.conditions),
    createElement("p", "current__description", weather.description),
  );

  const details = createElement("ul", "current__details");
  details.append(
    createElement("li", "", `Feels like ${formatTemp(current.feelsLike, unit)}`),
    createElement("li", "", `Humidity ${Math.round(current.humidity)}%`),
    createElement("li", "", `Wind ${Math.round(current.windSpeed)} mph`),
    createElement("li", "", `Rain ${Math.round(current.precipChance)}%`),
  );
  card.append(details);

  return card;
}

function createForecast(forecast, unit) {
  const list = createElement("ul", "forecast");

  forecast.forEach((day) => {
    const item = createElement("li", "forecast__day");
    item.append(
      createElement("p", "forecast__name", formatDay(day.date)),
      createElement("p", "forecast__icon", getIcon(day.icon)),
      createElement(
        "p",
        "forecast__temps",
        `${formatTemp(day.high, unit)} / ${formatTemp(day.low, unit)}`,
      ),
    );
    item.title = day.conditions; // shows the conditions on hover
    list.append(item);
  });

  return list;
}

// Clears the old weather and draws the new one in the chosen unit.
export function renderWeather(weather, unit) {
  applyTheme(weather.current.icon);
  weatherContainer.replaceChildren(
    createCurrentCard(weather, unit),
    createForecast(weather.forecast, unit),
  );
}

// Shows the loading message from the moment the form is submitted until
// the API answers. The button is disabled so you can't search twice at once.
export function showLoading(location) {
  statusMessage.className = "status status--loading";
  statusMessage.textContent = `Loading weather for ${location}...`;
  searchButton.disabled = true;
}

export function hideLoading() {
  statusMessage.className = "status";
  statusMessage.textContent = "";
  searchButton.disabled = false;
}

export function showError(message) {
  statusMessage.className = "status status--error";
  statusMessage.textContent = message;
  // Clear old weather so it isn't mistaken for the place you just searched.
  weatherContainer.replaceChildren();
}
