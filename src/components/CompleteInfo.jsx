import { FiSunrise, FiSunset } from "react-icons/fi";
import { IoIosWater } from "react-icons/io";
import { CgArrowsMergeAltV } from "react-icons/cg";
import { FaWind, FaTemperatureHalf } from "react-icons/fa6";
import { HiSun } from "react-icons/hi";
import { FaEye } from "react-icons/fa";
import { IoReturnUpBackOutline } from "react-icons/io5";

import { useLocation } from 'react-router-dom';
import { DetailItem } from "./DetailItem";

const CompleteInfo = () => {

    const location = useLocation();
    const { weatherData } = location.state || {}; // Recuperar datos del estado
    const { city, status, sunrise, sunset, pressure, wind, feels, visibility, humidity } = weatherData || {};

    return (

        <>
            <section className="flex items-center">
                <a href="/" className="text-white flex items-center gap-2 group">
                    <IoReturnUpBackOutline className="text-2xl group-hover:scale-125 transition-all" />
                
                </a>
            </section>
                <h1 className='text-white text-lg font-normal uppercase'>Weather details</h1>

            <div className='w-full backdrop-blur-sm bg-white/30 py-5 px-12 rounded-md gap-5 flex flex-col'>
                <h2 className='uppercase font-normal text-white'>{city}</h2>

                <section className='w-full grid grid-cols-4 gap-5'>
                    <DetailItem
                        title={"Sunrise"}
                        content={sunrise}
                        icon={<FiSunrise />} /
                    >

                    <DetailItem
                        title={"Sunset"}
                        content={sunset}
                        icon={<FiSunset />} /
                    >

                    <DetailItem
                        title={"Humidity"}
                        content={humidity}
                        icon={<IoIosWater />} /
                    >

                    <DetailItem
                        title={"Pressure"}
                        content={pressure}
                        icon={<CgArrowsMergeAltV />} /
                    >

                    <DetailItem
                        title={"Wind"}
                        content={wind}
                        icon={<FaWind />} /
                    >

                    <DetailItem
                        title={"Status"}
                        content={status}
                        icon={<HiSun />} /
                    >

                    <DetailItem
                        title={"Feels like"}
                        content={feels}
                        icon={<FaTemperatureHalf />} /
                    >

                    <DetailItem
                        title={"Visibility"}
                        content={visibility}
                        icon={<FaEye />} /
                    >

                </section>

            </div>
        </>
    )
}

export default CompleteInfo