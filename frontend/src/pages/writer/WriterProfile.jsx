import React, { useEffect, useMemo, useState } from 'react'
import Moment from 'moment'
import { AtSign, Edit3, FileText, KeyRound, Lock, Mail, Phone, Save, Sparkles, UserRound, X } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAppContext } from '../../context/useAppContext'

const WriterProfile = () => {
  const { writerToken, writerProfile, fetchWriterProfile, updateWriterProfile, updateWriterPassword, navigate } =
    useAppContext()
  const [isLoading, setIsLoading] = useState(true)
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false)
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false)

  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    phone: '',
    description: ''
  })

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

  useEffect(() => {
    if (writerProfile?.writer) {
      setProfileForm({
        name: writerProfile.writer.name || '',
        email: writerProfile.writer.email || '',
        phone: writerProfile.writer.phone || '',
        description: writerProfile.writer.description || ''
      })
    }
  }, [writerProfile])

  const stats = useMemo(
    () => ({
      totalBlogs: writerProfile?.blogs?.length || 0,
      publishedBlogs: writerProfile?.blogs?.filter((blog) => blog.isPublished).length || 0,
      draftBlogs: writerProfile?.blogs?.filter((blog) => !blog.isPublished).length || 0,
      comments: writerProfile?.comments?.length || 0
    }),
    [writerProfile]
  )

  const handleProfileSubmit = async (event) => {
    event.preventDefault()

    try {
      setIsUpdatingProfile(true)
      const message = await updateWriterProfile(profileForm)
      toast.success(message)
      setIsEditingProfile(false)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsUpdatingProfile(false)
    }
  }

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

  const cancelEditing = () => {
    if (writerProfile?.writer) {
      setProfileForm({
        name: writerProfile.writer.name || '',
        email: writerProfile.writer.email || '',
        phone: writerProfile.writer.phone || '',
        description: writerProfile.writer.description || ''
      })
    }
    setIsEditingProfile(false)
  }

  if (isLoading) {
    return (
      <div className="flex-1 bg-[#f6f6ff] p-4 md:p-8 xl:p-10">
        <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-8 text-center text-sm text-slate-500 shadow-sm">
          Loading writer profile...
        </div>
      </div>
    )
  }

  if (!writerProfile) {
    return (
      <div className="flex-1 bg-[#f6f6ff] p-4 md:p-8 xl:p-10">
        <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-8 text-center text-sm text-slate-500 shadow-sm">
          Unable to load writer profile.
        </div>
      </div>
    )
  }

  return (
    <div className="min-w-0 flex-1 bg-[#f6f6ff] p-4 md:p-8 xl:p-10">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Main Writer Identity Card */}
        <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-[#702ae1] to-[#a855f7] text-2xl font-black text-white shadow-sm">
                {(writerProfile.writer.name || 'W').charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-[Manrope] text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                    {writerProfile.writer.name}
                  </h2>
                  <span className="rounded-full border border-[#702ae1]/30 bg-[#ede9fe] px-2.5 py-0.5 text-[11px] font-bold text-[#702ae1]">
                    Author
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-slate-400">
                  Member since {Moment(writerProfile.writer.createdAt).format('MMMM YYYY')}
                </p>
              </div>
            </div>

            <div>
              {!isEditingProfile ? (
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(true)}
                  className="inline-flex items-center gap-2 rounded-full bg-[#702ae1] px-5 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-[#5e21c2]"
                >
                  <Edit3 className="h-3.5 w-3.5" />
                  Edit Profile
                </button>
              ) : (
                <button
                  type="button"
                  onClick={cancelEditing}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2 text-xs font-bold uppercase tracking-wider text-slate-600 shadow-sm transition hover:bg-slate-50"
                >
                  <X className="h-3.5 w-3.5" />
                  Cancel
                </button>
              )}
            </div>
          </div>

          {!isEditingProfile ? (
            <div className="mt-6 space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Full Name</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{writerProfile.writer.name}</p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Username</p>
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-slate-400">
                      <Lock className="h-2.5 w-2.5" /> Locked
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-slate-900">@{writerProfile.writer.username}</p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Email Address</p>
                  <p className="mt-1 truncate text-sm font-semibold text-slate-900">{writerProfile.writer.email}</p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Phone</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{writerProfile.writer.phone || 'Not set'}</p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">About the Author</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  {writerProfile.writer.description || 'No bio provided yet.'}
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleProfileSubmit} className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 transition focus:border-[#702ae1] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#702ae1]/10"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 transition focus:border-[#702ae1] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#702ae1]/10"
                    placeholder="Email"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 transition focus:border-[#702ae1] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#702ae1]/10"
                    placeholder="Phone number"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-400">
                    Username (Permanent)
                  </label>
                  <input
                    type="text"
                    value={writerProfile.writer.username}
                    disabled
                    readOnly
                    className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm text-slate-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600">
                  Author Biography
                </label>
                <textarea
                  rows={3}
                  value={profileForm.description}
                  onChange={(e) => setProfileForm({ ...profileForm, description: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 text-sm text-slate-900 transition focus:border-[#702ae1] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#702ae1]/10"
                  placeholder="Tell readers about your perspective and writing focus..."
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isUpdatingProfile}
                  className="rounded-full bg-[#702ae1] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-[#5e21c2] disabled:opacity-60"
                >
                  {isUpdatingProfile ? 'Saving...' : 'Save Profile'}
                </button>
                <button
                  type="button"
                  onClick={cancelEditing}
                  className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        {/* 4 Metric Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Stories</span>
            <p className="mt-3 font-[Manrope] text-3xl font-extrabold tracking-tight text-slate-900">{stats.totalBlogs}</p>
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Published</span>
            <p className="mt-3 font-[Manrope] text-3xl font-extrabold tracking-tight text-slate-900">
              {stats.publishedBlogs}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Drafts</span>
            <p className="mt-3 font-[Manrope] text-3xl font-extrabold tracking-tight text-slate-900">{stats.draftBlogs}</p>
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Reader Comments</span>
            <p className="mt-3 font-[Manrope] text-3xl font-extrabold tracking-tight text-slate-900">{stats.comments}</p>
          </div>
        </div>

        {/* Security / Password Update */}
        <div className="max-w-2xl rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3f0ff] text-[#702ae1]">
              <KeyRound className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-[Manrope] text-xl font-bold text-slate-900">Security Credentials</h3>
              <p className="text-xs text-slate-500">Update your writer account login password</p>
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
                placeholder="New password (min 6 characters)"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm((prev) => ({ ...prev, newPassword: e.target.value }))}
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-[#702ae1] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#702ae1]/10"
              />
            </div>

            <button
              type="submit"
              disabled={isUpdatingPassword}
              className="rounded-full bg-[#702ae1] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-[#5e21c2] disabled:opacity-60"
            >
              {isUpdatingPassword ? 'Saving...' : 'Update Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default WriterProfile
