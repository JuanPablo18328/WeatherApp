import PropTypes from "prop-types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloud } from '@fortawesome/free-solid-svg-icons'

export const TemperatureInfo = ({ celsius, weatherStatus }) => {
  return (
    <div className='flex items-center gap-5'>

        <FontAwesomeIcon icon={faCloud} className='text-white text-6xl' />   

        <div>
            <p className='font-semibold text-white text-6xl'>{celsius}</p>
            <p className='font-normal text-white'>{weatherStatus}</p>
        </div>
    </div>
  )
}

TemperatureInfo.propTypes = {
  celsius: PropTypes.string.isRequired,
  weatherStatus: PropTypes.string.isRequired
}

