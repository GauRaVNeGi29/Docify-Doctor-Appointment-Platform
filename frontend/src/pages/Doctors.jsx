import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'

const Doctors = () => {
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  }

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div>
      <p className='text-gray-600'>Browse through the doctors specialist.</p>
      <div className='flex flex-col sm:flex-row items-start gap-10 mt-5'>
        <div className='flex items-center gap-3 mb-[-10px]'>
          <button className={`cursor-pointer py-1 px-3 border rounded text-sm transition-all md:hidden ${showFilter ? 'bg-blue-500 text-white' : ''}`} onClick={() => setShowFilter(!showFilter)}>Filters</button>
          <img onClick={() => { setShowFilter(false); navigate('/doctors') }} className={`cursor-pointer md:hidden ${speciality ? 'w-5' : 'w-0'}`} src={assets.cross_icon} alt="cross_icon" />
        </div>

        {/* Filters */}
        <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden'} md:flex`}>
          {["General physician", "Gynecologist", "Dermatologist", "Pediatricians", "Neurologist", "Gastroenterologist"].map((spec, i) => (
            <p
              key={i}
              onClick={() => speciality === spec ? navigate('/doctors') : navigate(`/doctors/${spec}`)}
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === spec ? 'bg-indigo-100 text-black' : ''}`}
            >
              {spec}
            </p>
          ))}
        </div>

        {/* Doctor Cards / Loading Skeletons */}
        <div className='w-full grid [grid-template-columns:var(--grid-auto-fill)] gap-4 gap-y-6'>
          {doctors.length === 0 ? (
            [...Array(6)].map((_, index) => (
              <div key={index} className='border border-blue-200 rounded-xl overflow-hidden scale-90 animate-pulse'>
                <div className='bg-blue-100 w-full h-32'></div>
                <div className='p-4 flex flex-col gap-2'>
                  <div className='h-3 w-24 bg-gray-300 rounded'></div>
                  <div className='h-4 w-36 bg-gray-300 rounded'></div>
                  <div className='h-3 w-28 bg-gray-300 rounded'></div>
                </div>
              </div>
            ))
          ) : (
            filterDoc.map((item, index) => (
              <div onClick={() => navigate(`/appointment/${item._id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 scale-90' key={index}>
                <img className='bg-blue-50' src={item.image} alt="" />
                <div className='p-4'>
                  <div className={`flex items-center gap-2 text-sm text-center ${item.available ? "text-green-500" : "text-gray-500"}`}>
                    <p className={`w-2 h-2 ${item.available ? "bg-green-500" : "bg-gray-500"} rounded-full`}></p>
                    <p>{item.available ? "Available" : "Not Available"}</p>
                  </div>
                  <p className='text-gray-900 text-lg font-medium '>{item.name}</p>
                  <p className='text-gray-600 text-sm'>{item.speciality}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Doctors
