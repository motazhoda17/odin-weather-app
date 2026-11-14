// The API sends back a LOT of data. This turns it into a small object
// with only what our app actually displays.
// All temperatures are in Fahrenheit (we asked the API for US units).
export function processWeatherData(data) {
  const current = data.currentConditions;

  return {
    location: data.resolvedAddress,
    description: data.description,
    current: {
      temp: current.temp,
      feelsLike: current.feelslike,
      conditions: current.conditions,
      icon: current.icon,
      humidity: current.humidity,
      windSpeed: current.windspeed,
      // Chance of rain can be null, so fall back to 0.
      precipChance: current.precipprob ?? 0,
    },
    // Only keep the next 7 days for the forecast row.
    forecast: data.days.slice(0, 7).map((day) => ({
      date: day.datetime,
      high: day.tempmax,
      low: day.tempmin,
      conditions: day.conditions,
      icon: day.icon,
    })),
  };
}
