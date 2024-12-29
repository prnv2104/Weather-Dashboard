import React from 'react';

const TemperatureToggle = ({ unit, onToggle }) => {
  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={onToggle}
        className="bg-white bg-opacity-20 px-4 py-2 rounded-lg text-white hover:bg-opacity-30"
      >
        Switch to {unit === 'C' ? '°F' : '°C'}
      </button>
    </div>
  );
};

export default TemperatureToggle;