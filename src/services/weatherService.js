import axios from 'axios';

const API_KEY = '1209741a0698ecdef6e4ac912e06a05b'; // Get this from OpenWeatherMap
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherData = async (query) => {
    try {
      console.log('Fetching weather data for query:', query);
      let url;
      if (typeof query === 'object' && query.lat && query.lon) {
        url = `${BASE_URL}/weather?lat=${query.lat}&lon=${query.lon}&appid=${API_KEY}`;
        console.log('Using coordinates to fetch weather data');
      } else {
        url = `${BASE_URL}/weather?q=${query}&appid=${API_KEY}`;
        console.log('Using city name to fetch weather data');
      }
      
      console.log('Making API request to:', url);
      const response = await axios.get(url);
      console.log('Received weather data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch weather data');
    }
  };

  export const fetchForecast = async (query) => {
    try {
        console.log('Fetching forecast data for query:', query);
        let url;
        if (typeof query === 'object' && query.lat && query.lon) {
          url = `${BASE_URL}/forecast?lat=${query.lat}&lon=${query.lon}&appid=${API_KEY}`;
          console.log('Using coordinates to fetch forecast data');
        } else {
          url = `${BASE_URL}/forecast?q=${query}&appid=${API_KEY}`;
          console.log('Using city name to fetch forecast data');
        }
        
        console.log('Making API request to:', url);
        const response = await axios.get(url);
        console.log('Received forecast data:', response.data);
        return response.data;
    } catch (error) {
      console.error('Error fetching forecast data:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch forecast data');
    }
  };
