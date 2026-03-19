import React, {useEffect, useState, useCallback} from 'react'
import WriterBlogTableItem from '../../components/writer/WriterBlogTableItem'
import { useAppContext } from '../../context/useAppContext'
import toast from 'react-hot-toast'

const WriterListBlog = () => {
  const {writerAxios} = useAppContext()
  const [blogs, setBlogs] = useState([])

  const fetchBlogs = useCallback(async () => {
    try{
      const {data} = await writerAxios.get('/api/writer/blogs')
      if(data.success){
        setBlogs(data.blogs)
      }else{
        toast.error(data.message)
      }
    }catch (error){
      toast.error(error.message)
    }
  }, [writerAxios])

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs])

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50'>
      <h1>Your blogs</h1>
      <div className='relative h-4/5 mt-4 max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-xs text-gray-600 text-left uppercase'>
            <tr>
              <th scope='col' className='px-2 py-4 xl:px-6'>#</th>
              <th scope='col' className='px-2 py-4'> Blog Title</th>
              <th scope='col' className='px-2 py-4 max-sm:hidden'> Date</th>
              <th scope='col' className='px-2 py-4 max-sm:hidden'> Status</th>
              <th scope='col' className='px-2 py-4'> Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, index)=>(
              <WriterBlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchBlogs} index={index+1} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default WriterListBlog
