import React, { useEffect, useMemo, useState } from 'react'
import Moment from 'moment'
import Navbar from '../components/Navbar'
import { useAppContext } from '../context/useAppContext'
import toast from 'react-hot-toast'

const sidebarSections = [
  { id: 'overview', label: 'Profile' },
  { id: 'liked', label: 'Liked Blogs' },
  { id: 'saved', label: 'Saved Blogs' },
  { id: 'comments', label: 'Comments' }
]

const Profile = () => {
  const { userToken, userProfile, fetchUserProfile, updateUserPassword, logoutUser, navigate } = useAppContext()
  const [activeSection, setActiveSection] = useState('overview')
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false)
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: ''
  })

  useEffect(() => {
    if (!userToken) {
      navigate('/auth', { state: { from: '/profile' } })
      return
    }

    const loadProfile = async () => {
      try {
        setIsLoading(true)
        await fetchUserProfile()
      } catch (error) {
        toast.error(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadProfile()
  }, [fetchUserProfile, navigate, userToken])

  const stats = useMemo(() => ({
    liked: userProfile?.likedBlogs?.length || 0,
    saved: userProfile?.savedBlogs?.length || 0,
    comments: userProfile?.comments?.length || 0
  }), [userProfile])

  const handlePasswordSubmit = async (event) => {
    event.preventDefault()

    try {
      setIsUpdatingPassword(true)
      const message = await updateUserPassword(passwordForm)
      toast.success(message)
      setPasswordForm({ currentPassword: '', newPassword: '' })
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsUpdatingPassword(false)
    }
  }

  const renderBlogList = (blogs, emptyState) => {
    if (!blogs?.length) {
      return <div className='rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-sm text-slate-500'>{emptyState}</div>
    }

    return (
      <div className='grid gap-5 md:grid-cols-2'>
        {blogs.map((blog) => (
          <button
            key={blog._id}
            type='button'
            onClick={() => navigate(`/blog/${blog._id}`)}
            className='overflow-hidden rounded-[28px] border border-slate-200 bg-white text-left shadow-[0_18px_50px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(15,23,42,0.10)]'
          >
            <img src={blog.image} alt={blog.title} className='h-48 w-full object-cover' />
            <div className='p-5'>
              <span className='rounded-full bg-primary/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-primary'>{blog.category}</span>
              <h3 className='display-font mt-4 text-2xl text-slate-900'>{blog.title}</h3>
              <p className='mt-3 line-clamp-3 text-sm leading-6 text-slate-600' dangerouslySetInnerHTML={{ __html: blog.subTitle }}></p>
            </div>
          </button>
        ))}
      </div>
    )
  }

  const renderComments = () => {
    if (!userProfile?.comments?.length) {
      return <div className='rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-sm text-slate-500'>You have not commented on any blog yet.</div>
    }

    return (
      <div className='space-y-4'>
        {userProfile.comments.map((comment) => (
          <div key={comment._id} className='rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]'>
            <div className='flex flex-wrap items-center justify-between gap-3'>
              <div>
                <p className='text-sm text-slate-500'>{Moment(comment.createdAt).format('MMMM D, YYYY')}</p>
                <h3 className='display-font mt-2 text-2xl text-slate-900'>{comment.blog.title}</h3>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${comment.isApproved ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                {comment.isApproved ? 'Approved' : 'Pending approval'}
              </span>
            </div>
            <p className='mt-4 text-sm leading-7 text-slate-700'>{comment.content}</p>
            <button
              type='button'
              onClick={() => navigate(`/blog/${comment.blog._id}`)}
              className='mt-5 rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 transition hover:border-primary hover:text-primary'
            >
              Open blog
            </button>
          </div>
        ))}
      </div>
    )
  }

  const renderContent = () => {
    if (isLoading) {
      return <div className='rounded-[32px] border border-slate-200 bg-white p-8 text-sm text-slate-500 shadow-[0_18px_50px_rgba(15,23,42,0.06)]'>Loading your profile...</div>
    }

    if (!userProfile) {
      return <div className='rounded-[32px] border border-slate-200 bg-white p-8 text-sm text-slate-500 shadow-[0_18px_50px_rgba(15,23,42,0.06)]'>Unable to load your profile right now.</div>
    }

    if (activeSection === 'liked') {
      return renderBlogList(userProfile.likedBlogs, 'You have not liked any blogs yet.')
    }

    if (activeSection === 'saved') {
      return renderBlogList(userProfile.savedBlogs, 'You have not saved any blogs yet.')
    }

    if (activeSection === 'comments') {
      return renderComments()
    }

    return (
      <div className='space-y-6'>
        <div className='rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-8'>
          <div className='flex flex-wrap items-center justify-between gap-4'>
            <div>
              <p className='text-xs font-semibold uppercase tracking-[0.3em] text-slate-400'>Account overview</p>
              <h2 className='display-font mt-3 text-3xl text-slate-900'>Your profile at a glance.</h2>
            </div>
            <div className='rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600'>
              Member since {Moment(userProfile.user.createdAt).format('YYYY')}
            </div>
          </div>

          <div className='mt-8 grid gap-4 md:grid-cols-3'>
            <div className='rounded-[24px] border border-slate-200 bg-slate-50/80 p-5'>
              <p className='text-xs uppercase tracking-[0.2em] text-slate-400'>Name</p>
              <p className='mt-3 text-lg font-medium text-slate-900'>{userProfile.user.name}</p>
            </div>
            <div className='rounded-[24px] border border-slate-200 bg-slate-50/80 p-5'>
              <p className='text-xs uppercase tracking-[0.2em] text-slate-400'>Email</p>
              <p className='mt-3 text-lg font-medium text-slate-900 break-all'>{userProfile.user.email}</p>
            </div>
            <div className='rounded-[24px] border border-slate-200 bg-slate-50/80 p-5'>
              <p className='text-xs uppercase tracking-[0.2em] text-slate-400'>Joined</p>
              <p className='mt-3 text-lg font-medium text-slate-900'>{Moment(userProfile.user.createdAt).format('MMMM D, YYYY')}</p>
            </div>
          </div>
        </div>

        <div className='rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-8'>
          <p className='text-xs font-semibold uppercase tracking-[0.3em] text-slate-400'>Security</p>
          <h2 className='display-font mt-3 text-3xl text-slate-900'>Update your password.</h2>
          <form onSubmit={handlePasswordSubmit} className='mt-6 grid gap-4 md:grid-cols-2'>
            <input
              type='password'
              placeholder='Current password'
              value={passwordForm.currentPassword}
              onChange={(event) => setPasswordForm((current) => ({ ...current, currentPassword: event.target.value }))}
              required
              className='rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-primary'
            />
            <input
              type='password'
              placeholder='New password'
              value={passwordForm.newPassword}
              onChange={(event) => setPasswordForm((current) => ({ ...current, newPassword: event.target.value }))}
              required
              className='rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-primary'
            />
            <button
              type='submit'
              disabled={isUpdatingPassword}
              className='rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-60'
            >
              {isUpdatingPassword ? 'Updating...' : 'Update password'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className='landing-shell'>
      <div className='landing-grid min-h-screen'>
        <Navbar />

        <div className='mx-4 mt-8 sm:mx-10 xl:mx-20'>
          <div className='overflow-hidden rounded-[36px] border border-white/70 bg-white/85 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur'>
            <div className='grid gap-8 p-6 sm:p-10 lg:grid-cols-[280px_minmax(0,1fr)] xl:p-12'>
              <aside className='flex flex-col border-b border-slate-200 pb-8 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-8'>
                <div className='rounded-[28px] bg-[linear-gradient(160deg,#0f172a_0%,#1e293b_48%,#5044e5_100%)] p-6 text-white shadow-[0_24px_70px_rgba(15,23,42,0.18)]'>
                  <p className='text-xs uppercase tracking-[0.3em] text-white/60'>User profile</p>
                  <h1 className='display-font mt-3 text-3xl'>{userProfile?.user?.name || 'User'}</h1>
                  <p className='mt-3 text-sm text-white/75 break-all'>{userProfile?.user?.email}</p>
                </div>

                <div className='mt-6 flex flex-1 flex-col gap-2'>
                  {sidebarSections.map((section) => (
                    <button
                      key={section.id}
                      type='button'
                      onClick={() => setActiveSection(section.id)}
                      className={`flex items-center justify-between rounded-2xl px-4 py-3 text-left text-sm transition ${activeSection === section.id ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}
                    >
                      <span>{section.label}</span>
                      <span className='text-xs'>
                        {section.id === 'liked' ? stats.liked : section.id === 'saved' ? stats.saved : section.id === 'comments' ? stats.comments : ''}
                      </span>
                    </button>
                  ))}

                  <button
                    type='button'
                    onClick={() => {
                      logoutUser()
                      navigate('/')
                    }}
                    className='mt-auto rounded-2xl border border-rose-200 px-4 py-3 text-sm font-medium text-rose-600 transition hover:bg-rose-50'
                  >
                    Logout
                  </button>
                </div>
              </aside>

              <section className='min-w-0'>
                <div className='mb-6 flex flex-wrap items-center justify-between gap-4'>
                  <div>
                    <p className='text-xs font-semibold uppercase tracking-[0.3em] text-slate-400'>Personal library</p>
                    <h2 className='display-font mt-3 text-4xl text-slate-900'>Your reading history, saved cleanly.</h2>
                  </div>
                  <div className='rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600'>
                    {stats.liked + stats.saved + stats.comments} tracked actions
                  </div>
                </div>

                <div className='mb-6 flex flex-wrap gap-2 lg:hidden'>
                  {sidebarSections.map((section) => (
                    <button
                      key={section.id}
                      type='button'
                      onClick={() => setActiveSection(section.id)}
                      className={`rounded-full px-4 py-2 text-sm transition ${activeSection === section.id ? 'bg-slate-950 text-white' : 'border border-slate-200 bg-white text-slate-700'}`}
                    >
                      {section.label}
                    </button>
                  ))}
                </div>

                {renderContent()}
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
