import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import InputSearch from './components/InputSearch';
import WeatherInformation from './components/WeatherInformation';
import CompleteInfo from './components/CompleteInfo';

function WeatherApp() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);

  const API_KEY = 'c1917f6dca402fcf7359e337f196e3fd';

  useEffect(() => {
    // Cargar búsquedas recientes desde localStorage al montar el componente
    const savedSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    setRecentSearches(savedSearches);
  }, []);
  
  const fetchWeather = async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      setWeatherData({
        sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
        sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
        pressure: `${data.main.pressure} hPa`,
        visibility: `${(data.visibility / 1000).toFixed(1)} km`,
        feels: `${Math.round(data.main.feels_like)}°C`,
        humidity: `${data.main.humidity}%`,
        wind: `${Math.round(data.wind.speed)} km/h`,
        city: `${city.name}, ${city.country}`,
        temperature: `${Math.round(data.main.temp)}°C`,
        status: data.weather[0].description,
        date: new Date().toLocaleDateString(),
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    fetchWeather(city);

    const searchString = `${city.name}, ${city.country}`;
    setRecentSearches((prev) => {
      const updatedSearches = [searchString, ...prev.filter((s) => s !== searchString)];
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches.slice(0, 5))); // Persistir en localStorage
      return updatedSearches.slice(0, 5);
    });
  };

  return (
    <div className="w-screen h-screen bg-backgroundMajor bg-no-repeat bg-cover bg-center">
      <section className="p-5 w-full h-full">
        <section className="flex flex-col justify-center items-center gap-10 h-full">
          <Router>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <h1 className="text-white text-lg font-normal uppercase">Weather App</h1>
                    <InputSearch onCitySelect={handleCitySelect} recentSearches={recentSearches} />
                    {weatherData && <WeatherInformation weatherData={weatherData} />}
                  </>
                }
              />
              <Route path="/more-details" element={<CompleteInfo />} />
            </Routes>
          </Router>
        </section>
      </section>
    </div>
  );
}

export default WeatherApp;
