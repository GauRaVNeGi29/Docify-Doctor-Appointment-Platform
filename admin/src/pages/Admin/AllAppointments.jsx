import {useState, useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import {useNavigate} from 'react-router-dom'

const AllAppointments = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const {calculateAge, slotDateFormat} = useContext(AppContext);
  
  const {aToken, appointments, getAllAppointments, cancelAppointment} = useContext(AdminContext);

  useEffect(()=>{
    if(aToken){
      getAllAppointments().finally(() => setLoading(false));
    }else{
      navigate('/not-authorized');
    }
  },[aToken])

  const loadingRows = Array(6).fill(0);  

  
  return (
    <div className='w-full max-w-6xl mt-3 mx-5'>
      <p className='mb-3 text-xl font-semibold'>All Appointments</p>
      <div className='bg-white border border-gray-200 rounded text-sm max-h-[80vh] min-h-[70vh] overflow-y-scroll scrollbar-hide'>

        {/* Table header */}
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b border-gray-200'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {/* Loading rows */}
        {loading ? (
          loadingRows.map((_, index) => (
            <div key={index} className='grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-400 py-3 px-6 border-b border-gray-100 animate-pulse'>
              <div className='h-4 bg-gray-200 rounded w-3/4' />
              <div className='flex items-center gap-2'>
                <div className='w-8 h-8 rounded-full bg-gray-200'></div>
                <div className='h-3 w-24 bg-gray-200 rounded'></div>
              </div>
              <div className='h-3 w-10 bg-gray-200 rounded'></div>
              <div className='h-3 w-28 bg-gray-200 rounded'></div>
              <div className='flex items-center gap-2'>
                <div className='w-8 h-8 rounded-full bg-gray-200'></div>
                <div className='h-3 w-20 bg-gray-200 rounded'></div>
              </div>
              <div className='h-3 w-10 bg-gray-200 rounded'></div>
              <div className='h-6 w-6 bg-gray-200 rounded'></div>
            </div>
          ))
        ) : (
          appointments.map((item, index) => (
            <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b border-gray-200 hover:bg-gray-100' key={index}>
              <p className='max-sm:hidden'>{index + 1}</p>
              <div className='flex items-center gap-2'>
                <img className='w-8 rounded-full bg-gray-200' src={item.userData.image} alt="" /><p>{item.userData.name}</p>
              </div>
              <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
              <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
              <div className='flex items-center gap-2'>
                <img className='w-8 rounded-full bg-gray-200' src={item.docData.image} alt="" /><p>{item.docData.name}</p>
              </div>
              <p>₹{item.amount}</p>
              {
                item.cancelled
                  ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                  : item.isCompleted
                    ? <p className='text-green-400 text-xs font-medium'>Completed</p>
                    : <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="cancel_icon" />
              }
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default AllAppointments