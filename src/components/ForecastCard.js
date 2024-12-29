import React from 'react';

const ForecastCard = ({ forecast, unit }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
      {forecast.map((day, index) => (
        <div key={index} className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-4 text-center">
          <div className="text-white font-semibold">{day.date}</div>
          <div className="text-3xl text-white">{day.temp}°{unit}</div>
          <div className="text-white">{day.description}</div>
        </div>
      ))}
    </div>
  );
};

export default ForecastCard;