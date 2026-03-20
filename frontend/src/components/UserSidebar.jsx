import React from 'react'
import { Bookmark, Heart, LogOut, MessageSquareText, UserRound } from 'lucide-react'
import { useAppContext } from '../context/useAppContext'

const UserSidebar = ({ activeSection, setActiveSection, stats }) => {
  const { logoutUser, navigate } = useAppContext()

  return (
    <div className='flex min-h-full flex-col border-r border-[#e7e6fb] bg-white/82 pt-6 shadow-[0_18px_40px_rgba(39,46,66,0.04)] backdrop-blur-xl'>


      <button
        type='button'
        onClick={() => setActiveSection('overview')}
        className={`flex items-center gap-3 px-3 py-3.5 text-sm font-semibold transition md:min-w-64 md:px-9 ${activeSection === 'overview' ? 'border-r-4 border-[#702ae1] bg-[#f3f1ff] text-[#702ae1]' : 'text-slate-700 hover:bg-[#f3f1ff]'}`}
      >
        <UserRound className='h-5 w-5' />
        <span>Profile</span>
      </button>

      <button
        type='button'
        onClick={() => setActiveSection('liked')}
        className={`flex items-center justify-between gap-3 px-3 py-3.5 text-sm font-semibold transition md:min-w-64 md:px-9 ${activeSection === 'liked' ? 'border-r-4 border-[#702ae1] bg-[#f3f1ff] text-[#702ae1]' : 'text-slate-700 hover:bg-[#f3f1ff]'}`}
      >
        <span className='flex items-center gap-3'>
          <Heart className='h-5 w-5' />
          <span>Liked blogs</span>
        </span>
        <span className='text-xs'>{stats.liked}</span>
      </button>

      <button
        type='button'
        onClick={() => setActiveSection('saved')}
        className={`flex items-center justify-between gap-3 px-3 py-3.5 text-sm font-semibold transition md:min-w-64 md:px-9 ${activeSection === 'saved' ? 'border-r-4 border-[#702ae1] bg-[#f3f1ff] text-[#702ae1]' : 'text-slate-700 hover:bg-[#f3f1ff]'}`}
      >
        <span className='flex items-center gap-3'>
          <Bookmark className='h-5 w-5' />
          <span>Saved blogs</span>
        </span>
        <span className='text-xs'>{stats.saved}</span>
      </button>

      <button
        type='button'
        onClick={() => setActiveSection('comments')}
        className={`flex items-center justify-between gap-3 px-3 py-3.5 text-sm font-semibold transition md:min-w-64 md:px-9 ${activeSection === 'comments' ? 'border-r-4 border-[#702ae1] bg-[#f3f1ff] text-[#702ae1]' : 'text-slate-700 hover:bg-[#f3f1ff]'}`}
      >
        <span className='flex items-center gap-3'>
          <MessageSquareText className='h-5 w-5' />
          <span>Comments</span>
        </span>
        <span className='text-xs'>{stats.comments}</span>
      </button>

      <button
        type='button'
        onClick={() => {
          logoutUser()
          navigate('/')
        }}
        className='mx-3 mb-6 mt-auto flex items-center justify-center gap-2 rounded-2xl border border-rose-200 bg-white px-4 py-3 text-sm font-semibold text-rose-600 transition hover:bg-rose-50 md:mx-9'
      >
        <LogOut className='h-4 w-4' />
        Logout
      </button>
    </div>
  )
}

export default UserSidebar
