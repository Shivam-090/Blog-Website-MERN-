import React, { useEffect, useState } from 'react'
import { LuArrowRight, LuHeartHandshake, LuSparkles, LuUserRound, LuUsers } from 'react-icons/lu'
import toast from 'react-hot-toast'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import { useAppContext } from '../context/useAppContext'

const Following = () => {
  const { userToken, userProfile, fetchUserProfile, navigate } = useAppContext()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!userToken) {
      navigate('/auth', { state: { from: '/following' } })
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

  return (
    <div className="ethereal-shell min-h-screen overflow-x-clip bg-[#f6f6ff]">
      <div className="ethereal-orb ethereal-orb-primary" />
      <div className="ethereal-orb ethereal-orb-secondary" />

      <Navbar containerClassName="mx-auto w-full px-4 sm:px-6 lg:px-10" />

      <main className="mx-auto w-full max-w-7xl px-4 pb-20 pt-8 sm:px-6 sm:pt-12 lg:px-10">
        {/* Header Section */}
        <div className="mb-10 flex flex-col gap-4 border-b border-slate-200/80 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center rounded-full bg-[#ede9fe] px-3.5 py-1 text-xs font-bold text-[#702ae1]">
              Following Feed
            </div>
            <h1 className="font-[Manrope] text-3xl font-extrabold tracking-[-0.04em] text-slate-900 sm:text-4xl lg:text-5xl">
              Writers You Follow
            </h1>
            <p className="max-w-2xl text-base text-slate-500 sm:text-lg">
              Keep up with the thinkers, essayists, and creators whose work you want to revisit regularly.
            </p>
          </div>

          <div className="flex-shrink-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-700 shadow-sm">
              <LuUsers className="h-4 w-4 text-[#702ae1]" />
              {userProfile?.followingWriters?.length || 0} Authors
            </span>
          </div>
        </div>

        {/* Following List */}
        <section>
          {isLoading ? (
            <div className="flex min-h-[40vh] items-center justify-center">
              <Loader />
            </div>
          ) : userProfile?.followingWriters?.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {userProfile.followingWriters.map((writer) => (
                <div
                  key={writer._id}
                  onClick={() => navigate(`/writers/${writer.username}`)}
                  className="group flex cursor-pointer flex-col justify-between rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#702ae1]/40 hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center gap-4">
                      <div className="flex h-13 w-13 items-center justify-center rounded-full bg-gradient-to-tr from-[#702ae1] to-[#a855f7] text-xl font-bold text-white shadow-sm">
                        {(writer.name || 'W').charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <h2 className="truncate font-[Manrope] text-lg font-bold text-slate-900 transition group-hover:text-[#702ae1]">
                          {writer.name}
                        </h2>
                        <p className="truncate text-xs font-semibold text-[#702ae1]">@{writer.username}</p>
                      </div>
                    </div>

                    <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-slate-600">
                      {writer.description || 'Contributing author on Digital Ethereal.'}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-bold text-[#702ae1]">
                    <span>View Profile & Stories</span>
                    <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-slate-200/80 bg-white/70 px-8 py-16 text-center backdrop-blur-sm">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#ede9fe] text-xl text-[#702ae1]">
                <LuHeartHandshake className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-[Manrope] text-2xl font-extrabold text-slate-900">
                You are not following any writers yet
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                Discover independent creators, essays, and stories across the platform and click follow on their profile.
              </p>
              <button
                type="button"
                onClick={() => navigate('/writers')}
                className="mt-6 rounded-full bg-[#702ae1] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-[#5e21c2]"
              >
                Browse Writers Directory
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer containerClassName="mx-auto w-full px-4 sm:px-6 lg:px-10" />
    </div>
  )
}

export default Following
