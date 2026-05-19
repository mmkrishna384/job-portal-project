import React from 'react'
import Navbar from './shared/Navbar'
import JobCard from './JobCard'
import useGetAllJobs from '../hooks/useGetAllJobs'
import { useSelector } from 'react-redux'

const Jobs = () => {
    useGetAllJobs();
    const { allJobs } = useSelector(store => store.job);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5 px-4'>
                <div className='flex gap-5'>
                    <div className='w-1/4'>
                        {/* Filter Section placeholder */}
                        <div className='w-full bg-white p-5 rounded-md border border-gray-200'>
                            <h1 className='font-bold text-lg mb-3'>Filter Jobs</h1>
                            <hr className='mb-4'/>
                            <h2 className='font-medium mb-2'>Location</h2>
                            <div className='mb-4 space-y-2'>
                                <label className='flex items-center gap-2'><input type='radio' name='location'/> Delhi NCR</label>
                                <label className='flex items-center gap-2'><input type='radio' name='location'/> Bangalore</label>
                                <label className='flex items-center gap-2'><input type='radio' name='location'/> Pune</label>
                            </div>
                            <h2 className='font-medium mb-2'>Industry</h2>
                            <div className='space-y-2'>
                                <label className='flex items-center gap-2'><input type='radio' name='industry'/> Frontend Developer</label>
                                <label className='flex items-center gap-2'><input type='radio' name='industry'/> Backend Developer</label>
                                <label className='flex items-center gap-2'><input type='radio' name='industry'/> FullStack Developer</label>
                            </div>
                        </div>
                    </div>
                    {
                        allJobs.length <= 0 ? <span>Job not found</span> : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                                    {
                                        allJobs.map((job) => (
                                            <JobCard key={job._id} job={job} />
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Jobs
