# Weather App

My solution to the [Weather App](https://www.theodinproject.com/lessons/node-path-javascript-weather-app) project from The Odin Project's Full Stack JavaScript path.

Search for any city, address or zip code to see the current weather and a 7 day forecast, using the [Visual Crossing Weather API](https://www.visualcrossing.com/weather-api/).

## Features

- Search form that fetches the weather with `async` / `await`
- Current temperature, "feels like", conditions, humidity, wind and chance of rain
- 7 day forecast with highs and lows
- °F / °C toggle (converts the saved data, so it doesn't make another API call)
- Background color changes with the weather (sunny, cloudy, rainy, stormy, snowy, night)
- Loading message with a spinner while waiting for the API, and the search button is disabled until it answers
- Friendly error messages for a location that can't be found, a bad API key, the daily limit, or no internet connection
- Works on phone-sized screens

## Getting your free API key (do this first)

Visual Crossing needs an API key. It's free (up to 1000 requests a day) and you don't need a credit card.

1. Sign up at <https://www.visualcrossing.com/sign-up>.
2. After logging in, open your **Account** page. Your key is shown there.
3. In this project, copy the example config file:

   ```bash
   cp src/config.example.js src/config.js
   ```

4. Open `src/config.js` and replace `YOUR_API_KEY_HERE` with your key.

`src/config.js` is in `.gitignore`, so **your key is never committed**. Only `src/config.example.js` (with the placeholder) is in the repo. If you forget this step, the app tells you when you search.

> Heads up: in a front-end app, anything in the JavaScript (including the key) can be seen by anyone who opens DevTools on the live site. That's normal for small free-tier learning projects like this. Real apps hide keys behind their own back-end server, which comes later in the curriculum.

## How to run

```bash
npm install      # install Webpack and friends
npm run dev      # start the dev server, then open the URL it prints (usually http://localhost:8080)
npm run build    # make a production build in dist/
```

## How the code is organized

| File | Job |
| --- | --- |
| `src/index.js` | Connects everything: handles the form, the unit toggle, and the app's state |
| `src/weatherApi.js` | `fetchWeather(location)` calls the API and turns bad responses into helpful errors |
| `src/processWeather.js` | `processWeatherData(data)` picks out only the data the app needs |
| `src/ui.js` | Draws the weather, loading message and errors on the page |
| `src/units.js` | Fahrenheit to Celsius conversion and temperature formatting |
| `src/icons.js` | Maps Visual Crossing icon names to emojis |
| `src/theme.js` | Picks a background theme from the weather |
| `src/config.example.js` | Template for your API key (copy it to `src/config.js`) |
| `webpack.common.js`, `webpack.dev.js`, `webpack.prod.js` | Webpack settings, split with `webpack-merge` |

## What I practiced

- Working with a real API using `fetch` and `async` / `await`
- Handling errors with `try` / `catch`, and checking `response.ok` (fetch doesn't reject on a 400 or 401)
- Turning a big JSON response into a small object with only what I need
- Keeping the app's state (the last result and the chosen unit) so the toggle can re-render without fetching
- Showing a loading state
- Keeping secrets out of Git with `.gitignore`
- Webpack with separate dev and production configs

## Credits

Weather data provided by [Visual Crossing](https://www.visualcrossing.com/).
