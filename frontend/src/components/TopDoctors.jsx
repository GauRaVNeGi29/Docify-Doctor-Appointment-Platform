import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (doctors && doctors.length > 0) {
      setLoading(false);
    }
  }, [doctors]);

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
      <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
      <p className='sm:w-2/5 text-center text-sm'>
        Simply browse through our extensive list of trusted doctors.
      </p>

      <div className='w-full grid [grid-template-columns:var(--grid-auto-fill)] gap-10 gap-y-6 px-3 sm:px-0 mb-10'>
        {
          loading
            ? Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className='animate-pulse border border-gray-200 rounded-xl overflow-hidden flex flex-col'
              >
                <div className='bg-gray-200 h-36 w-full'></div>
                <div className='p-4 flex flex-col gap-2'>
                  <div className='w-24 h-3 bg-gray-300 rounded'></div>
                  <div className='w-40 h-4 bg-gray-300 rounded'></div>
                  <div className='w-32 h-3 bg-gray-200 rounded'></div>
                </div>
              </div>
            ))
            : doctors.slice(0, 8).map((item, index) => (
              <div
                onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }}
                className='border border-blue-200 mt-5 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
                key={index}
              >
                <img className='bg-blue-50' src={item.image} alt="" />
                <div className='p-4'>
                  <div className={`flex items-center gap-2 text-sm text-center ${item.available ? "text-green-500" : "text-gray-500"}`}>
                    <p className={`w-2 h-2 ${item.available ? "bg-green-500" : "bg-gray-500"} rounded-full`}></p>
                    <p>{item.available ? "Available" : "Not Available"}</p>
                  </div>
                  <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                  <p className='text-gray-600 text-sm'>{item.speciality}</p>
                </div>
              </div>
            ))
        }
      </div>

      {!loading && (
        <button
          onClick={() => { navigate('/doctors'); scrollTo(0, 0) }}
          className='rounded-full bg-blue-100 hover:bg-blue-200 hover:scale-105 transition-all duration-300 text-gray-600 px-12 py-3 mt-5 cursor-pointer'>
          more
        </button>
      )}
    </div>
  )
}

export default TopDoctors;
