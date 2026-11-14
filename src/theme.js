// Picks a background theme based on the current weather icon.
// The themes themselves are defined in styles.css using [data-theme="..."].
export function getTheme(iconName) {
  if (iconName.includes("snow")) return "snowy";
  if (iconName.includes("thunder")) return "stormy";
  if (iconName.includes("rain") || iconName.includes("showers")) return "rainy";
  if (iconName.includes("night")) return "night";
  if (iconName === "clear-day") return "sunny";
  return "cloudy"; // cloudy, partly-cloudy-day, fog, wind
}

export function applyTheme(iconName) {
  // Sets <html data-theme="sunny"> (for example), which the CSS reacts to.
  // We use <html> so the background covers the whole page, however long.
  document.documentElement.dataset.theme = getTheme(iconName);
}
