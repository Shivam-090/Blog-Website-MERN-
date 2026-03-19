import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useAppContext } from '../../context/useAppContext'

const WriterAuth = () => {
  const { registerWriter, loginWriter, verifyWriterReset, resetWriterPassword } = useAppContext()
  const [mode, setMode] = useState('login')
  const [resetStep, setResetStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    login: '',
    password: '',
    resetEmail: '',
    resetPhone: '',
    newPassword: ''
  })

  const updateField = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const switchMode = (nextMode) => {
    setMode(nextMode)
    setResetStep(1)
  }

  const handleRegister = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    try {
      await registerWriter({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      })
      toast.success('Writer account created successfully')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    try {
      await loginWriter({
        login: formData.login,
        password: formData.password
      })
      toast.success('Welcome to your writer dashboard')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleVerifyReset = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    try {
      const message = await verifyWriterReset({
        email: formData.resetEmail,
        phone: formData.resetPhone
      })
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
      const message = await resetWriterPassword({
        email: formData.resetEmail,
        phone: formData.resetPhone,
        newPassword: formData.newPassword
      })
      toast.success(message)
      setFormData((current) => ({
        ...current,
        login: current.resetEmail,
        password: '',
        newPassword: ''
      }))
      setMode('login')
      setResetStep(1)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderForm = () => {
    if (mode === 'register') {
      return (
        <form onSubmit={handleRegister} className='mt-8 space-y-4'>
          <input name='name' value={formData.name} onChange={updateField} type='text' placeholder='Writer name' required className='w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-primary' />
          <input name='email' value={formData.email} onChange={updateField} type='email' placeholder='Writer email' required className='w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-primary' />
          <input name='phone' value={formData.phone} onChange={updateField} type='text' placeholder='Writer phone number' required className='w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-primary' />
          <input name='password' value={formData.password} onChange={updateField} type='password' placeholder='Create password' required className='w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-primary' />
          <button disabled={isSubmitting} type='submit' className='w-full rounded-2xl bg-slate-900 px-4 py-3 font-medium text-white disabled:opacity-60'>
            {isSubmitting ? 'Creating...' : 'Create writer account'}
          </button>
        </form>
      )
    }

    if (mode === 'forgot') {
      if (resetStep === 1) {
        return (
          <form onSubmit={handleVerifyReset} className='mt-8 space-y-4'>
            <input name='resetEmail' value={formData.resetEmail} onChange={updateField} type='email' placeholder='Writer email' required className='w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-primary' />
            <input name='resetPhone' value={formData.resetPhone} onChange={updateField} type='text' placeholder='Writer phone number' required className='w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-primary' />
            <button disabled={isSubmitting} type='submit' className='w-full rounded-2xl bg-slate-900 px-4 py-3 font-medium text-white disabled:opacity-60'>
              {isSubmitting ? 'Checking...' : 'Verify writer'}
            </button>
          </form>
        )
      }

      return (
        <form onSubmit={handleResetPassword} className='mt-8 space-y-4'>
          <div className='rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700'>
            Writer verified for {formData.resetEmail}
          </div>
          <input name='newPassword' value={formData.newPassword} onChange={updateField} type='password' placeholder='Enter new password' required className='w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-primary' />
          <button disabled={isSubmitting} type='submit' className='w-full rounded-2xl bg-slate-900 px-4 py-3 font-medium text-white disabled:opacity-60'>
            {isSubmitting ? 'Updating...' : 'Update writer password'}
          </button>
        </form>
      )
    }

    return (
      <form onSubmit={handleLogin} className='mt-8 space-y-4'>
        <input name='login' value={formData.login} onChange={updateField} type='text' placeholder='Email or phone number' required className='w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-primary' />
        <input name='password' value={formData.password} onChange={updateField} type='password' placeholder='Password' required className='w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-primary' />
        <button type='button' onClick={() => switchMode('forgot')} className='text-sm font-medium text-primary cursor-pointer'>Forgot password?</button>
        <button disabled={isSubmitting} type='submit' className='w-full rounded-2xl bg-slate-900 px-4 py-3 font-medium text-white disabled:opacity-60'>
          {isSubmitting ? 'Logging in...' : 'Login to writer dashboard'}
        </button>
      </form>
    )
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,#dbeafe,transparent_35%),linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-6'>
      <div className='grid w-full max-w-6xl gap-8 lg:grid-cols-[1.05fr_0.95fr]'>
        <div className='rounded-[32px] border border-white/60 bg-white/85 p-8 shadow-[0_24px_80px_rgba(80,68,229,0.12)] backdrop-blur-sm sm:p-12'>
          <p className='inline-flex rounded-full border border-primary/20 bg-primary/8 px-4 py-1 text-sm text-primary'>Writer space</p>
          <h1 className='mt-6 text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl'>Write, publish, and manage your own stories from one focused workspace.</h1>
          <p className='mt-5 max-w-xl text-base text-slate-600'>Register as a writer with your name, email, phone number, and password. Once inside, you can create blogs, review comments on your posts, and manage your writer profile.</p>
          <div className='mt-10 grid gap-4 sm:grid-cols-3'>
            <div className='rounded-2xl border border-slate-200 bg-slate-50 p-4'>
              <p className='text-sm font-medium text-slate-900'>Writer register</p>
              <p className='mt-2 text-sm text-slate-600'>Create your writer account with your personal details.</p>
            </div>
            <div className='rounded-2xl border border-slate-200 bg-slate-50 p-4'>
              <p className='text-sm font-medium text-slate-900'>Writer login</p>
              <p className='mt-2 text-sm text-slate-600'>Sign in with either your email address or your phone number.</p>
            </div>
            <div className='rounded-2xl border border-slate-200 bg-slate-50 p-4'>
              <p className='text-sm font-medium text-slate-900'>Writer recovery</p>
              <p className='mt-2 text-sm text-slate-600'>Reset your password by verifying your email and phone together.</p>
            </div>
          </div>
        </div>

        <div className='rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-10'>
          {mode !== 'forgot' && (
            <div className='inline-flex rounded-full bg-slate-100 p-1 text-sm'>
              <button type='button' onClick={() => switchMode('login')} className={`rounded-full px-5 py-2 transition ${mode === 'login' ? 'bg-primary text-white' : 'text-slate-600'}`}>Login</button>
              <button type='button' onClick={() => switchMode('register')} className={`rounded-full px-5 py-2 transition ${mode === 'register' ? 'bg-primary text-white' : 'text-slate-600'}`}>Register</button>
            </div>
          )}

          <div className='mt-8'>
            <h2 className='text-2xl font-semibold text-slate-900'>
              {mode === 'register' ? 'Create writer account' : mode === 'forgot' ? 'Reset writer password' : 'Welcome back, writer'}
            </h2>
            <p className='mt-2 text-sm text-slate-500'>
              {mode === 'register'
                ? 'Use your own details to register as a writer.'
                : mode === 'forgot'
                  ? 'Verify your email and phone to set a new password.'
                  : 'Login with your email or phone number.'}
            </p>
          </div>

          {renderForm()}

          {mode === 'forgot' && (
            <button type='button' onClick={() => switchMode('login')} className='mt-5 text-sm font-medium text-primary cursor-pointer'>
              Back to writer login
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default WriterAuth
