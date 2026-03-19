import React, { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import Moment from 'moment'
import { useAppContext } from '../../context/useAppContext'

const WriterProfile = () => {
  const { writerToken, writerProfile, fetchWriterProfile, updateWriterPassword, navigate } = useAppContext()
  const [activeSection, setActiveSection] = useState('details')
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false)
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: ''
  })

  useEffect(() => {
    if (!writerToken) {
      navigate('/writer')
      return
    }

    const loadProfile = async () => {
      try {
        setIsLoading(true)
        await fetchWriterProfile()
      } catch (error) {
        toast.error(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadProfile()
  }, [fetchWriterProfile, navigate, writerToken])

  const stats = useMemo(() => ({
    blogs: writerProfile?.blogs?.length || 0,
    comments: writerProfile?.comments?.length || 0
  }), [writerProfile])

  const handlePasswordSubmit = async (event) => {
    event.preventDefault()
    try {
      setIsUpdatingPassword(true)
      const message = await updateWriterPassword(passwordForm)
      toast.success(message)
      setPasswordForm({ currentPassword: '', newPassword: '' })
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsUpdatingPassword(false)
    }
  }

  const renderBlogs = () => {
    if (!writerProfile?.blogs?.length) {
      return <div className='rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-sm text-slate-500'>You have not written any blogs yet.</div>
    }

    return (
      <div className='grid gap-4 md:grid-cols-2'>
        {writerProfile.blogs.map((blog) => (
          <button key={blog._id} type='button' onClick={() => navigate(`/blog/${blog._id}`)} className='overflow-hidden rounded-3xl border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg'>
            <img src={blog.image} alt={blog.title} className='h-44 w-full object-cover' />
            <div className='p-5'>
              <span className='rounded-full bg-primary/10 px-3 py-1 text-xs text-primary'>{blog.category}</span>
              <h3 className='mt-3 text-lg font-semibold text-slate-900'>{blog.title}</h3>
              <p className='mt-2 text-sm text-slate-600'>{blog.isPublished ? 'Published' : 'Draft'}</p>
            </div>
          </button>
        ))}
      </div>
    )
  }

  const renderComments = () => {
    if (!writerProfile?.comments?.length) {
      return <div className='rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-sm text-slate-500'>No one has commented on your blogs yet.</div>
    }

    return (
      <div className='space-y-4'>
        {writerProfile.comments.map((comment) => (
          <div key={comment._id} className='rounded-3xl border border-slate-200 bg-white p-5 shadow-sm'>
            <div className='flex flex-wrap items-center justify-between gap-3'>
              <div>
                <p className='text-sm text-slate-500'>{Moment(comment.createdAt).format('MMMM D, YYYY')}</p>
                <h3 className='mt-1 text-lg font-semibold text-slate-900'>{comment.blog?.title}</h3>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${comment.isApproved ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                {comment.isApproved ? 'Approved' : 'Pending approval'}
              </span>
            </div>
            <p className='mt-4 text-sm text-slate-700'>{comment.content}</p>
          </div>
        ))}
      </div>
    )
  }

  if (isLoading) {
    return <div className='flex-1 p-4 md:p-10 bg-blue-50/50'><div className='rounded-3xl border border-slate-200 bg-white p-8 text-sm text-slate-500'>Loading writer profile...</div></div>
  }

  if (!writerProfile) {
    return <div className='flex-1 p-4 md:p-10 bg-blue-50/50'><div className='rounded-3xl border border-slate-200 bg-white p-8 text-sm text-slate-500'>Unable to load writer profile.</div></div>
  }

  return (
    <div className='flex-1 p-4 md:p-10 bg-blue-50/50'>
      <div className='grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]'>
        <aside className='rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm h-fit'>
          <div className='rounded-[24px] bg-slate-950 p-5 text-white'>
            <p className='text-sm text-slate-300'>Writer profile</p>
            <h1 className='mt-2 text-2xl font-semibold'>{writerProfile.writer.name}</h1>
            <p className='mt-2 text-sm text-slate-300 break-all'>{writerProfile.writer.email}</p>
            <p className='mt-2 text-sm text-slate-300'>{writerProfile.writer.phone}</p>
          </div>

          <div className='mt-6 space-y-2'>
            <button type='button' onClick={() => setActiveSection('details')} className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm transition ${activeSection === 'details' ? 'bg-primary text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}>Details</button>
            <button type='button' onClick={() => setActiveSection('blogs')} className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm transition ${activeSection === 'blogs' ? 'bg-primary text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}>Blogs <span className='text-xs'>{stats.blogs}</span></button>
            <button type='button' onClick={() => setActiveSection('comments')} className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm transition ${activeSection === 'comments' ? 'bg-primary text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}>Comments <span className='text-xs'>{stats.comments}</span></button>
          </div>
        </aside>

        <section className='space-y-6'>
          {activeSection === 'blogs' && renderBlogs()}
          {activeSection === 'comments' && renderComments()}
          {activeSection === 'details' && (
            <>
              <div className='rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm'>
                <h2 className='text-2xl font-semibold text-slate-900'>Writer details</h2>
                <div className='mt-6 grid gap-4 md:grid-cols-4'>
                  <div className='rounded-2xl bg-slate-50 p-4'>
                    <p className='text-xs uppercase tracking-[0.2em] text-slate-400'>Name</p>
                    <p className='mt-2 text-base font-medium text-slate-900'>{writerProfile.writer.name}</p>
                  </div>
                  <div className='rounded-2xl bg-slate-50 p-4'>
                    <p className='text-xs uppercase tracking-[0.2em] text-slate-400'>Email</p>
                    <p className='mt-2 text-base font-medium text-slate-900 break-all'>{writerProfile.writer.email}</p>
                  </div>
                  <div className='rounded-2xl bg-slate-50 p-4'>
                    <p className='text-xs uppercase tracking-[0.2em] text-slate-400'>Phone</p>
                    <p className='mt-2 text-base font-medium text-slate-900'>{writerProfile.writer.phone}</p>
                  </div>
                  <div className='rounded-2xl bg-slate-50 p-4'>
                    <p className='text-xs uppercase tracking-[0.2em] text-slate-400'>Joined</p>
                    <p className='mt-2 text-base font-medium text-slate-900'>{Moment(writerProfile.writer.createdAt).format('MMMM D, YYYY')}</p>
                  </div>
                </div>
              </div>

              <div className='rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm'>
                <h2 className='text-2xl font-semibold text-slate-900'>Update password</h2>
                <form onSubmit={handlePasswordSubmit} className='mt-6 grid gap-4 md:grid-cols-2'>
                  <input type='password' placeholder='Current password' value={passwordForm.currentPassword} onChange={(event) => setPasswordForm((current) => ({ ...current, currentPassword: event.target.value }))} required className='rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-primary' />
                  <input type='password' placeholder='New password' value={passwordForm.newPassword} onChange={(event) => setPasswordForm((current) => ({ ...current, newPassword: event.target.value }))} required className='rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-primary' />
                  <button type='submit' disabled={isUpdatingPassword} className='rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-60'>
                    {isUpdatingPassword ? 'Updating...' : 'Update writer password'}
                  </button>
                </form>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  )
}

export default WriterProfile
