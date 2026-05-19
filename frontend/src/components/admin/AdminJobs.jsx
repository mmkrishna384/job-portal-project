import React from 'react'
import Navbar from '../shared/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import useGetAllAdminJobs from '../../hooks/useGetAllAdminJobs'
import { useEffect, useState } from 'react'
import { setSearchJobByText } from '../../redux/jobSlice'

const AdminJobs = () => {
    useGetAllAdminJobs();
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    const [input, setInput] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setSearchJobByText(input));
    }, [input, dispatch]);

    const filterJobs = allAdminJobs.filter((job) => {
        if (!searchJobByText) return true;
        return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
    });

    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10 px-4'>
                <div className='flex items-center justify-between my-5'>
                    <input
                        className='w-fit border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#F83002]'
                        placeholder="Filter by name, role"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Link to="/admin/jobs/create" className='bg-[#F83002] text-white px-4 py-2 rounded-md hover:bg-[#c92a03]'>
                        Post New Job
                    </Link>
                </div>
                
                <div className='overflow-x-auto shadow-sm border border-gray-200 rounded-lg'>
                    <table className='w-full text-sm text-left text-gray-500'>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                            <tr>
                                <th className='px-6 py-3'>Company Name</th>
                                <th className='px-6 py-3'>Role</th>
                                <th className='px-6 py-3'>Date Posted</th>
                                <th className='px-6 py-3 text-right'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterJobs.length <= 0 ? (
                                <tr>
                                    <td colSpan="4" className='px-6 py-4 text-center text-gray-500'>No jobs found. Try posting a new one!</td>
                                </tr>
                            ) : (
                                filterJobs?.map((job) => (
                                <tr key={job._id} className='bg-white border-b hover:bg-gray-50'>
                                    <td className='px-6 py-4 font-medium text-gray-900'>{job.company.name}</td>
                                    <td className='px-6 py-4'>{job.title}</td>
                                    <td className='px-6 py-4'>{job.createdAt.split("T")[0]}</td>
                                    <td className='px-6 py-4 text-right'>
                                        <button onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className='text-[#F83002] hover:underline'>
                                            Applicants
                                        </button>
                                    </td>
                                </tr>
                            )))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AdminJobs
