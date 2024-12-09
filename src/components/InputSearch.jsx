import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Swal from 'sweetalert2'

const InputSearch = ({ onCitySelect, recentSearches }) => {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const API_KEY = 'c1917f6dca402fcf7359e337f196e3fd';

  const fetchCities = async (query) => {
    if (query.length >= 3) {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
        );
        const data = await response.json();

        if (data.length === 0) {
          showAlert("error", "Ciudad no encontrada");
        }

        setSuggestions(data);
      } catch (error) {
        console.error('Error fetching cities:', error);
        showAlert("error", "Error de conexión. Inténtalo nuevamente.");
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchCities(value);
  };

  const handleCitySelect = (city) => {
    onCitySelect(city); // Llamar la función del padre
    setSearch(`${city.name}, ${city.country}`); // Actualizar el campo de búsqueda con el nombre de la ciudad seleccionada
    setSuggestions([]); // Limpiar sugerencias al seleccionar una
  };

  const showAlert = (type, message) => {
    Swal.fire({
      position: "top-end",
      icon: type,
      title: message,
      showConfirmButton: false,
      timer: 1500,
      toast: true,
    });
  };

  return (
    <section className="relative w-full">
      {/* Lista de búsquedas recientes */}
      {recentSearches.length > 0 && (
        <ul className="w-full max-w-md mx-auto mb-2 flex flex-wrap gap-2 items-center justify-center">
          {recentSearches.map((recent, index) => (
            <li
              key={index}
              className="p-2 cursor-pointer backdrop-blur-sm bg-white/30 w-auto rounded-md hover:shadow-md transition-all hover:scale-105 text-white"
              onClick={() => handleCitySelect({ name: recent.split(', ')[0], country: recent.split(', ')[1] })}
            >
              {recent}
            </li>
          ))}
        </ul>
      )}

      {/* Input de búsqueda */}
      <section className="w-full flex items-center justify-center">
        <label className="bg-white p-2 flex items-center gap-2 rounded-full md:w-96 shadow-md">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="text-gray-400 text-sm" />
          <input
            onChange={handleChange}
            value={search}
            type="text"
            name="Country"
            id="Country"
            className="border-0 outline-none w-full"
            placeholder="Buscar ciudad"
          />
        </label>
      </section>

      {/* Sugerencias de ciudades */}
      {suggestions.length > 0 && (
        <ul className="z-50 absolute left-1/2 transform -translate-x-1/2 bg-white shadow-md rounded-md mt-2 w-full max-w-md mx-auto">
          {suggestions.map((city, index) => (
            <li
              key={index}
              className="p-2 border-b last:border-b-0 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleCitySelect(city)}
            >
              {city.name}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default InputSearch;

