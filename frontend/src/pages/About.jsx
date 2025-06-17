import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="about_image" />
        <div className='flex flex-col justify-center gap-6 md:w-1/2 text-sm text-gray-600'>
          <p>Welcome to Docify, your reliable companion for managing healthcare appointments and medical needs with ease and efficiency. At Docify, we recognize the everyday difficulties people face in booking doctor visits and maintaining their health information.</p>
          <p>Docify is dedicated to innovation in digital healthcare. We continuously improve our platform by adopting the latest technologies to enhance usability and deliver top-notch services. Whether it's your first consultation or part of ongoing treatment, Docify is here to guide and assist you throughout the journey.</p>
          <b className='text-gray-800'>Our Vision</b>
          <p>At Docify, our vision is to simplify healthcare access for all. We aim to connect patients with medical professionals seamlessly, ensuring timely and convenient care is always within reach.</p>
        </div>
      </div>
      <div className='text-xl my-4'>
        <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
      </div>
      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-5 md:px-10 py-4 sm:py-8 flex flex-col gap-5 text-[15px] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>EFFICIENCY:</b>
          <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>
        <div className='border px-5 md:px-10 py-4 sm:py-8 flex flex-col gap-5 text-[15px] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>CONVENIENCE:</b>
          <p>Access to a network of trusted healthcare professionals in your area.</p>
        </div>
        <div className='border px-5 md:px-10 py-4 sm:py-8 flex flex-col gap-5 text-[15px] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>PERSONALIZATION:</b>
          <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
      </div>
    </div>
  )
}

export default About