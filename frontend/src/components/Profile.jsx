import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Mail, Contact, Pen, Briefcase } from 'lucide-react'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '../hooks/useGetAppliedJobs'
import UpdateProfileDialog from './UpdateProfileDialog'
import AppliedJobTable from './AppliedJobTable'

const Profile = () => {
    useGetAppliedJobs();
    const { user } = useSelector(store => store.auth);
    const [open, setOpen] = useState(false); // For edit profile dialog

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <div className='h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center font-bold text-3xl text-[#F83002]'>
                            {user?.fullname?.charAt(0)}
                        </div>
                        <div>
                            <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                            <p className='text-gray-500 mt-1'>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <button onClick={() => setOpen(true)} className='p-2 border border-gray-300 rounded-md hover:bg-gray-100 h-fit cursor-pointer'>
                        <Pen size={18} />
                    </button>
                </div>
                
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail className='text-gray-500' size={18} />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact className='text-gray-500' size={18} />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>

                <div className='my-5'>
                    <h1 className='font-bold mb-3'>Skills</h1>
                    <div className='flex items-center gap-2 flex-wrap'>
                        {user?.profile?.skills?.length > 0 ? user?.profile?.skills.map((item, index) => (
                            <span key={index} className='bg-gray-100 px-3 py-1 rounded-full text-sm font-medium'>
                                {item}
                            </span>
                        )) : <span>NA</span>}
                    </div>
                </div>

                <div className='grid w-full max-w-sm items-center gap-1.5 mt-5'>
                    <h1 className='font-bold mb-1'>Resume</h1>
                    {user?.profile?.resumeOriginalName ? (
                        <a href="#" className='text-[#F83002] hover:underline cursor-pointer flex items-center gap-2'>
                            <Briefcase size={16} />
                            {user?.profile?.resumeOriginalName}
                        </a>
                    ) : (
                        <span>NA</span>
                    )}
                </div>
            </div>

            <div className='max-w-4xl mx-auto bg-white rounded-2xl my-10'>
                <h1 className='font-bold text-xl mb-5'>Applied Jobs</h1>
                <AppliedJobTable />
            </div>
            
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile
