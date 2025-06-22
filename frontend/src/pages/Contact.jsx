import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = assets.contact_image;
    img.onload = () => setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <div className='p-6 animate-pulse space-y-6'>
        <div className='h-6 w-40 bg-gray-300 rounded m-auto'></div>
        <div className='flex flex-col md:flex-row gap-10 my-10 mb-28'>
          <div className='w-full md:max-w-[360px] h-[240px] bg-gray-300 rounded'></div>
          <div className='flex-1 space-y-4'>
            <div className='h-4 w-32 bg-gray-300 rounded'></div>
            <div className='h-4 w-48 bg-gray-300 rounded'></div>
            <div className='h-4 w-56 bg-gray-300 rounded'></div>
            <div className='h-4 w-40 bg-gray-300 rounded mt-6'></div>
            <div className='h-4 w-60 bg-gray-300 rounded'></div>
            <div className='h-10 w-36 bg-gray-300 rounded mt-4'></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>CONTACT <span className='text-gray-700 font-semibold'>US</span></p>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="contact_image" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-lg text-gray-600'>OUR OFFICE</p>
          <p className='text-gray-500'>Indra Park, Palam Colony <br />New Delhi, India </p>
          <p className='text-gray-500'>Tel: +91 9873430242 <br />Email: negigaurav419@gmail.com</p>
          <p className='font-semibold text-lg text-gray-600'>Careers at DOCIFY</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
          <button className='border border-black px-8 py-4 text-sm  hover:bg-black hover:text-white transition-all duration-300'>Explore Jobs</button>
        </div>
      </div>
    </div>
  )
}

export default Contact
