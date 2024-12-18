import React from 'react'
import { SiGoogleanalytics } from "react-icons/si";
import { Link, useNavigate } from 'react-router-dom';
import SidebarMenuItems from "./SidebarMenuItems";
import { IoIosClose } from "react-icons/io";
import { FaComputer } from 'react-icons/fa6';

function Sidebar({ open, setOpen }) {

  const navigate = useNavigate()

  return (
    <>
      <div className={`${open ? 'fixed left-0 top-0 w-64 bg-gray-100 ease-in duration-500' : 'fixed left-[-100%] top-0 ease-in duration-500'} lg:hidden h-screen`}>
        <div className='w-64 flex-col  bg-background p-6 lg:flex'>
          <div className=' flex justify-between items-center'>
            <div onClick={() => navigate('/admin/dashboard')} className='flex cursor-pointer items-center gap-2'>
              <SiGoogleanalytics />
              <h1 className='text-xl font-extrabold'>Admin Panel</h1>
            </div>
            <button onClick={() => setOpen(false)} className='text-3xl'>
              <IoIosClose />
            </button>
          </div>
          <SidebarMenuItems setOpen={setOpen} />
        </div>
      </div>

      {/* <aside className='hidden w-64 flex-col border-r bg-background p-6 lg:flex'>
        <div onClick={() => navigate('/admin/dashboard')} className='flex cursor-pointer items-center gap-2'>
          <SiGoogleanalytics />
          <h1 className='text-xl font-extrabold'>Admin Panel</h1>
        </div>
        <SidebarMenuItems />
      </aside> */}

      <aside className='hidden lg:block'>
        <nav className='w-64 flex flex-col border-r bg-background p-6 bg-white h-full'>
          <div onClick={() => navigate('/admin/dashboard')} className='flex cursor-pointer items-center gap-2'>
            <Link to='/' className='flex items-center gap-2 text-orange-500'>
              <span className='font-bold'>GAMERS HUB</span>
              <FaComputer size={30} />
            </Link>
          </div>
          <SidebarMenuItems />
        </nav>
      </aside>


      {/* <aside className='h-screen'>
        <nav className='h-full flex flex-col bg-white shadow-sm fixed'>
          <div onClick={() => navigate('/admin/dashboard')} className='flex cursor-pointer items-center gap-2'>
            <SiGoogleanalytics />
            <h1 className='text-xl font-extrabold'>Admin Panel</h1>
          </div>

          <SidebarMenuItems />

          <div className='border-t flex p-3'>
            <p>Logout</p>
          </div>
        </nav>
      </aside> */}
    </>
  )
}

export default Sidebar
