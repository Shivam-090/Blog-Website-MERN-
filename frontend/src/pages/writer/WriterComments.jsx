import React, {useState, useEffect, useCallback} from 'react'
import WriterCommentTableItem from '../../components/writer/WriterCommentTableItem'
import { useAppContext } from '../../context/useAppContext'
import toast from 'react-hot-toast'

const WriterComments = () => {
  const { writerAxios } = useAppContext()
  const [comments, setComments] = useState([])
  const [filter, setFilter] = useState('Not Approved')

  const fetchComments = useCallback(async () => {
    try {
      const {data} = await writerAxios.get('/api/writer/comments')
      data.success ? setComments(data.comments) : toast.error(data.message)
    }catch (error){
      toast.error(error.message)
    }
  }, [writerAxios])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50'>
      <div className='flex justify-between items-center max-w-3xl'>
        <h1>Comments on your blogs</h1>
        <div className='flex gap-4'>
          <button onClick={()=>setFilter('Approved')} className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${filter === 'Approved' ? 'text-primary': 'text-gray-700'}`}>Approved</button>
          <button onClick={()=>setFilter('Not Approved')} className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${filter === 'Not Approved' ? 'text-primary': 'text-gray-700'}`}>Not Approved</button>
        </div>
      </div>

      <div className='relative h-4/5 max-w-3xl overflow-x-auto mt-4 bg-white shadow rounded-lg scrollbar-hide'>
        <table className='w-full text-sm text-gray-500 '>
          <thead>
            <tr>
              <th scope='col' className='px-6 py-3'>Blog Title & Comment</th>
              <th scope='col' className='px-6 py-3 max-sm:hidden'>Date</th>
              <th scope='col' className='px-6 py-3'>Action</th>
            </tr>
          </thead>
          <tbody>
            {comments.filter((comment)=>{
              if(filter === 'Approved') return comment.isApproved === true
              return comment.isApproved === false
            }).map((comment)=> <WriterCommentTableItem key={comment._id} comment={comment} fetchComments={fetchComments} />)}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default WriterComments
