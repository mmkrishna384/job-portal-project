import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '../../utils/constant'
import { setUser } from '../../redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [popoverOpen, setPopoverOpen] = useState(false);

  const logoutHandler = async () => {
      try {
          const res = await axios.get(`${USER_API_END_POINT}/logout`, {
              withCredentials: true
          });
          if (res.data.success) {
              dispatch(setUser(null));
              navigate("/");
              toast.success(res.data.message);
          }
      } catch (error) {
          console.log(error);
          toast.error(error.response?.data?.message || "An error occurred");
      }
  }

  return (
    <div className='bg-white border-b-gray-200 border-b shadow-sm sticky top-0 z-50'>
      <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4 md:px-8'>
        <div>
          <h1 className='text-2xl font-bold tracking-tighter'>Job<span className='text-[#F83002]'>Portal</span></h1>
        </div>
        
        <div className='flex items-center gap-8'>
          <ul className='hidden md:flex font-medium items-center gap-8 text-gray-600'>
            {user && user.role === 'recruiter' ? (
                <>
                  <li className='hover:text-[#F83002] transition-colors'><Link to="/admin/companies">Companies</Link></li>
                  <li className='hover:text-[#F83002] transition-colors'><Link to="/admin/jobs">Jobs</Link></li>
                </>
            ) : (
                <>
                  <li className='hover:text-[#F83002] transition-colors'><Link to="/">Home</Link></li>
                  <li className='hover:text-[#F83002] transition-colors'><Link to="/jobs">Jobs</Link></li>
                  <li className='hover:text-[#F83002] transition-colors'><Link to="/browse">Browse</Link></li>
                </>
            )}
          </ul>
          {!user ? (
            <div className='flex items-center gap-4'>
              <Link to="/login" className='px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors'>Login</Link>
              <Link to="/signup" className='px-4 py-2 bg-[#F83002] text-white rounded-md hover:bg-[#c92a03] transition-colors'>Signup</Link>
            </div>
          ) : (
            <div className='relative flex items-center gap-2'>
              <div 
                onClick={() => setPopoverOpen(!popoverOpen)}
                className='w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-[#F83002] cursor-pointer hover:bg-gray-300 transition-all'>
                {user?.profile?.profilePhoto ? (
                    <img src={user.profile.profilePhoto} alt="profile" className='w-full h-full rounded-full object-cover' />
                ) : (
                    user?.fullname?.charAt(0) || "U"
                )}
              </div>
              
              {popoverOpen && (
                  <div className='absolute right-0 top-12 w-48 bg-white border border-gray-200 rounded-md shadow-lg p-2 z-50'>
                      <div className='p-2 border-b border-gray-200'>
                          <h4 className='font-medium'>{user?.fullname}</h4>
                          <p className='text-xs text-gray-500'>{user?.email}</p>
                      </div>
                      <div className='flex flex-col gap-1 mt-2'>
                          {user.role === 'student' && (
                            <Link to="/profile" className='p-2 hover:bg-gray-100 rounded-md text-sm' onClick={() => setPopoverOpen(false)}>View Profile</Link>
                          )}
                          <button onClick={logoutHandler} className='p-2 text-left text-red-600 hover:bg-gray-100 rounded-md text-sm'>Logout</button>
                      </div>
                  </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
