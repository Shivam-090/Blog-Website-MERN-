import React, { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useAppContext } from '../context/useAppContext'

const Auth = () => {
  const location = useLocation()
  const { loginUser, signupUser, verifyResetEmail, resetPassword, navigate, userToken } = useAppContext()
  const [mode, setMode] = useState('login')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [resetStep, setResetStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    resetEmail: '',
    newPassword: ''
  })

  const redirectPath = useMemo(() => location.state?.from || '/', [location.state])

  useEffect(() => {
    if (userToken) {
      navigate(redirectPath)
    }
  }, [navigate, redirectPath, userToken])

  const updateField = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleAuthSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      if (mode === 'signup') {
        await signupUser(formData)
        toast.success('Your account is ready')
      } else {
        await loginUser({ email: formData.email, password: formData.password })
        toast.success('Welcome back')
      }

      navigate(redirectPath)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleVerifyEmail = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      const message = await verifyResetEmail(formData.resetEmail)
      toast.success(message)
      setResetStep(2)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResetPassword = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      const message = await resetPassword({
        email: formData.resetEmail,
        newPassword: formData.newPassword
      })
      toast.success(message)
      setMode('login')
      setResetStep(1)
      setFormData((current) => ({
        ...current,
        email: current.resetEmail,
        password: '',
        newPassword: ''
      }))
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const switchMode = (nextMode) => {
    setMode(nextMode)
    setResetStep(1)
  }

  const renderForm = () => {
    if (mode === 'forgot') {
      if (resetStep === 1) {
        return (
          <form onSubmit={handleVerifyEmail} className='mt-8 space-y-5'>
            <div>
              <label htmlFor='resetEmail' className='mb-2 block text-sm font-medium text-slate-700'>Email</label>
              <input
                id='resetEmail'
                name='resetEmail'
                type='email'
                value={formData.resetEmail}
                onChange={updateField}
                placeholder='you@example.com'
                required
                className='w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-primary'
              />
            </div>

            <button
              type='submit'
              disabled={isSubmitting}
              className='w-full rounded-2xl bg-slate-900 px-4 py-3 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60'
            >
              {isSubmitting ? 'Checking...' : 'Verify email'}
            </button>
          </form>
        )
      }

      return (
        <form onSubmit={handleResetPassword} className='mt-8 space-y-5'>
          <div className='rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700'>
            Email verified for <span className='font-medium'>{formData.resetEmail}</span>
          </div>
          <div>
            <label htmlFor='newPassword' className='mb-2 block text-sm font-medium text-slate-700'>New password</label>
            <input
              id='newPassword'
              name='newPassword'
              type='password'
              value={formData.newPassword}
              onChange={updateField}
              placeholder='At least 6 characters'
              required
              className='w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-primary'
            />
          </div>

          <button
            type='submit'
            disabled={isSubmitting}
            className='w-full rounded-2xl bg-slate-900 px-4 py-3 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60'
          >
            {isSubmitting ? 'Updating...' : 'Update password'}
          </button>
        </form>
      )
    }

    return (
      <form onSubmit={handleAuthSubmit} className='mt-8 space-y-5'>
        {mode === 'signup' && (
          <div>
            <label htmlFor='name' className='mb-2 block text-sm font-medium text-slate-700'>Full name</label>
            <input
              id='name'
              name='name'
              type='text'
              value={formData.name}
              onChange={updateField}
              placeholder='Your name'
              required
              className='w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-primary'
            />
          </div>
        )}

        <div>
          <label htmlFor='email' className='mb-2 block text-sm font-medium text-slate-700'>Email</label>
          <input
            id='email'
            name='email'
            type='email'
            value={formData.email}
            onChange={updateField}
            placeholder='you@example.com'
            required
            className='w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-primary'
          />
        </div>

        <div>
          <label htmlFor='password' className='mb-2 block text-sm font-medium text-slate-700'>Password</label>
          <input
            id='password'
            name='password'
            type='password'
            value={formData.password}
            onChange={updateField}
            placeholder='At least 6 characters'
            required
            className='w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-primary'
          />
        </div>

        {mode === 'login' && (
          <button
            type='button'
            onClick={() => switchMode('forgot')}
            className='text-sm font-medium text-primary cursor-pointer'
          >
            Forgot password?
          </button>
        )}

        <button
          type='submit'
          disabled={isSubmitting}
          className='w-full rounded-2xl bg-slate-900 px-4 py-3 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60'
        >
          {isSubmitting ? 'Please wait...' : mode === 'signup' ? 'Create account' : 'Login'}
        </button>
      </form>
    )
  }

  return (
    <div className='min-h-screen bg-[radial-gradient(circle_at_top,#dbeafe,transparent_35%),linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)]'>
      <Navbar />

      <div className='mx-6 mt-10 mb-20 grid gap-8 lg:mx-20 lg:grid-cols-[1.1fr_0.9fr] xl:mx-32'>
        <div className='rounded-[32px] border border-white/60 bg-white/80 p-8 shadow-[0_24px_80px_rgba(80,68,229,0.12)] backdrop-blur-sm sm:p-12'>
          <p className='inline-flex rounded-full border border-primary/20 bg-primary/8 px-4 py-1 text-sm text-primary'>Read freely. Join to interact.</p>
          <h1 className='mt-6 max-w-xl text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl'>
            Login or create an account to save posts, react, and join the conversation.
          </h1>
          <p className='mt-5 max-w-lg text-base text-slate-600'>
            Blogs stay public for everyone. Your account unlocks bookmarks, likes, dislikes, commenting, and your personal activity hub.
          </p>
          <div className='mt-10 grid gap-4 sm:grid-cols-3'>
            <div className='rounded-2xl border border-slate-200 bg-slate-50 p-4'>
              <p className='text-sm font-medium text-slate-900'>Save blogs</p>
              <p className='mt-2 text-sm text-slate-600'>Build your own reading list and come back anytime.</p>
            </div>
            <div className='rounded-2xl border border-slate-200 bg-slate-50 p-4'>
              <p className='text-sm font-medium text-slate-900'>Track activity</p>
              <p className='mt-2 text-sm text-slate-600'>See every liked post, saved blog, and comment from your profile.</p>
            </div>
            <div className='rounded-2xl border border-slate-200 bg-slate-50 p-4'>
              <p className='text-sm font-medium text-slate-900'>Recover access</p>
              <p className='mt-2 text-sm text-slate-600'>Use forgot password to reset your account if you get locked out.</p>
            </div>
          </div>
        </div>

        <div className='rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-10'>
          {mode !== 'forgot' && (
            <div className='inline-flex rounded-full bg-slate-100 p-1 text-sm'>
              <button
                type='button'
                onClick={() => switchMode('login')}
                className={`rounded-full px-5 py-2 transition ${mode === 'login' ? 'bg-primary text-white' : 'text-slate-600'}`}
              >
                Login
              </button>
              <button
                type='button'
                onClick={() => switchMode('signup')}
                className={`rounded-full px-5 py-2 transition ${mode === 'signup' ? 'bg-primary text-white' : 'text-slate-600'}`}
              >
                Signup
              </button>
            </div>
          )}

          <div className='mt-8'>
            <h2 className='text-2xl font-semibold text-slate-900'>
              {mode === 'signup' ? 'Create your account' : mode === 'forgot' ? 'Reset your password' : 'Welcome back'}
            </h2>
            <p className='mt-2 text-sm text-slate-500'>
              {mode === 'signup'
                ? 'Start interacting with blogs in a few seconds.'
                : mode === 'forgot'
                  ? 'First enter your email, then choose a new password.'
                  : 'Login to continue where you left off.'}
            </p>
          </div>

          {renderForm()}

          {mode === 'forgot' && (
            <button
              type='button'
              onClick={() => switchMode('login')}
              className='mt-5 text-sm font-medium text-primary cursor-pointer'
            >
              Back to login
            </button>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Auth
