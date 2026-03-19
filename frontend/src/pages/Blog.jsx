import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets } from '../assets/assets';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Moment from 'moment';
import Loader from '../components/Loader';
import { useAppContext } from '../context/useAppContext';
import toast from 'react-hot-toast';
import BlogEngagement from '../components/BlogEngagement';

const Blog = () => {

  const {id} = useParams();
  const {api, userAxios, user, userToken, navigate} = useAppContext()

  const [data, setData] = useState(null)
  const [comments, setComments] = useState([])
  const [content, setContent] = useState('')

  const fetchBlogData = useCallback(async () => {
    try{
      const {data} = await api.get(`/api/blog/${id}`)
      data.success ? setData(data.blog) : toast.error(data.message)
    }catch (error){
      toast.error(error.message)
    }
  }, [api, id])

  const fetchComments = useCallback(async () => {
    try{
      const {data} = await api.post(`/api/blog/comments`, {blogId: id})
      if(data.success){
        setComments(data.comments)
      }else{
        toast.error(data.message)
      }
    }catch (error){
      toast.error(error.message)
    }
  }, [api, id])

  const addComment = async (e)=>{
    e.preventDefault();

    if (!userToken) {
      toast.error('Please login to comment on this blog')
      navigate('/auth', { state: { from: `/blog/${id}` } })
      return
    }

    try{
      const {data} = await userAxios.post(`/api/blog/add-comment`, {blog: id, content})
      if(data.success){
        toast.success(data.message);
        setContent('')
        setData((currentData) => currentData ? { ...currentData, commentsCount: data.commentsCount } : currentData)
      }
      else{
        toast.error(data.message);
      }
    }catch (error){
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, [fetchBlogData, fetchComments])

  const scrollToComments = () => {
    const commentsSection = document.getElementById('blog-comments-section')
    commentsSection?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return data ? (
    <div className='mx-8 sm:mx-16 xl:mx-24 relative'>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,),linear-gradient(to_bottom,#8080800a_1px,)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-25 -z-10 m-auto h-[400px] w-[400px] rounded-full bg-sky-500 opacity-35 blur-[100px]"></div>
      </div>
      <Navbar />
      <div className='text-center mt-20 text-gray-600' >
        <p className='text-primary py-4 font-medium'>Published on {Moment(data.createdAt).format('MMMM Do YYYY')}</p>
        <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800'>{data.title}</h1>
        <h2 className='my-5 max-w-lg truncate mx-auto' dangerouslySetInnerHTML={{__html:data.subTitle}}></h2>
        <p className='inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary'>{data.writerName || 'Mr. Test'}</p>
        <div className='flex justify-center'>
          <BlogEngagement
            blog={data}
            onBlogUpdate={setData}
            onCommentClick={scrollToComments}
            showShare={false}
            className='justify-center'
          />
        </div>
      </div>

      <div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6'>
        <img src={data.image} alt={data.title} className='rounded-3xl mb-5 w-full' />

        <div className='rich-text max-w-3xl' dangerouslySetInnerHTML={{__html: data.description}}></div>

        <div id='blog-comments-section' className='mt-14 mb-10 max-w-3xl mx-auto'>
          <p className='font-semibold mb-4'>Comments {comments.length}</p>
          <div className='flex flex-col gap-4'>
            {comments.map((item, index) =>(
              <div key={index} className='relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-600'>
                <div>
                  <img src={assets.user_icon} alt="" className='w-6'/>
                  <p className='font-medium'>{item.name}</p>

                </div>
                <p className='text-sm max-w-md ml-8'>{item.content}</p>
                <div className='absolute right-4 bottom-3 flex items-center gap-2 text-xs'>{Moment(item.createdAt).fromNow()}</div>
              </div>
            ))}
          </div>
        </div>

        <div className='max-w-3xl mx-auto'>
          <p className='font-semibold mb-4'>Add your comment</p>
          {user ? (
            <form onSubmit={addComment} className='flex flex-col items-start gap-4 max-w-lg'>
              <input value={user.name} type="text" readOnly className='w-full p-2 border border-gray-300 rounded outline-none bg-gray-50 text-gray-500' />
              <textarea onChange={(e)=> setContent(e.target.value)} value={content} placeholder='Comment' required className='w-full p-2 border border-gray-300 rounded outline-none h-48'></textarea>

              <button type="submit" className='bg-primary text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer'>Submit</button>
            </form>
          ) : (
            <div className='max-w-lg'>
              <p className='text-sm text-gray-500 mb-4'>Login to add a comment on this blog.</p>
              <button onClick={() => navigate('/auth', { state: { from: `/blog/${id}` } })} className='bg-primary text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer'>
                Login / Signup
              </button>
            </div>
          )}
        </div>
        
        <div className='my-24 max-w-3xl mx-auto'>
          <p className='font-semibold my-4'>Share this article on social media</p>

          <div className='flex'>
            <img src={assets.facebook_icon} width={50} alt="Facebook" />
            <img src={assets.twitter_icon} width={50} alt="Twitter" />
            <img src={assets.googleplus_icon} width={50} alt="Google Plus" />
          </div>
        
        </div>

      </div>

      <Footer />
    </div>
  ) : <div className="flex justify-center items-center h-screen bg-gray-100">
    <Loader /></div>
}

export default Blog
