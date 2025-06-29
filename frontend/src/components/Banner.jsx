import React, {useState} from 'react'
import {assets} from '../assets/assets'
import {useNavigate} from 'react-router-dom'

const Banner = () => {
    const navigate = useNavigate();
    const [imgLoaded, setImgLoaded] = useState(false);
    const [imgError, setImgError] = useState(false);
  return (
    <div className='flex flex-col md:flex-row bg-[var(--color-primary)] rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10'>
      <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5'>
        <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white'>
          <p>Book Appointment</p>
          <p className='pt-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl'>
            With 100+ Trusted Doctors
          </p>
        </div>
        <button
          onClick={() => {
            navigate("/login");
            scrollTo(0, 0);
          }}
          className='bg-white text-sm sm:text-base text-gray-600 px-8 py-3 cursor-pointer rounded-full mt-6 hover:scale-105 transition-all duration-300'
        >
          Create Account
        </button>
      </div>

      {/* Image + Loader */}
      <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
        {!imgLoaded && !imgError && (
          <div className="w-full h-full max-w-md bg-gray-300 animate-pulse absolute bottom-0 right-0 rounded-md" />
        )}

        {!imgError && (
          <img
            className={`w-full max-w-md absolute bottom-0 right-0 transition-opacity duration-300 ${
              imgLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            src={assets.appointment_img}
            alt="appointment_img"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
          />
        )}

        {imgError && (
          <div className="w-full h-full max-w-md bg-gray-400 absolute bottom-0 right-0 rounded-md flex items-center justify-center text-white font-medium">
            Image not available
          </div>
        )}
      </div>
    </div>
  )
}

export default Banner