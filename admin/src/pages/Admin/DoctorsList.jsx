import React, {useState, useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import {useNavigate} from 'react-router-dom'

const DoctorsList = () => {

  const navigate = useNavigate();

  const {doctors, aToken, getAllDoctors, changeAvailability} = useContext(AdminContext);

  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    if(aToken){
      getAllDoctors().finally(() => setLoading(false));
    }else{
      navigate('/not-authorized');
    }

  },[aToken]);

  const loadingCards = Array(5).fill(0);

  return (
    <div className='mt-3 mx-5'>
      <h1 className='text-xl font-semibold'>All Doctors</h1>
        <div className=' max-h-[78vh] py-2 mt-5 overflow-y-scroll scrollbar-hide'>
      <div className='w-full flex flex-wrap gap-4 gap-y-4'>
        {
            loading ? (
              loadingCards.map((_, index) => (
                <div key={index} className='border border-indigo-200 rounded-xl max-w-56 w-43 animate-pulse'>
                  <div className='h-28 bg-indigo-100' />
                  <div className='p-4'>
                    <div className='h-4 bg-gray-300 rounded w-3/4 mb-2'></div>
                    <div className='h-3 bg-gray-200 rounded w-1/2 mb-2'></div>
                    <div className='h-3 bg-gray-200 rounded w-2/3'></div>
                  </div>
                </div>
              ))
            ) : (
              doctors.map((item, index) => (
                <div className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden w-43 cursor-pointer group' key={index}>
                  <img className='bg-indigo-50 group-hover:bg-blue-500 transition-all duration-500' src={item.image} alt="" />
                  <div className='p-4'>
                    <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
                    <p className='text-zinc-600 text-sm'>{item.speciality}</p>
                    <div className='mt-2 flex items-center gap-1 text-sm'>
                      <input onChange={() => changeAvailability(item._id)} type="checkbox" checked={item.available} />
                      <p>Available</p>
                    </div>
                  </div>
                </div>
              ))
            )
          }
      </div>
        </div>
    </div>
  )
}

export default DoctorsList