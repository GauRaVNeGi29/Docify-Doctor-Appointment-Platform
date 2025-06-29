import React, { useContext, useEffect, useState } from 'react'
import {AppContext} from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const {token, setToken, backendUrl} = useContext(AppContext);

  const [state,setState] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if(state === 'Sign Up'){
        const {data} = await axios.post(backendUrl + "/api/user/register", {name, email, password});
        if(data.success){
          localStorage.setItem('token',data.token);
          setToken(data.token);
        }else{
          toast.error(data.message);
        }
      }else{
        const {data} = await axios.post(backendUrl + "/api/user/login", {email, password});
        if(data.success){
          localStorage.setItem('token',data.token);
          setToken(data.token);
        }else{
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  useEffect(()=>{
    if(token){
      navigate('/');
    }
  },[token])
  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border border-gray-300 rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === 'Sign Up' ? "Create Account" : "Log In"}</p>
        <p>Please {state === 'Sign Up' ? 'sign up' : 'log in' } to book appointment</p>
        {
          state === 'Sign Up' && <div className='w-full'>
              <p>Full Name</p>
              <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e)=>setName(e.target.value)} value={name} placeholder='Enter your name' required />
            </div>
        }
        <div className='w-full'>
          <p>Email</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" onChange={(e)=>setEmail(e.target.value)} value={email} placeholder='Enter your email' required />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" onChange={(e)=>setPassword(e.target.value)} value={password} placeholder='Enter your password' required />
        </div>
        <div className='w-full'>
          <input type="checkbox" name="terms" className="form-checkbox text-blue-600" required />
          <span className="ml-2 text-sm text-gray-600">
            I agree to the <a href="/terms" className="text-blue-500 underline">Terms & Conditions</a>
          </span>
        </div>
        <button type='submit' className='bg-[var(--color-primary)] text-white w-full py-2 rounded-md text-base cursor-pointer'>{state == 'Sign Up' ? 'Create Account' : 'Log In'}</button>
        {
          state === 'Sign Up' 
          ? <p>Already have an account? <span onClick={()=>setState('Log In')} className='text-blue-500 underline cursor-pointer'>Login here</span></p> 
          : <p>Create a new account? <span onClick={()=>setState('Sign Up')} className='text-blue-500 underline cursor-pointer'>click here</span></p>         
        }
      </div>
    </form>
  )
}

export default Login