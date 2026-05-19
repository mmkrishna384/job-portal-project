import React, { useState } from 'react'
import { Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '../redux/jobSlice'

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/jobs");
    }

    return (
        <div className='text-center py-20 px-4'>
            <div className='flex flex-col gap-5 my-10 items-center justify-center'>
                <span className='px-4 py-2 rounded-full bg-red-100 text-[#F83002] font-medium tracking-wide'>No. 1 Job Hunt Website</span>
                <h1 className='text-5xl md:text-6xl font-bold leading-tight'>Search, Apply & <br /> Get Your <span className='text-[#F83002]'>Dream Job</span></h1>
                <p className='text-gray-500 max-w-2xl text-lg mt-4'>
                    Connecting top talent with leading companies worldwide. Explore thousands of job opportunities and take the next step in your career today.
                </p>
                <div className='flex w-full max-w-2xl shadow-lg border border-gray-200 pl-3 pr-1 py-2 rounded-full items-center gap-4 mx-auto mt-8'>
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full px-2 text-gray-800 bg-transparent'
                    />
                    <button onClick={searchJobHandler} className='rounded-full bg-[#F83002] text-white p-3 hover:bg-[#c92a03] transition-colors flex items-center justify-center'>
                        <Search className='h-5 w-5' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
