import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const fetchWeatherData = async (loc) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=b2bb492ce5f6d663fdad1fe0cc4fa50d&units=metric`);
      console.log('API response:', response);
      setWeatherData([...weatherData, response.data]);
      setError('');
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Invalid location or unable to fetch data');
    }
  };

  const handleSearch = () => {
    if (location) {
      fetchWeatherData(location);
      setLocation('');
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name or zip code"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={toggleDarkMode}>
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      {error && <div className="error">{error}</div>}
      <div className="weather-container">
        {weatherData.map((data, index) => (
          <div key={index} className="weather-info">
            <h2>{data.name}</h2>
            <p className="date">{new Date().toLocaleString()}</p>
            <p className="temp">{data.main.temp}°C</p>
            <p className="description">{data.weather[0].description}</p>
            <p>Humidity: {data.main.humidity}%</p>
            <p>Wind Speed: {data.wind.speed} m/s</p>
            <p>Pressure: {data.main.pressure} hPa</p>
            <p>Visibility: {data.visibility / 1000} km</p>
            <p>Min Temp: {data.main.temp_min}°C</p>
            <p>Max Temp: {data.main.temp_max}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
