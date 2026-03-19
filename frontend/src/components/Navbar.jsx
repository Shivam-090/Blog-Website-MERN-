import React from 'react'
import { IoIosArrowRoundForward } from "react-icons/io";
import { assets } from '../assets/assets';
import { useAppContext } from '../context/useAppContext';


const Navbar = () => {
    const {navigate, writerToken, user} = useAppContext()
  return (
    <div className='flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32'>
      <img onClick={()=> navigate('/')} className='w-6 sm:w-8 cursor-pointer' src={assets.logo} alt="logo" />
      <div className='flex items-center gap-3'>
        {user ? (
          <button
            onClick={() => navigate('/profile')}
            className='rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm text-gray-700 cursor-pointer transition hover:border-primary hover:text-primary'
          >
            {user.name}
          </button>
        ) : (
          <button
            onClick={() => navigate('/auth')}
            className='rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm text-gray-700 cursor-pointer transition hover:border-primary hover:text-primary'
          >
            Login / Signup
          </button>
        )}
        <button onClick={()=> navigate('/writer')} className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-6 sm:px-10 py-2.5'>
          {writerToken ? 'Dashboard' : 'Writer'} <IoIosArrowRoundForward />
        </button>
      </div>
    </div>
  )
}

export default Navbar
