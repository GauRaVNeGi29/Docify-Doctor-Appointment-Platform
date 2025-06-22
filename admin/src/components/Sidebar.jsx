import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { DoctorContext } from '../context/DoctorContext';

const Sidebar = () => {

    const {aToken} = useContext(AdminContext);
    const {dToken} = useContext(DoctorContext);




  return (
    <div className='h-[90vh] bg-white border-r border-gray-200'>
        {
            aToken && <ul className='text-[#515151] mt-5'>
                <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#f2f3ff] border-r-4' : ''}`} to={'/admin-dashboard'}>
                    <img className='min-w-5' src={assets.home_icon} alt="home_icon" />
                    <p className='hidden md:block'>Dashboard</p>
                </NavLink>
                <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#f2f3ff] border-r-4' : ''}`} to={'/all-appointments'}>
                    <img className='min-w-5' src={assets.appointment_icon} alt="appointment_icon" />
                    <p className='hidden md:block'>Appointments</p>
                </NavLink>
                <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#f2f3ff] border-r-4' : ''}`} to={'/add-doctor'}>
                    <img className='min-w-5' src={assets.add_icon} alt="add_icon" />
                    <p className='hidden md:block'>Add Doctor</p>
                </NavLink>
                <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#f2f3ff] border-r-4' : ''}`} to={'/doctor-list'}>
                    <img className='min-w-5' src={assets.people_icon} alt="people_icon" />
                    <p className='hidden md:block'>Doctors List</p>
                </NavLink>
            </ul>
        } 
        {
            dToken && <ul className='text-[#515151] mt-5'>
                <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#f2f3ff] border-r-4' : ''}`} to={'/doctor-dashboard'}>
                    <img className='min-w-5' src={assets.home_icon} alt="home_icon" />
                    <p className='hidden md:block'>Dashboard</p>
                </NavLink>
                <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#f2f3ff] border-r-4' : ''}`} to={'/doctor-appointments'}>
                    <img className='min-w-5' src={assets.appointment_icon} alt="appointment_icon" />
                    <p className='hidden md:block'>Appointments</p>
                </NavLink>
                <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#f2f3ff] border-r-4' : ''}`} to={'/doctor-profile'}>
                    <img className='min-w-5' src={assets.people_icon} alt="people_icon" />
                    <p className='hidden md:block'>Profile</p>
                </NavLink>
            </ul>
        }   
    </div>
  )
}

export default Sidebar