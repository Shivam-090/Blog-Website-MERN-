import { Outlet } from 'react-router-dom'
import WriterSidebar from '../../components/writer/WriterSidebar'
import { useAppContext } from '../../context/useAppContext'

const WriterLayout = () => {
  const { writer, navigate } = useAppContext()

  return (
    <>
      <div  onClick={()=>navigate('/')} className='flex h-[76px] cursor-pointer items-center justify-between border-b border-[#e7e6fb] bg-white/90 px-4 py-2 backdrop-blur sm:px-12'>
        <span>
        <span className=' md:text-2xl font-bold text-black'>Digital</span> <span className='md:text-2xl font-bold text-[#702ae1] italic'>Ethereal</span>
        </span>
        <div className='text-right'>
          <p className='text-[11px] font-bold uppercase tracking-[0.22em] text-[#8d88b5]'>Writer workspace</p>
          <p className='text-sm font-semibold text-slate-800'>{writer?.name || 'Writer'}</p>
        </div>
      </div>

      <div className='flex min-h-[calc(100vh-76px)] bg-[#f6f6ff]'>
        <WriterSidebar />
        <Outlet />
      </div>
    </>
  )
}

export default WriterLayout
