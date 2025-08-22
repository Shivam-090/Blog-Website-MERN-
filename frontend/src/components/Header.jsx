import React, { useRef } from 'react'
import { PiShootingStarThin } from "react-icons/pi";
import { useAppContext } from '../context/AppContext';


const Header = () => {
  const {setInput, input} = useAppContext()
  const inputRef = useRef()

  const onSubmitHandler = async (e)=>{
    e.preventDefault()
    setInput(inputRef.current.value)
  }

  const onClear = ()=>{
    setInput('')
    inputRef.current.value = ''

  }
  return (
    <div className='mx-8 sm:mx-16 xl:mx-24 relative'>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,),linear-gradient(to_bottom,#8080800a_1px,)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[400px] w-[400px] rounded-full bg-sky-500 opacity-35 blur-[100px]"></div></div>
      <div className='text-center mt-20 mb-8'>
        <div className='inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary'>
            <p>New: AI feature integrated </p>
            <PiShootingStarThin />
            
        </div>
        <h1 className='text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-700'>Your own <span className='text-primary'> bloging</span> <br /> platform</h1>

        <p className='my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-500'>This is your space to think out loud to share what matters, and to write without filters. Whether it's one word or a thousand, your story starts right here.</p>

        <form onSubmit={onSubmitHandler} className='flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded overflow-hidden'>
            <input ref = {inputRef} className='w-full pl-4 outline-none' type="text" placeholder='Search for blogs' required />
            <button className='bg-primary text-white px-8 py-2 m-1.5 rounded hover:scale-105 trasition-all cursor-pointer' type='submit'>Search</button>
        </form>

      </div>
      <div className='text-center'>
       {input && <button onClick={()=>onClear()} className='border font-light text-xs py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer'>Clear Search</button>}
      </div>
    </div>
  )
}

export default Header
