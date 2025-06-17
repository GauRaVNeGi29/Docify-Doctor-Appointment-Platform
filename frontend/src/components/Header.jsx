import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-[var(--color-primary)] rounded-lg px-6 md:px-10 lg:px-20'>
      <div className='md:w-1/2 flex flex-col items-start justify-center gap-3 py-9 md:py-[9vw]'>
        <p className='text-2xl md:text-3xl lg:text-4xl text-white font-semibold leading-snug'>
          Book Appointment <br /> With Trusted Doctors
        </p>
        <div className='flex flex-col flex-row items-center gap-3 text-white text-sm font-light'>
          <img className='w-18' src={assets.group_profiles} alt="group_profile" />
          <p className='text-white'>
            Simply browse through our list of trusted doctors, <br className='hidden sm:block' /> schedule your appointment hassle-free.
          </p>
        </div>
        <a href="#speciality" className="flex items-center gap-2 bg-white text-gray-600 rounded-full text-sm hover:scale-105 transition-all duration 300 m-auto md:m-0 px-8 py-3">
          Book Appointment <img className='w-3' src={assets.arrow_icon} alt="arrow" />
        </a>
      </div>

      <div className='md:w-1/2 relative'>
        <img className='w-full md:absolute bottom-0 h-auto rounded-lg' src={assets.header_img} alt="header" />
      </div>
    </div>
  )
}

export default Header
