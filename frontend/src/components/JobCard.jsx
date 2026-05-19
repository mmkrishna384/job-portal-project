import React from 'react'
import { useNavigate } from 'react-router-dom'

const JobCard = ({ job }) => {
    const navigate = useNavigate();
    
    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    }
    
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer hover:shadow-2xl transition-all'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
                <button className='rounded-full p-2 hover:bg-gray-100'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bookmark text-gray-500 h-4 w-4"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg></button>
            </div>
            
            <div className='flex items-center gap-3 my-2'>
                <div className='h-12 w-12 bg-gray-100 flex items-center justify-center font-bold rounded-md'>
                    <img src={job?.company?.logo || "https://www.edigitalagency.com.au/wp-content/uploads/google-logo-icon-PNG-Transparent-Background-letter-G-multiple-colors.png"} alt="logo" className='w-8 h-8'/>
                </div>
                <div>
                    <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>{job?.location}</p>
                </div>
            </div>
            
            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600 line-clamp-2'>
                    {job?.description}
                </p>
            </div>
            
            <div className='flex items-center gap-2 mt-4'>
                <span className='text-[#F83002] font-bold text-xs bg-red-50 px-2 py-1 rounded-md'>{job?.position} Positions</span>
                <span className='text-blue-600 font-bold text-xs bg-blue-50 px-2 py-1 rounded-md'>{job?.jobType}</span>
                <span className='text-green-600 font-bold text-xs bg-green-50 px-2 py-1 rounded-md'>{job?.salary}LPA</span>
            </div>
            
            <div className='flex items-center gap-4 mt-5'>
                <button onClick={() => navigate(`/jobs/${job?._id}`)} className='px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors w-full text-sm font-semibold'>Details</button>
                <button className='px-4 py-2 bg-[#F83002] text-white rounded-md hover:bg-[#c92a03] transition-colors w-full text-sm font-semibold'>Save For Later</button>
            </div>
        </div>
    )
}

export default JobCard
