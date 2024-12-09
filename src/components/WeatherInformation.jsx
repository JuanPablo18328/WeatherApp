import { TemperatureInfo } from './TemperatureInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import 'animate.css';

const WeatherInformation = ({ weatherData }) => {
  const { city, temperature, status, date } = weatherData;
  const navigate = useNavigate(); // Hook para navegar

  const handleMoreDetails = () => {
    navigate('/more-details', { state: { weatherData } }); // Navegar con estado
  };

  return (
    <section className="w-full flex flex-col justify-center items-center gap-10 animate__animated animate__fadeIn">
      <div className="w-full flex flex-col items-center justify-center">
        <h2 className="font-semibold text-white text-4xl">{city}</h2>
        <p className="font-normal text-white">{date}</p>
      </div>

      <article className="w-full flex flex-col gap-5 items-center justify-evenly">
        <TemperatureInfo celsius={temperature} weatherStatus={status} />

        <button
          onClick={handleMoreDetails}
          className="text-white flex items-center gap-2 border border-white p-2 rounded-md transition-all hover:bg-white hover:text-black hover:bg-opacity-50 group"
        >
          More details
          <FontAwesomeIcon className="transition-all group-hover:translate-x-1" icon={faArrowRight} />
        </button>
      </article>
    </section>
  );
};

export default WeatherInformation;
