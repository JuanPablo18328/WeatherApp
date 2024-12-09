import PropTypes from "prop-types";
import 'animate.css';

export const DetailItem = ({ title, content, icon }) => {
  return (
    
      <div className='col-span-4 md:col-span-2 lg:col-span-1 flex items-center justify-between bg-[#EFF1F9] rounded-md p-5 animate__animated animate__fadeIn'>
        <div className='text-gray-800'>
            <p className='font-normal'>{title}</p>
            <p className='font-semibold'>{content}</p>
        </div>
        <div className='text-gray-800'>
            {icon}
        </div>
    </div>
    
  )
}

DetailItem.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired
}
