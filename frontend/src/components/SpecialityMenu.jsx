import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { specialityData } from '../assets/assets';

const SpecialityMenu = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // When data is available, stop loading
    if (specialityData && specialityData.length > 0) {
      setLoading(false);
    }
  }, [specialityData]);

  return (
    <div className='flex flex-col items-center gap-4 py-16 text-gray-800' id='speciality'>
      <h1 className='text-3xl font-medium'>Find by Speciality</h1>
      <p className='sm:w-2/5 text-center text-sm'>
        Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
      </p>

      <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll hide-scrollbar'>
        {
          loading ? (
            // Skeleton shimmer while loading
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 animate-pulse flex-shrink-0"
              >
                <div className="w-16 sm:w-24 h-16 sm:h-24 bg-gray-300 rounded-full" />
                <div className="w-16 h-3 bg-gray-300 rounded" />
              </div>
            ))
          ) : (
            specialityData.map((item, index) => (
              <Link
                key={index}
                to={`/doctors/${item.speciality}`}
                onClick={() => scrollTo(0, 0)}
                className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500'
              >
                <img className='w-16 sm:w-24 mb-2' src={item.image} alt={item.speciality} />
                <p>{item.speciality}</p>
              </Link>
            ))
          )
        }
      </div>
    </div>
  );
};

export default SpecialityMenu;
