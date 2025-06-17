import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {
    const navigate = useNavigate();
    const {doctors} = useContext(AppContext);
  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
        <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
        <p className='sm:w-2/5 text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>
        <div className='w-full  grid [grid-template-columns:var(--grid-auto-fill)] gap-10 gap-y-6 px-3 sm:px-0 mb-10'>
            {doctors.slice(0,8).map((item, index)=>(
                <div onClick={()=>{navigate(`/appointment/${item._id}`); scrollTo(0,0)}} className='border border-blue-200 mt-5 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 hide-scrollbar' key={index}>
                   <img className='bg-blue-50' src={item.image} alt="" /> 
                   <div className='p-4'>
                        <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                            <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
                        </div>
                        <p className='text-gray-900 text-lg font-medium '>{item.name}</p>
                        <p className='text-gray-600 text-sm'>{item.speciality}</p>
                   </div>
                </div>
            ))}
        </div>
        <button onClick={()=>{navigate('/doctors'); scrollTo(0,0)}} className='rounded-full bg-blue-100 hover:bg-blue-200 hover:scale-105 transition-all duration-300 text-gray-600 px-12 py-3 mt-5 cursor-pointer'>more</button>
    </div>
  )
}

export default TopDoctors