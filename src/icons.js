// Visual Crossing sends an "icon" name like "rain" or "clear-day".
// We show a matching emoji so we don't need to import any image files.
const ICONS = {
  "clear-day": "☀️",
  "clear-night": "🌙",
  "partly-cloudy-day": "⛅",
  "partly-cloudy-night": "☁️",
  cloudy: "☁️",
  fog: "🌫️",
  wind: "💨",
  rain: "🌧️",
  "showers-day": "🌦️",
  "showers-night": "🌧️",
  "thunder-rain": "⛈️",
  "thunder-showers-day": "⛈️",
  "thunder-showers-night": "⛈️",
  snow: "❄️",
  "snow-showers-day": "🌨️",
  "snow-showers-night": "🌨️",
};

export function getIcon(iconName) {
  // Fall back to a thermometer if the API sends a name we don't know.
  return ICONS[iconName] ?? "🌡️";
}
