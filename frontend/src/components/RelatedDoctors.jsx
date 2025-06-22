import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({ docId, speciality }) => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const [relDoc, setRelDoc] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setRelDoc(doctorsData);
      setLoading(false);
    }
  }, [doctors, speciality, docId]);

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
      <h1 className='text-3xl font-medium'>Related Doctors</h1>
      <p className='sm:w-2/5 text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>

      <div className='w-full grid [grid-template-columns:var(--grid-auto-fill)] gap-10 gap-y-6 px-3 sm:px-0 mb-10'>
        {
          loading ? (
            // Skeletons matching the original card size/layout
            Array(4).fill(0).map((_, index) => (
              <div key={index} className='border border-blue-200 mt-5 rounded-xl overflow-hidden animate-pulse'>
                <div className='bg-blue-100 w-full h-[180px]'></div>
                <div className='p-4 space-y-2'>
                  <div className='h-4 w-28 bg-gray-300 rounded'></div>
                  <div className='h-5 w-40 bg-gray-300 rounded'></div>
                  <div className='h-4 w-24 bg-gray-200 rounded'></div>
                </div>
              </div>
            ))
          ) : (
            relDoc.slice(0, 4).map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  navigate(`/appointment/${item._id}`);
                  scrollTo(0, 0);
                }}
                className='border border-blue-200 mt-5 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 hide-scrollbar'
              >
                <img className='bg-blue-50 w-full h-[180px] object-cover' src={item.image} alt="" />
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
          )
        }
      </div>
    </div>
  )
}

export default RelatedDoctors
