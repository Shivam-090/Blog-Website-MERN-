import React, { useEffect, useMemo, useState } from 'react'
import Moment from 'moment'
import {
  LuBookmark,
  LuCalendar,
  LuCircleCheck,
  LuCircleUserRound,
  LuClock,
  LuHeart,
  LuLock,
  LuLogOut,
  LuMail,
  LuMessageSquare,
  LuShield,
  LuSparkles,
  LuSquarePen,
  LuUser
} from 'react-icons/lu'
import toast from 'react-hot-toast'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BlogCard from '../components/BlogCard'
import { useAppContext } from '../context/useAppContext'

const Profile = () => {
  const { userToken, userProfile, fetchUserProfile, updateUserPassword, logoutUser, navigate, user, writerToken } =
    useAppContext()
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

  const stats = useMemo(
    () => ({
      liked: userProfile?.likedBlogs?.length || 0,
      saved: userProfile?.savedBlogs?.length || 0,
      comments: userProfile?.comments?.length || 0
    }),
    [userProfile]
  )

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

  const navTabs = [
    { id: 'overview', label: 'Overview', icon: <LuUser className="h-4 w-4" /> },
    { id: 'liked', label: 'Liked Stories', count: stats.liked, icon: <LuHeart className="h-4 w-4" /> },
    { id: 'saved', label: 'Saved Stories', count: stats.saved, icon: <LuBookmark className="h-4 w-4" /> },
    { id: 'comments', label: 'Comments', count: stats.comments, icon: <LuMessageSquare className="h-4 w-4" /> },
    { id: 'security', label: 'Security', icon: <LuLock className="h-4 w-4" /> }
  ]

  const renderBlogGrid = (blogs, emptyTitle, emptySubtitle) => {
    if (!blogs?.length) {
      return (
        <div className="rounded-3xl border border-slate-200/80 bg-white/70 px-8 py-16 text-center backdrop-blur-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#f3f0ff] text-xl text-[#702ae1]">
            <LuBookmark />
          </div>
          <h3 className="mt-4 font-[Manrope] text-xl font-bold text-slate-900 sm:text-2xl">{emptyTitle}</h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">{emptySubtitle}</p>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="mt-6 rounded-full bg-[#702ae1] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-[#5e21c2]"
          >
            Explore Stories
          </button>
        </div>
      )
    }

    return (
      <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    )
  }

  const renderCommentsList = () => {
    if (!userProfile?.comments?.length) {
      return (
        <div className="rounded-3xl border border-slate-200/80 bg-white/70 px-8 py-16 text-center backdrop-blur-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#f3f0ff] text-xl text-[#702ae1]">
            <LuMessageSquare />
          </div>
          <h3 className="mt-4 font-[Manrope] text-xl font-bold text-slate-900 sm:text-2xl">No comments yet</h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
            Join the conversation on any story to share your thoughts and perspectives.
          </p>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="mt-6 rounded-full bg-[#702ae1] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-[#5e21c2]"
          >
            Explore Stories
          </button>
        </div>
      )
    }

    return (
      <div className="space-y-4">
        {userProfile.comments.map((comment) => (
          <div
            key={comment._id}
            className="group rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-sm transition hover:border-[#702ae1]/40 hover:shadow-md"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs font-medium text-slate-400">
                  {Moment(comment.createdAt).format('MMMM D, YYYY')}
                </span>
                <h4
                  onClick={() => navigate(`/blog/${comment.blog?._id}`)}
                  className="mt-1 cursor-pointer font-[Manrope] text-lg font-bold text-slate-900 transition hover:text-[#702ae1]"
                >
                  {comment.blog?.title || 'Editorial Article'}
                </h4>
              </div>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                  comment.isApproved
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                    : 'bg-amber-50 text-amber-700 border border-amber-200/60'
                }`}
              >
                {comment.isApproved ? <LuCircleCheck className="h-3.5 w-3.5" /> : <LuClock className="h-3.5 w-3.5" />}
                {comment.isApproved ? 'Published' : 'Under Review'}
              </span>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-slate-600">{comment.content}</p>

            <div className="mt-4 border-t border-slate-100 pt-3">
              <button
                type="button"
                onClick={() => navigate(`/blog/${comment.blog?._id}`)}
                className="text-xs font-bold text-[#702ae1] hover:underline"
              >
                View full discussion →
              </button>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const renderSecuritySection = () => (
    <div className="max-w-2xl rounded-3xl border border-slate-200/80 bg-white/85 p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3f0ff] text-[#702ae1]">
          <LuShield className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-[Manrope] text-xl font-bold text-slate-900">Account Security</h3>
          <p className="text-xs text-slate-500">Update your password to keep your account safe</p>
        </div>
      </div>

      <form onSubmit={handlePasswordSubmit} className="mt-6 space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600">
            Current Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={passwordForm.currentPassword}
            onChange={(e) => setPasswordForm((prev) => ({ ...prev, currentPassword: e.target.value }))}
            required
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-[#702ae1] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#702ae1]/10"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600">
            New Password
          </label>
          <input
            type="password"
            placeholder="Minimum 6 characters"
            value={passwordForm.newPassword}
            onChange={(e) => setPasswordForm((prev) => ({ ...prev, newPassword: e.target.value }))}
            required
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-[#702ae1] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#702ae1]/10"
          />
        </div>

        <button
          type="submit"
          disabled={isUpdatingPassword}
          className="mt-2 rounded-full bg-[#702ae1] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-[#5e21c2] disabled:opacity-60"
        >
          {isUpdatingPassword ? 'Saving Changes...' : 'Update Password'}
        </button>
      </form>
    </div>
  )

  const renderOverview = () => (
    <div className="space-y-8">
      {/* 3 Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div
          onClick={() => setActiveSection('liked')}
          className="group cursor-pointer rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-sm transition hover:border-[#702ae1]/30 hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Liked Stories</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-50 text-rose-500">
              <LuHeart className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-4 font-[Manrope] text-4xl font-extrabold tracking-tight text-slate-900">{stats.liked}</p>
          <p className="mt-1 text-xs text-slate-400">Articles you've appreciated</p>
        </div>

        <div
          onClick={() => setActiveSection('saved')}
          className="group cursor-pointer rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-sm transition hover:border-[#702ae1]/30 hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Saved Stories</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ede9fe] text-[#702ae1]">
              <LuBookmark className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-4 font-[Manrope] text-4xl font-extrabold tracking-tight text-slate-900">{stats.saved}</p>
          <p className="mt-1 text-xs text-slate-400">Bookmarked for later reading</p>
        </div>

        <div
          onClick={() => setActiveSection('comments')}
          className="group cursor-pointer rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-sm transition hover:border-[#702ae1]/30 hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Comments</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <LuMessageSquare className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-4 font-[Manrope] text-4xl font-extrabold tracking-tight text-slate-900">{stats.comments}</p>
          <p className="mt-1 text-xs text-slate-400">Conversations participated in</p>
        </div>
      </div>

      {/* Account Details & Status */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-slate-200/80 bg-white/80 p-6 shadow-sm sm:p-8">
          <h3 className="font-[Manrope] text-lg font-bold text-slate-900">Personal Information</h3>
          <div className="mt-6 space-y-4 text-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-slate-500">Full Name</span>
              <span className="font-semibold text-slate-900">{userProfile?.user?.name || user?.name}</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-slate-500">Email Address</span>
              <span className="font-semibold text-slate-900">{userProfile?.user?.email || user?.email}</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-slate-500">Membership</span>
              <span className="font-semibold text-slate-900">Reader Account</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Member Since</span>
              <span className="font-semibold text-slate-900">
                {Moment(userProfile?.user?.createdAt || user?.createdAt).format('MMMM D, YYYY')}
              </span>
            </div>
          </div>
        </div>

        {/* Writer Tools CTA */}
        <div className="relative overflow-hidden rounded-3xl border border-[#702ae1]/20 bg-[linear-gradient(135deg,#faf5ff,#f3e8ff)] p-6 shadow-sm sm:p-8">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#702ae1]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#702ae1]">
            <LuSquarePen className="h-3.5 w-3.5" />
            Writer Studio
          </div>
          <h3 className="mt-4 font-[Manrope] text-2xl font-extrabold tracking-tight text-slate-900">
            {writerToken ? 'Jump to Writer Dashboard' : 'Ready to share your stories?'}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            {writerToken
              ? 'Create new articles, track readership analytics, and manage comments in your dedicated workspace.'
              : 'Join Digital Ethereal as a contributing author. Publish stories, engage directly with readers, and grow an audience.'}
          </p>
          <button
            type="button"
            onClick={() => navigate('/writer')}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#702ae1] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-[#5e21c2]"
          >
            {writerToken ? 'Open Dashboard' : 'Become a Writer'}
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="ethereal-shell min-h-screen overflow-x-clip bg-[#f6f6ff]">
      <div className="ethereal-orb ethereal-orb-primary" />
      <div className="ethereal-orb ethereal-orb-secondary" />

      {/* Sticky Minimal Navbar */}
      <Navbar containerClassName="mx-auto w-full px-4 sm:px-6 lg:px-10" />

      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-10">
        {/* Profile Hero Header */}
        <div className="mb-10 flex flex-col gap-6 border-b border-slate-200/80 pb-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            {/* User Avatar Circle */}
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-[#702ae1] to-[#a855f7] text-2xl font-black text-white shadow-md sm:h-20 sm:w-20 sm:text-3xl">
              {(userProfile?.user?.name || user?.name || 'U').charAt(0).toUpperCase()}
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-[Manrope] text-2xl font-black tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                  {userProfile?.user?.name || user?.name || 'Reader'}
                </h1>
                <span className="rounded-full border border-[#702ae1]/30 bg-[#ede9fe] px-2.5 py-0.5 text-[11px] font-bold text-[#702ae1]">
                  Reader
                </span>
              </div>
              <p className="flex items-center gap-1.5 text-sm text-slate-500">
                <LuMail className="h-3.5 w-3.5" />
                {userProfile?.user?.email || user?.email}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                logoutUser()
                navigate('/')
              }}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-600 shadow-sm transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600"
            >
              <LuLogOut className="h-3.5 w-3.5" />
              Sign Out
            </button>
            <button
              type="button"
              onClick={() => navigate('/writer')}
              className="rounded-full bg-[linear-gradient(135deg,#702ae1,#9854f7)] px-5 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:brightness-110"
            >
              {writerToken ? 'Writer Studio' : 'Write'}
            </button>
          </div>
        </div>

        {/* Minimal Underline Category-Style Navigation Tabs */}
        <div className="mb-10 flex items-center gap-6 overflow-x-auto border-b border-slate-200/80 pb-px scrollbar-none sm:gap-8">
          {navTabs.map((tab) => {
            const isActive = activeSection === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveSection(tab.id)}
                className={`relative flex items-center gap-2 whitespace-nowrap pb-3.5 pt-1 text-sm font-semibold transition-colors ${
                  isActive ? 'text-slate-950' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {typeof tab.count === 'number' && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                      isActive ? 'bg-[#702ae1] text-white shadow-sm' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
                {isActive && <span className="absolute bottom-0 left-0 h-[2.5px] w-full rounded-full bg-[#702ae1]" />}
              </button>
            )
          })}
        </div>

        {/* Tab Content Section */}
        {isLoading ? (
          <div className="rounded-3xl border border-slate-200/80 bg-white/70 p-12 text-center text-sm text-slate-500 backdrop-blur-sm">
            Loading your profile data...
          </div>
        ) : (
          <div>
            {activeSection === 'overview' && renderOverview()}
            {activeSection === 'liked' &&
              renderBlogGrid(
                userProfile?.likedBlogs,
                'No liked stories yet',
                'Click the heart icon on any article you enjoy to save it to your liked stories.'
              )}
            {activeSection === 'saved' &&
              renderBlogGrid(
                userProfile?.savedBlogs,
                'No saved stories yet',
                'Bookmark articles to build your personal reading list and access them anytime.'
              )}
            {activeSection === 'comments' && renderCommentsList()}
            {activeSection === 'security' && renderSecuritySection()}
          </div>
        )}
      </main>

      {/* Improved Editorial Footer */}
      <Footer containerClassName="mx-auto w-full px-4 sm:px-6 lg:px-10" />
    </div>
  )
}

export default Profile
