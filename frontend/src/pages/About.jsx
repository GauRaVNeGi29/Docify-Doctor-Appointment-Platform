import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  const imageLoaded = !!assets.about_image;

  if (!imageLoaded) {
    // Full loading UI
    return (
      <div className='p-6 animate-pulse space-y-6'>
        <div className='h-6 w-40 bg-gray-300 rounded'></div>
        <div className='flex flex-col md:flex-row gap-12'>
          <div className='w-full md:max-w-[360px] h-[240px] bg-gray-300 rounded'></div>
          <div className='flex-1 space-y-4'>
            <div className='h-4 bg-gray-300 rounded w-3/4'></div>
            <div className='h-4 bg-gray-300 rounded w-4/5'></div>
            <div className='h-4 bg-gray-300 rounded w-2/3'></div>
            <div className='h-4 bg-gray-300 rounded w-3/5'></div>
          </div>
        </div>
        <div className='h-6 w-56 bg-gray-300 rounded'></div>
        <div className='flex flex-col md:flex-row gap-4'>
          {[1, 2, 3].map((_, i) => (
            <div key={i} className='flex-1 p-6 border bg-gray-100 rounded space-y-3'>
              <div className='h-4 bg-gray-300 rounded w-1/2'></div>
              <div className='h-3 bg-gray-300 rounded w-full'></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Actual Content
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="about_image" />
        <div className='flex flex-col justify-center gap-6 md:w-1/2 text-sm text-gray-600'>
          <p>Welcome to Docify, your reliable companion for managing healthcare appointments and medical needs with ease and efficiency.</p>
          <p>Docify is dedicated to innovation in digital healthcare. We continuously improve our platform by adopting the latest technologies to enhance usability and deliver top-notch services.</p>
          <b className='text-gray-800'>Our Vision</b>
          <p>At Docify, our vision is to simplify healthcare access for all. We aim to connect patients with medical professionals seamlessly, ensuring timely and convenient care is always within reach.</p>
        </div>
      </div>
      <div className='text-xl my-4'>
        <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
      </div>
      <div className='flex flex-col md:flex-row mb-20 gap-4'>
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

export default About;
