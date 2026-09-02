import React, { useState, useEffect, useCallback } from 'react'
import { LuBookOpen, LuClock, LuFileText, LuMessageSquare, LuPlus, LuSparkles } from 'react-icons/lu'
import WriterBlogTableItem from '../../components/writer/WriterBlogTableItem'
import { useAppContext } from '../../context/useAppContext'
import toast from 'react-hot-toast'

const WriterDashboard = () => {
  const { writerAxios, navigate } = useAppContext()

  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: []
  })

  const fetchDashboard = useCallback(async () => {
    try {
      const { data } = await writerAxios.get('/api/writer/dashboard')
      data.success ? setDashboardData(data.dashboardData) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }, [writerAxios])

  useEffect(() => {
    fetchDashboard()
  }, [fetchDashboard])

  return (
    <div className="p-5 sm:p-8 lg:p-10">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header Title & CTA */}
        <div className="flex flex-col gap-4 border-b border-slate-200/80 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#702ae1]">Dashboard</span>
            <h1 className="font-[Manrope] text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Workspace Overview
            </h1>
            <p className="text-sm text-slate-500">Monitor your articles, reader conversations, and draft progress.</p>
          </div>

          <div>
            <button
              type="button"
              onClick={() => navigate('/writer/addBlog')}
              className="inline-flex items-center gap-2 rounded-full bg-[#702ae1] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-[#5e21c2]"
            >
              <LuPlus className="h-4 w-4" />
              Write New Story
            </button>
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Stories</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ede9fe] text-[#702ae1]">
                <LuFileText className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-3 font-[Manrope] text-3xl font-extrabold tracking-tight text-slate-900">
              {dashboardData.blogs}
            </p>
            <p className="mt-1 text-xs text-slate-400">Published stories</p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Reader Comments</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <LuMessageSquare className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-3 font-[Manrope] text-3xl font-extrabold tracking-tight text-slate-900">
              {dashboardData.comments}
            </p>
            <p className="mt-1 text-xs text-slate-400">Engagements across articles</p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Drafts</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                <LuClock className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-3 font-[Manrope] text-3xl font-extrabold tracking-tight text-slate-900">
              {dashboardData.drafts}
            </p>
            <p className="mt-1 text-xs text-slate-400">Unpublished stories in progress</p>
          </div>
        </div>

        {/* Recent Stories Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-[Manrope] text-xl font-bold text-slate-900">Recent Stories</h2>
            <button
              type="button"
              onClick={() => navigate('/writer/listBlog')}
              className="text-xs font-bold text-[#702ae1] hover:underline"
            >
              View all stories →
            </button>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="border-b border-slate-100 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <tr>
                    <th scope="col" className="px-5 py-3.5">#</th>
                    <th scope="col" className="px-5 py-3.5">Story Title</th>
                    <th scope="col" className="px-5 py-3.5 max-sm:hidden">Date</th>
                    <th scope="col" className="px-5 py-3.5 max-sm:hidden">Status</th>
                    <th scope="col" className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {dashboardData.recentBlogs?.length ? (
                    dashboardData.recentBlogs.map((blog, index) => (
                      <WriterBlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchDashboard} index={index + 1} />
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-5 py-10 text-center text-sm text-slate-400">
                        No stories published yet. Start writing your first story above!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WriterDashboard
