import React from 'react';

const WeatherAlert = ({ alert }) => {
  if (!alert) return null;

  return (
    <div className="bg-red-500 bg-opacity-20 backdrop-blur-lg rounded-lg p-4 mt-4">
      <h3 className="text-white font-bold">Weather Alert!</h3>
      <p className="text-white">{alert.description}</p>
    </div>
  );
};

export default WeatherAlert;