// The API gives us Fahrenheit. This converts to Celsius when needed.
export function fahrenheitToCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

// Formats a Fahrenheit temperature in the chosen unit ("F" or "C"),
// e.g. formatTemp(50, "C") -> "10°C"
export function formatTemp(fahrenheit, unit) {
  const value = unit === "C" ? fahrenheitToCelsius(fahrenheit) : fahrenheit;
  return `${Math.round(value)}°${unit}`;
}
