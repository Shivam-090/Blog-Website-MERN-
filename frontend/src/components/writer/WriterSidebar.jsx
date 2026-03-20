import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/useAppContext'

const WriterSidebar = () => {
  const { logoutWriter, navigate } = useAppContext()

  return (
    <div className='flex min-h-full flex-col border-r border-[#e7e6fb] bg-white/82 pt-6 shadow-[0_18px_40px_rgba(39,46,66,0.04)] backdrop-blur-xl'>
      <NavLink end to='/writer' className={({ isActive }) =>`flex items-center gap-3 px-3 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-[#f3f1ff] md:min-w-64 md:px-9 ${isActive && 'border-r-4 border-[#702ae1] bg-[#f3f1ff] text-[#702ae1] hover:bg-[#f3f1ff]'}`}>
        <img src={assets.home_icon} alt="" />
        <p className='hidden md:inline-block'>Writer Dashboard</p>
      </NavLink>

      <NavLink to='/writer/addBlog' className={({ isActive }) =>`flex items-center gap-3 px-3 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-[#f3f1ff] md:min-w-64 md:px-9 ${isActive && 'border-r-4 border-[#702ae1] bg-[#f3f1ff] text-[#702ae1] hover:bg-[#f3f1ff]'}`}>
        <img src={assets.add_icon} alt="" />
        <p className='hidden md:inline-block'>Add blogs</p>
      </NavLink>

      <NavLink to='/writer/listBlog' className={({ isActive }) =>`flex items-center gap-3 px-3 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-[#f3f1ff] md:min-w-64 md:px-9 ${isActive && 'border-r-4 border-[#702ae1] bg-[#f3f1ff] text-[#702ae1] hover:bg-[#f3f1ff]'}`}>
        <img src={assets.list_icon} alt="" />
        <p className='hidden md:inline-block'>Blog lists</p>
      </NavLink>

      <NavLink to='/writer/comments' className={({ isActive }) =>`flex items-center gap-3 px-3 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-[#f3f1ff] md:min-w-64 md:px-9 ${isActive && 'border-r-4 border-[#702ae1] bg-[#f3f1ff] text-[#702ae1] hover:bg-[#f3f1ff]'}`}>
        <img src={assets.comment_icon} alt="" className='w-6' />
        <p className='hidden md:inline-block'>Comments</p>
      </NavLink>

       <NavLink to='/writer/profile' className={({ isActive }) =>`flex items-center gap-3 px-3 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-[#f3f1ff] md:min-w-64 md:px-9 ${isActive && 'border-r-4 border-[#702ae1] bg-[#f3f1ff] text-[#702ae1] hover:bg-[#f3f1ff]'}`}>
        <img src={assets.user_icon} alt="" className='w-5' />
        <p className='hidden md:inline-block'>Writer Profile</p>
      </NavLink>

      <button onClick={() => { logoutWriter(); navigate('/') }} className='mx-3 mb-6 mt-auto rounded-2xl border border-rose-200 bg-white px-4 py-3 text-sm font-semibold text-rose-600 transition hover:bg-rose-50 md:mx-9'>
        Logout
      </button>
    </div>
  )
}

export default WriterSidebar
