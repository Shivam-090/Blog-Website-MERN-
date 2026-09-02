import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { LuCircleCheck, LuClock, LuMessageSquare } from 'react-icons/lu'
import WriterCommentTableItem from '../../components/writer/WriterCommentTableItem'
import { useAppContext } from '../../context/useAppContext'
import toast from 'react-hot-toast'

const WriterComments = () => {
  const { writerAxios } = useAppContext()
  const [comments, setComments] = useState([])
  const [filter, setFilter] = useState('Not Approved')

  const fetchComments = useCallback(async () => {
    try {
      const { data } = await writerAxios.get('/api/writer/comments')
      data.success ? setComments(data.comments) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }, [writerAxios])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  const pendingCount = useMemo(() => comments.filter((c) => !c.isApproved).length, [comments])
  const approvedCount = useMemo(() => comments.filter((c) => c.isApproved).length, [comments])

  const filteredComments = useMemo(() => {
    return comments.filter((comment) => {
      if (filter === 'Approved') return comment.isApproved === true
      return comment.isApproved === false
    })
  }, [comments, filter])

  return (
    <div className="p-5 sm:p-8 lg:p-10">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Header Title */}
        <div className="space-y-2 border-b border-slate-200/80 pb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#702ae1]">Community & Readers</span>
          <h1 className="font-[Manrope] text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Discussion Comments
          </h1>
          <p className="text-sm text-slate-500">Review, approve, or moderate reader comments on your articles.</p>
        </div>

        {/* Minimal Underline Filter Tabs */}
        <div className="flex items-center gap-6 border-b border-slate-200/80 pb-px">
          <button
            type="button"
            onClick={() => setFilter('Not Approved')}
            className={`relative flex items-center gap-2 pb-3 pt-1 text-sm font-semibold transition-colors ${
              filter === 'Not Approved' ? 'text-slate-950' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <LuClock className="h-4 w-4" />
            <span>Pending Review</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                filter === 'Not Approved'
                  ? 'bg-[#702ae1] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-500'
              }`}
            >
              {pendingCount}
            </span>
            {filter === 'Not Approved' && (
              <span className="absolute bottom-0 left-0 h-[2.5px] w-full rounded-full bg-[#702ae1]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setFilter('Approved')}
            className={`relative flex items-center gap-2 pb-3 pt-1 text-sm font-semibold transition-colors ${
              filter === 'Approved' ? 'text-slate-950' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <LuCircleCheck className="h-4 w-4" />
            <span>Approved Comments</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                filter === 'Approved'
                  ? 'bg-[#702ae1] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-500'
              }`}
            >
              {approvedCount}
            </span>
            {filter === 'Approved' && (
              <span className="absolute bottom-0 left-0 h-[2.5px] w-full rounded-full bg-[#702ae1]" />
            )}
          </button>
        </div>

        {/* Comments Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="border-b border-slate-100 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <tr>
                  <th scope="col" className="px-5 py-3.5">Story & Reader Feedback</th>
                  <th scope="col" className="px-5 py-3.5 max-sm:hidden">Date</th>
                  <th scope="col" className="px-5 py-3.5 text-right">Moderation Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredComments.length ? (
                  filteredComments.map((comment) => (
                    <WriterCommentTableItem
                      key={comment._id}
                      comment={comment}
                      fetchComments={fetchComments}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-5 py-12 text-center text-sm text-slate-400">
                      {filter === 'Not Approved'
                        ? 'All caught up! No pending comments to moderate.'
                        : 'No approved comments yet.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WriterComments
