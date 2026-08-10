import React, { useEffect, useMemo, useState } from 'react'
import Moment from 'moment'
import { AtSign, Edit3, FileText, KeyRound, Lock, Mail, Phone, Save, Sparkles, UserRound, X } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAppContext } from '../../context/useAppContext'

const WriterProfile = () => {
  const { writerToken, writerProfile, fetchWriterProfile, updateWriterProfile, updateWriterPassword, navigate } = useAppContext()
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

  const stats = useMemo(() => ({
    totalBlogs: writerProfile?.blogs?.length || 0,
    publishedBlogs: writerProfile?.blogs?.filter((blog) => blog.isPublished).length || 0,
    draftBlogs: writerProfile?.blogs?.filter((blog) => !blog.isPublished).length || 0,
    comments: writerProfile?.comments?.length || 0
  }), [writerProfile])

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
        <div className="rounded-[2rem] bg-white/80 p-8 text-sm text-slate-500 shadow-[0_20px_50px_rgba(39,46,66,0.06)]">
          Loading writer profile...
        </div>
      </div>
    )
  }

  if (!writerProfile) {
    return (
      <div className="flex-1 bg-[#f6f6ff] p-4 md:p-8 xl:p-10">
        <div className="rounded-[2rem] bg-white/80 p-8 text-sm text-slate-500 shadow-[0_20px_50px_rgba(39,46,66,0.06)]">
          Unable to load writer profile.
        </div>
      </div>
    )
  }

  return (
    <div className="min-w-0 flex-1 bg-[#f6f6ff] p-4 md:p-8 xl:p-10">
      <section className="space-y-6">
        <div className="rounded-[2rem] bg-white/82 p-6 shadow-[0_20px_50px_rgba(39,46,66,0.06)] backdrop-blur-xl sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#702ae1]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#702ae1]">
                <Sparkles className="h-4 w-4" />
                Current account
              </div>
              <h2 className="mt-4 font-[Manrope] text-3xl font-extrabold tracking-[-0.05em] text-slate-900">
                Your writer identity
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-[#eef0ff] px-4 py-2 text-sm font-semibold text-slate-600">
                Joined {Moment(writerProfile.writer.createdAt).format('MMMM D, YYYY')}
              </div>
              {!isEditingProfile ? (
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(true)}
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#702ae1] px-5 py-2.5 text-sm font-bold text-white shadow-[0_10px_20px_rgba(112,42,225,0.2)] transition hover:bg-[#5b1ebf]"
                >
                  <Edit3 className="h-4 w-4" />
                  Edit profile
                </button>
              ) : (
                <button
                  type="button"
                  onClick={cancelEditing}
                  className="inline-flex items-center gap-2 rounded-2xl bg-slate-200 px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-300"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </button>
              )}
            </div>
          </div>

          {!isEditingProfile ? (
            <>
              <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-[1.5rem] bg-[#f7f8ff] p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-[#702ae1] shadow-[0_10px_20px_rgba(39,46,66,0.06)]">
                    <UserRound className="h-5 w-5" />
                  </div>
                  <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Full name</p>
                  <p className="mt-2 text-base font-semibold text-slate-900">{writerProfile.writer.name}</p>
                </div>

                <div className="rounded-[1.5rem] bg-[#f7f8ff] p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-[#702ae1] shadow-[0_10px_20px_rgba(39,46,66,0.06)]">
                      <AtSign className="h-5 w-5" />
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-200/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      <Lock className="h-3 w-3" /> Fixed
                    </span>
                  </div>
                  <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Username</p>
                  <p className="mt-2 break-all text-base font-semibold text-slate-900">@{writerProfile.writer.username}</p>
                </div>

                <div className="rounded-[1.5rem] bg-[#f7f8ff] p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-[#702ae1] shadow-[0_10px_20px_rgba(39,46,66,0.06)]">
                    <Mail className="h-5 w-5" />
                  </div>
                  <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Email</p>
                  <p className="mt-2 break-all text-base font-semibold text-slate-900">{writerProfile.writer.email}</p>
                </div>

                <div className="rounded-[1.5rem] bg-[#f7f8ff] p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-[#702ae1] shadow-[0_10px_20px_rgba(39,46,66,0.06)]">
                    <Phone className="h-5 w-5" />
                  </div>
                  <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Phone</p>
                  <p className="mt-2 text-base font-semibold text-slate-900">{writerProfile.writer.phone}</p>
                </div>
              </div>

              <div className="mt-6 rounded-[1.75rem] bg-[#f7f3ff] p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-[#702ae1] shadow-[0_10px_20px_rgba(39,46,66,0.06)]">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Writer description</p>
                    <p className="mt-3 text-sm leading-7 text-slate-700">{writerProfile.writer.description}</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <form onSubmit={handleProfileSubmit} className="mt-8 space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Full name</label>
                  <div className="relative">
                    <UserRound className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      required
                      className="w-full rounded-2xl bg-[#f7f8ff] py-3.5 pl-12 pr-4 text-slate-900 outline-none transition focus:shadow-[0_0_0_3px_rgba(112,42,225,0.12)]"
                      placeholder="Your full name"
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="block text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Username</label>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400">
                      <Lock className="h-3 w-3" /> Cannot be changed
                    </span>
                  </div>
                  <div className="relative">
                    <AtSign className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={writerProfile.writer.username}
                      disabled
                      readOnly
                      className="w-full cursor-not-allowed rounded-2xl bg-slate-100 py-3.5 pl-12 pr-4 font-semibold text-slate-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Email address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      required
                      className="w-full rounded-2xl bg-[#f7f8ff] py-3.5 pl-12 pr-4 text-slate-900 outline-none transition focus:shadow-[0_0_0_3px_rgba(112,42,225,0.12)]"
                      placeholder="writer@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Phone number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      required
                      className="w-full rounded-2xl bg-[#f7f8ff] py-3.5 pl-12 pr-4 text-slate-900 outline-none transition focus:shadow-[0_0_0_3px_rgba(112,42,225,0.12)]"
                      placeholder="Phone number"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Writer description</label>
                <div className="relative">
                  <textarea
                    rows={4}
                    value={profileForm.description}
                    onChange={(e) => setProfileForm({ ...profileForm, description: e.target.value })}
                    required
                    className="w-full rounded-2xl bg-[#f7f8ff] p-4 text-slate-900 outline-none transition focus:shadow-[0_0_0_3px_rgba(112,42,225,0.12)]"
                    placeholder="Describe your writing background and interests..."
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={isUpdatingProfile}
                  className="inline-flex items-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#702ae1,#b28cff)] px-6 py-3.5 text-sm font-bold text-white shadow-[0_18px_34px_rgba(112,42,225,0.2)] transition hover:opacity-95 disabled:opacity-60"
                >
                  <Save className="h-4 w-4" />
                  {isUpdatingProfile ? 'Saving profile...' : 'Save changes'}
                </button>
                <button
                  type="button"
                  onClick={cancelEditing}
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[1.75rem] bg-white/82 p-6 shadow-[0_20px_50px_rgba(39,46,66,0.06)]">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Total blogs</p>
            <p className="mt-3 font-[Manrope] text-4xl font-extrabold tracking-[-0.04em] text-slate-900">{stats.totalBlogs}</p>
          </div>
          <div className="rounded-[1.75rem] bg-white/82 p-6 shadow-[0_20px_50px_rgba(39,46,66,0.06)]">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Published</p>
            <p className="mt-3 font-[Manrope] text-4xl font-extrabold tracking-[-0.04em] text-slate-900">{stats.publishedBlogs}</p>
          </div>
          <div className="rounded-[1.75rem] bg-white/82 p-6 shadow-[0_20px_50px_rgba(39,46,66,0.06)]">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Drafts</p>
            <p className="mt-3 font-[Manrope] text-4xl font-extrabold tracking-[-0.04em] text-slate-900">{stats.draftBlogs}</p>
          </div>
          <div className="rounded-[1.75rem] bg-white/82 p-6 shadow-[0_20px_50px_rgba(39,46,66,0.06)]">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Comments</p>
            <p className="mt-3 font-[Manrope] text-4xl font-extrabold tracking-[-0.04em] text-slate-900">{stats.comments}</p>
          </div>
        </div>

        <div className="rounded-[2rem] bg-white/82 p-6 shadow-[0_20px_50px_rgba(39,46,66,0.06)] backdrop-blur-xl sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#702ae1]/10 text-[#702ae1]">
              <KeyRound className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-[Manrope] text-2xl font-extrabold tracking-[-0.04em] text-slate-900">Update password</h2>
              <p className="mt-1 text-sm text-slate-500">Keep your writer dashboard secure.</p>
            </div>
          </div>

          <form onSubmit={handlePasswordSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
            <input
              type="password"
              placeholder="Current password"
              value={passwordForm.currentPassword}
              onChange={(event) => setPasswordForm((current) => ({ ...current, currentPassword: event.target.value }))}
              required
              className="rounded-2xl bg-[#f7f8ff] px-4 py-3 text-slate-700 outline-none transition focus:shadow-[0_0_0_3px_rgba(112,42,225,0.12)]"
            />
            <input
              type="password"
              placeholder="New password"
              value={passwordForm.newPassword}
              onChange={(event) => setPasswordForm((current) => ({ ...current, newPassword: event.target.value }))}
              required
              className="rounded-2xl bg-[#f7f8ff] px-4 py-3 text-slate-700 outline-none transition focus:shadow-[0_0_0_3px_rgba(112,42,225,0.12)]"
            />
            <button
              type="submit"
              disabled={isUpdatingPassword}
              className="rounded-2xl bg-[linear-gradient(135deg,#702ae1,#b28cff)] px-5 py-3 text-sm font-bold text-white shadow-[0_18px_34px_rgba(112,42,225,0.2)] transition hover:opacity-95 disabled:opacity-60"
            >
              {isUpdatingPassword ? 'Updating...' : 'Update writer password'}
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default WriterProfile
