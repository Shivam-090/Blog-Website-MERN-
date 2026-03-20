import React from 'react'
import { useLocation } from 'react-router-dom'
import { useAppContext } from '../context/useAppContext'

const Navbar = ({ containerClassName = '' }) => {
  const { navigate, writerToken, user } = useAppContext()
  const location = useLocation()

  return (
    <nav className="sticky top-0 z-50 border-none pt-4">
      <div className={`glass-panel flex items-center justify-between rounded-full px-4 py-3 sm:px-6 ${containerClassName}`}>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="font-[Manrope] text-2xl font-extrabold tracking-[-0.04em] text-[#702ae1] sm:text-2xl"
        >
          <span className=' md:text-2xl font-bold text-black'>Digital</span> <span className='md:text-2xl font-bold text-[#702ae1] italic'>Ethereal</span>
        </button>

        <div className="hidden items-center gap-6 text-base font-semibold text-slate-600 lg:flex xl:gap-8 xl:text-lg">
          <button
            type="button"
            onClick={() => location.pathname === '/' ? window.scrollTo({ top: 0, behavior: 'smooth' }) : navigate('/')}
            className="ethereal-nav-link"
          >
            Explore
          </button>
          <button
            type="button"
            onClick={() => navigate(user ? '/following' : '/auth', user ? undefined : { state: { from: '/following' } })}
            className="ethereal-nav-link"
          >
            Following
          </button>
          <button type="button" onClick={() => navigate('/#newsletter-section')} className="ethereal-nav-link">
            Newsletter
          </button>
          <button type="button" onClick={() => navigate('/#site-footer')} className="ethereal-nav-link">
            About
          </button>
          <button type="button" onClick={() => navigate('/writers')} className="ethereal-nav-link">
            Writer
          </button>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => navigate(user ? '/profile' : '/auth')}
            className="rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white"
          >
            {user ? user.name : 'Login'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/writer')}
            className="rounded-full bg-[linear-gradient(135deg,#702ae1,#b28cff)] px-4 py-2 text-sm font-bold text-white shadow-[0_20px_40px_rgba(39,46,66,0.12)] transition hover:-translate-y-0.5 sm:px-6"
          >
            {writerToken ? 'Dashboard' : 'Writer'}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
