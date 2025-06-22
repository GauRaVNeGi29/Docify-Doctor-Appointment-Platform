import React, {useContext, useState} from 'react'
import {assets} from '../assets/assets'
import {AdminContext} from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext'

const Login = () => {
    
    const [state,setState] = useState('Admin');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const {setDToken} = useContext(DoctorContext);

    const {setAToken, backendUrl} = useContext(AdminContext);
    const onSubmithandler = async (e) => {
        e.preventDefault();
        try {
            if(state === 'Admin'){
                const {data} = await axios.post(backendUrl + "/api/admin/login", {email, password});
                if(data.success){
                    localStorage.setItem('aToken', data.token);
                    setAToken(data.token);
                    
                } else {
                    toast.error(data.message);
                }
            } else {  
                const {data} = await axios.post(backendUrl + "/api/doctor/login", {email, password});
                if(data.success){
                    localStorage.setItem('dToken', data.token);
                    setDToken(data.token);
                    console.log(data.token);
                } else {
                    toast.error(data.message);
                }
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

  return (
    <form onSubmit={onSubmithandler} className='min-h-[80vh] flex items-center'>
        <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border border-gray-200 rounded-xl text-[#5e5e5e] text-sm shadow-lg'>
            <p className='text-2xl font-semibold m-auto'><span className='text-blue-500'>{state}</span> Login</p>
            <div className='w-full'>
                <p>Email</p>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required placeholder='Enter your email'/>
            </div>
            <div className='w-full'>
                <p>Password</p>
                <input onChange={(e)=>setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required placeholder='Enter your password'/>
            </div>
            <div className='w-full'>
            <input type="checkbox" className='cursor-pointer' required />
            <span className="ml-2">
                I agree to the <a href="/#" className="text-blue-500 underline">Terms & Conditions</a>
            </span>
            </div>
            <button className='bg-blue-500 text-white py-2 w-full rounded-md text-base cursor-pointer'>Login</button>
            {
                state === 'Admin'
                ? <p>Doctor Login? <span className='text-blue-500 cursor-pointer underline' onClick={()=>setState('Doctor')}>Click here</span></p>
                : <p>Admin Login? <span className='text-blue-500 cursor-pointer underline' onClick={()=>setState('Admin')}>Click here</span></p>
            }
        </div>
    </form>
  )
}

export default Login