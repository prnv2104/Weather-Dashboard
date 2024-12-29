import React from 'react';
import { WiHumidity, WiStrongWind } from 'react-icons/wi';

const WeatherCard = ({ weather, unit }) => {
    const temp = unit === 'C' ? 
      Math.round(weather.main.temp- 273.15) : 
      Math.round(((weather.main.temp- 273.15) * 9/5) + 32);
  return (
    <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-8 mt-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          {weather.name}, {weather.sys.country}
        </h2>
        <div className="text-6xl font-bold text-white mb-4">
          {/* {Math.round(weather.main.temp - 273.15)}°C */}
          {temp}°{unit}
        </div>
        <div className="text-xl text-white mb-8">
          {weather.weather[0].description}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center justify-center bg-white bg-opacity-20 rounded-lg p-4">
          <WiHumidity className="text-4xl text-white mr-2" />
          <div>
            <div className="text-sm text-white">Humidity</div>
            <div className="text-xl font-bold text-white">
              {weather.main.humidity}%
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center bg-white bg-opacity-20 rounded-lg p-4">
          <WiStrongWind className="text-4xl text-white mr-2" />
          <div>
            <div className="text-sm text-white">Wind Speed</div>
            <div className="text-xl font-bold text-white">
              {weather.wind.speed} m/s
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;