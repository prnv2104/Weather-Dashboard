import React, { useState, useEffect } from "react";
import WeatherCard from "./components/WeatherCard";
import SearchBar from "./components/SearchBar";
import ForecastCard from "./components/ForecastCard";
import TemperatureToggle from "./components/TemperatureToggle";
import WeatherAlert from "./components/WeatherAlert";
import { fetchWeatherData, fetchForecast } from "./services/weatherService";
import { getCurrentLocation } from "./services/locationService";

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState("C");

  useEffect(() => {
    // Get user's location on load
    const getLocationWeather = async () => {
      try {
        console.log("Getting user location...");
        const coords = await getCurrentLocation();
        console.log("Got coordinates:", coords);
        // const data = await fetchWeatherData(coords);
        const [weatherData, forecastData] = await Promise.all([
          fetchWeatherData(coords),
          fetchForecast(coords),
        ]);
        setWeather(weatherData);
        const groupedForecast = {};
        forecastData.list.forEach((item) => {
          const date = item.dt_txt.split(" ")[0];
          if (!groupedForecast[date]) groupedForecast[date] = [];
          groupedForecast[date].push(item);
        });

        const processedForecast = Object.entries(groupedForecast)
          .slice(1,6) // Get only 5 days of forecast
          .map(([date, items]) => items[3]) // 
          .filter(Boolean) // Filter out undefined entries (in case less than 5 entries exist)
          .map((item) => ({
            date: item.dt_txt.split(" ")[0],
            temp:
              unit === "C"
                ? Math.round(item.main.temp - 273.15)
                : Math.round(((item.main.temp - 273.15) * 9) / 5 + 32), // Convert Kelvin to Celsius
            description: item.weather[0].description,
          }));
        setForecast(processedForecast);
        // console.log('Fetched weather data:', data);
        // setWeather(data);
      } catch (err) {
        console.error("Error getting location:", err);
      }
    };

    getLocationWeather();
  }, [unit]);

  const handleSearch = async (city) => {
    try {
      setLoading(true);
      setError(null);
      const [weatherData, forecastData] = await Promise.all([
        fetchWeatherData(city),
        fetchForecast(city),
      ]);
      setWeather(weatherData);
      const groupedForecast = {};
      forecastData.list.forEach((item) => {
        const date = item.dt_txt.split(" ")[0];
        if (!groupedForecast[date]) groupedForecast[date] = [];
        groupedForecast[date].push(item);
      });

      const processedForecast = Object.entries(groupedForecast)
        .slice(1, 6)
        .map(([date, items]) => items[3]) // 5th entry (index 4)
        .filter(Boolean) // Filter out undefined entries (in case less than 5 entries exist)
        .map((item) => ({
          date: item.dt_txt.split(" ")[0],
          temp:
            unit === "C"
              ? Math.round(item.main.temp - 273.15)
              : Math.round(((item.main.temp - 273.15) * 9) / 5 + 32), // Convert Kelvin to Celsius
          description: item.weather[0].description,
        }));
      setForecast(processedForecast);
    } catch (err) {
      setError("City not found. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Weather Forecast
        </h1>
        <SearchBar onSearch={handleSearch} />
        <TemperatureToggle
          unit={unit}
          onToggle={() => {
            console.log("Toggling temperature unit from", unit);
            setUnit(unit === "C" ? "F" : "C");
          }}
        />
        {loading && (
          <div className="text-white text-center mt-8">Loading...</div>
        )}
        {error && <div className="text-red-200 text-center mt-8">{error}</div>}
        {weather && (
          <>
            <WeatherCard weather={weather} unit={unit} />
            {weather.alerts &&
              (console.log("Weather alert detected:", weather.alerts[0]),
              (<WeatherAlert alert={weather.alerts[0]} />))}
            {forecast && <ForecastCard forecast={forecast} unit={unit} />}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
