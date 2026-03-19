import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/useAppContext'

const WriterSidebar = () => {
  const { logoutWriter, navigate } = useAppContext()

  return (
    <div className='flex min-h-full flex-col border-r border-gray-200 pt-6'>
      <NavLink end to='/writer' className={({ isActive }) =>`flex items-center gap-3 py-3.5 px-3 hover:bg-blue-200 md:px-9 md:min-w-64 cursor-pointer ${isActive && 'bg-primary/10 border-r-4 border-primary hover:bg-primary/10'}`}>
        <img src={assets.home_icon} alt="" />
        <p className='hidden md:inline-block'>Writer Dashboard</p>
      </NavLink>

      <NavLink to='/writer/addBlog' className={({ isActive }) =>`flex items-center gap-3 py-3.5 px-3 hover:bg-blue-200 md:px-9 md:min-w-64 cursor-pointer ${isActive && 'bg-primary/10 border-r-4 border-primary hover:bg-primary/10'}`}>
        <img src={assets.add_icon} alt="" />
        <p className='hidden md:inline-block'>Add blogs</p>
      </NavLink>

      <NavLink to='/writer/listBlog' className={({ isActive }) =>`flex items-center gap-3 py-3.5 px-3 hover:bg-blue-200 md:px-9 md:min-w-64 cursor-pointer ${isActive && 'bg-primary/10 border-r-4 border-primary hover:bg-primary/10'}`}>
        <img src={assets.list_icon} alt="" />
        <p className='hidden md:inline-block'>Blog lists</p>
      </NavLink>

      <NavLink to='/writer/comments' className={({ isActive }) =>`flex items-center gap-3 py-3.5 px-3 hover:bg-blue-200 md:px-9 md:min-w-64 cursor-pointer ${isActive && 'bg-primary/10 border-r-4 border-primary hover:bg-primary/10'}`}>
        <img src={assets.comment_icon} alt="" className='w-6' />
        <p className='hidden md:inline-block'>Comments</p>
      </NavLink>

       <NavLink to='/writer/profile' className={({ isActive }) =>`flex items-center gap-3 py-3.5 px-3 hover:bg-blue-200 md:px-9 md:min-w-64 cursor-pointer ${isActive && 'bg-primary/10 border-r-4 border-primary hover:bg-primary/10'}`}>
        <img src={assets.user_icon} alt="" className='w-5' />
        <p className='hidden md:inline-block'>Writer Profile</p>
      </NavLink>

      <button onClick={() => { logoutWriter(); navigate('/') }} className='mt-auto mx-3 mb-6 rounded-2xl border border-rose-200 px-4 py-3 text-sm font-medium text-rose-600 transition hover:bg-rose-50 md:mx-9'>
        Logout
      </button>
    </div>
  )
}

export default WriterSidebar
