import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { JOB_API_END_POINT } from '../../utils/constant'
import { toast } from 'sonner'

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { companies } = useSelector(store => store.company);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const selectChangeHandler = (e) => {
        setInput({ ...input, companyId: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, {
                title: input.title,
                description: input.description,
                requirements: input.requirements,
                salary: Number(input.salary),
                location: input.location,
                jobType: input.jobType,
                experienceLevel: Number(input.experience),
                position: Number(input.position),
                companyId: input.companyId
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center w-screen my-10'>
                <form onSubmit={submitHandler} className='p-8 max-w-4xl border border-gray-200 shadow-sm rounded-md bg-white'>
                    <h1 className='font-bold text-2xl mb-8 text-center'>Post a New Job</h1>
                    
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <label className='font-medium text-sm'>Title</label>
                            <input type="text" name="title" value={input.title} onChange={changeEventHandler} className='w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-1 focus:ring-[#F83002]' />
                        </div>
                        <div>
                            <label className='font-medium text-sm'>Description</label>
                            <input type="text" name="description" value={input.description} onChange={changeEventHandler} className='w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-1 focus:ring-[#F83002]' />
                        </div>
                        <div>
                            <label className='font-medium text-sm'>Requirements</label>
                            <input type="text" name="requirements" value={input.requirements} onChange={changeEventHandler} placeholder="e.g. React, Node (comma separated)" className='w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-1 focus:ring-[#F83002]' />
                        </div>
                        <div>
                            <label className='font-medium text-sm'>Salary (in LPA)</label>
                            <input type="number" name="salary" value={input.salary} onChange={changeEventHandler} className='w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-1 focus:ring-[#F83002]' />
                        </div>
                        <div>
                            <label className='font-medium text-sm'>Location</label>
                            <input type="text" name="location" value={input.location} onChange={changeEventHandler} className='w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-1 focus:ring-[#F83002]' />
                        </div>
                        <div>
                            <label className='font-medium text-sm'>Job Type</label>
                            <input type="text" name="jobType" value={input.jobType} onChange={changeEventHandler} className='w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-1 focus:ring-[#F83002]' />
                        </div>
                        <div>
                            <label className='font-medium text-sm'>Experience Level (in yrs)</label>
                            <input type="number" name="experience" value={input.experience} onChange={changeEventHandler} className='w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-1 focus:ring-[#F83002]' />
                        </div>
                        <div>
                            <label className='font-medium text-sm'>No of Positions</label>
                            <input type="number" name="position" value={input.position} onChange={changeEventHandler} className='w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-1 focus:ring-[#F83002]' />
                        </div>
                        {companies.length > 0 && (
                            <div className='col-span-2'>
                                <label className='font-medium text-sm'>Select Company</label>
                                <select onChange={selectChangeHandler} className='w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-1 focus:ring-[#F83002] bg-white'>
                                    <option value="" disabled selected>Select a Company</option>
                                    {companies.map((company) => (
                                        <option key={company._id} value={company._id}>{company.name}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>

                    {companies.length === 0 && (
                        <p className='text-xs text-red-600 font-bold text-center my-3'>*Please register a company first, before posting a job</p>
                    )}

                    {loading ? (
                        <button type="button" disabled className='w-full mt-8 bg-[#F83002] opacity-70 text-white py-2 rounded-md font-medium flex justify-center items-center gap-2'>
                            <span className='animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent'></span> Posting...
                        </button>
                    ) : (
                        <button type="submit" disabled={companies.length === 0} className='w-full mt-8 bg-[#F83002] text-white py-2 rounded-md hover:bg-[#c92a03] font-medium disabled:opacity-50'>
                            Post New Job
                        </button>
                    )}
                </form>
            </div>
        </div>
    )
}

export default PostJob
