import React, { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { useAppContext } from '../context/useAppContext'

const Navbar = ({ containerClassName = '' }) => {
  const { navigate, writerToken, user } = useAppContext()
  const location = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isSidebarOpen])

  const handleNavigate = (path, options) => {
    navigate(path, options)
    setIsSidebarOpen(false)
  }

  const isCurrent = (path) => location.pathname === path

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/85 backdrop-blur-md transition-colors duration-200">
        <div className={`flex h-18 items-center justify-between ${containerClassName}`}>
          {/* Left section: Hamburger (mobile), Bigger Logo, and Nav Options */}
          <div className="flex items-center gap-6 lg:gap-10">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              className="flex h-10 w-10 items-center justify-center border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 lg:hidden"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() => navigate('/')}
              className="group flex items-center text-2xl font-black tracking-tight text-slate-950 sm:text-4xl"
            >
              <span className="font-[Manrope] font-extrabold tracking-tight text-slate-900">Digital</span>
              <span className="ml-1.5 font-[Manrope] font-extrabold italic text-[#702ae1]">Ethereal</span>
            </button>

            {/* Nav options on the left next to website name */}
            <nav className="hidden items-center gap-7 text-[15px] font-medium text-slate-600 lg:flex" aria-label="Main navigation">
              <button
                type="button"
                onClick={() => location.pathname === '/' ? window.scrollTo({ top: 0, behavior: 'smooth' }) : navigate('/')}
                className={`relative py-1 tracking-tight transition hover:text-slate-950 ${
                  isCurrent('/') ? 'font-bold text-slate-950' : 'text-slate-600'
                }`}
              >
                Explore
                {isCurrent('/') && (
                  <span className="absolute bottom-0 left-0 h-[2.5px] w-full bg-[#702ae1]" />
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate(user ? '/following' : '/auth', user ? undefined : { state: { from: '/following' } })}
                className={`relative py-1 tracking-tight transition hover:text-slate-950 ${
                  isCurrent('/following') ? 'font-bold text-slate-950' : 'text-slate-600'
                }`}
              >
                Following
                {isCurrent('/following') && (
                  <span className="absolute bottom-0 left-0 h-[2.5px] w-full bg-[#702ae1]" />
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate('/#newsletter-section')}
                className="py-1 tracking-tight text-slate-600 transition hover:text-slate-950"
              >
                Newsletter
              </button>
              <button
                type="button"
                onClick={() => navigate('/about')}
                className={`relative py-1 tracking-tight transition hover:text-slate-950 ${
                  isCurrent('/about') ? 'font-bold text-slate-950' : 'text-slate-600'
                }`}
              >
                About
                {isCurrent('/about') && (
                  <span className="absolute bottom-0 left-0 h-[2.5px] w-full bg-[#702ae1]" />
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate('/writers')}
                className={`relative py-1 tracking-tight transition hover:text-slate-950 ${
                  isCurrent('/writers') ? 'font-bold text-slate-950' : 'text-slate-600'
                }`}
              >
                Writers
                {isCurrent('/writers') && (
                  <span className="absolute bottom-0 left-0 h-[2.5px] w-full bg-[#702ae1]" />
                )}
              </button>
            </nav>
          </div>

          {/* Right section: Rounded Login and Writer buttons */}
          <div className="hidden items-center gap-3 lg:flex">
            <button
              type="button"
              onClick={() => navigate(user ? '/profile' : '/auth')}
              className="rounded-full border border-slate-200 bg-white/90 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950 shadow-sm"
            >
              {user ? user.name : 'Login'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/writer')}
              className="rounded-full bg-[linear-gradient(135deg,#702ae1,#9854f7)] px-6 py-2 text-sm font-bold text-white shadow-[0_8px_20px_rgba(112,42,225,0.25)] transition hover:brightness-110 hover:-translate-y-0.5"
            >
              {writerToken ? 'Dashboard' : 'Writer'}
            </button>
          </div>

          {/* Mobile Right: Rounded Login button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => handleNavigate(user ? '/profile' : '/auth')}
              className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 shadow-sm"
            >
              {user ? 'Profile' : 'Login'}
            </button>
          </div>
        </div>
      </header>

      <div className={`fixed inset-0 z-[70] transition-opacity duration-300 ${isSidebarOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}>
        <button
          type="button"
          onClick={() => setIsSidebarOpen(false)}
          className="absolute inset-0 bg-[#0f172a]/40 backdrop-blur-sm"
          aria-label="Close navigation overlay"
        />

        <aside className={`absolute left-0 top-0 flex h-full w-[85%] max-w-xs flex-col border-r border-slate-200 bg-white px-6 py-6 shadow-2xl transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between border-b border-slate-100 pb-5">
            <button
              type="button"
              onClick={() => handleNavigate('/')}
              className="flex items-center text-xl font-bold tracking-tight text-slate-950"
            >
              <span className="font-[Manrope] font-extrabold text-slate-900">Digital</span>
              <span className="ml-1 font-[Manrope] font-extrabold italic text-[#702ae1]">Ethereal</span>
            </button>

            <button
              type="button"
              onClick={() => setIsSidebarOpen(false)}
              className="flex h-9 w-9 items-center justify-center border border-slate-200 bg-slate-50 text-slate-700 transition hover:bg-slate-100"
              aria-label="Close navigation menu"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-6 flex flex-col divide-y divide-slate-100">
            <button
              type="button"
              onClick={() => {
                if (location.pathname === '/') {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                  setIsSidebarOpen(false)
                } else {
                  handleNavigate('/')
                }
              }}
              className="flex w-full items-center justify-between py-3.5 text-left text-sm font-medium text-slate-700 transition hover:text-[#702ae1]"
            >
              Explore
            </button>
            <button
              type="button"
              onClick={() => handleNavigate(user ? '/following' : '/auth', user ? undefined : { state: { from: '/following' } })}
              className="flex w-full items-center justify-between py-3.5 text-left text-sm font-medium text-slate-700 transition hover:text-[#702ae1]"
            >
              Following
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('/#newsletter-section')}
              className="flex w-full items-center justify-between py-3.5 text-left text-sm font-medium text-slate-700 transition hover:text-[#702ae1]"
            >
              Newsletter
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('/about')}
              className="flex w-full items-center justify-between py-3.5 text-left text-sm font-medium text-slate-700 transition hover:text-[#702ae1]"
            >
              About
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('/writers')}
              className="flex w-full items-center justify-between py-3.5 text-left text-sm font-medium text-slate-700 transition hover:text-[#702ae1]"
            >
              Writers
            </button>
            <button
              type="button"
              onClick={() => handleNavigate(user ? '/profile' : '/auth')}
              className="flex w-full items-center justify-between py-3.5 text-left text-sm font-medium text-slate-700 transition hover:text-[#702ae1]"
            >
              {user ? 'Profile' : 'Login'}
            </button>
          </div>

          <div className="mt-auto border border-slate-200 bg-slate-50 p-5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#702ae1]">Writer Tools</p>
            <p className="mt-2 font-[Manrope] text-lg font-bold tracking-tight text-slate-900">
              {writerToken ? 'Author Dashboard' : 'Become a Writer'}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              Publish stories, interact with readers, and manage your articles.
            </p>
            <button
              type="button"
              onClick={() => handleNavigate('/writer')}
              className="mt-4 w-full border border-[#702ae1] bg-[#702ae1] py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-[#5e21c2]"
            >
              {writerToken ? 'Open Dashboard' : 'Start Writing'}
            </button>
          </div>
        </aside>
      </div>
    </>
  )
}

export default Navbar
