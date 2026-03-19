import React from 'react'
import { assets } from '../../assets/assets'
import { Outlet } from 'react-router-dom'
import WriterSidebar from '../../components/writer/WriterSidebar'
import { useAppContext } from '../../context/useAppContext'

const WriterLayout = () => {
  const { writer, navigate } = useAppContext()

  return (
    <>
      <div className='flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200'>
        <img src={assets.logo} onClick={()=>navigate('/')} alt="Site logo" className='w-6 sm:w-10 cursor-pointer' />
        <div className='text-right'>
          <p className='text-xs uppercase tracking-[0.2em] text-gray-400'>Writer workspace</p>
          <p className='text-sm font-medium text-gray-700'>{writer?.name || 'Writer'}</p>
        </div>
      </div>

      <div className='flex min-h-[calc(100vh-70px)]'>
        <WriterSidebar />
        <Outlet />
      </div>
    </>
  )
}

export default WriterLayout
