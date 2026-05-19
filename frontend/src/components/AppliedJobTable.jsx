import React from 'react'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job);

    return (
        <div className='overflow-x-auto shadow-sm border border-gray-200 sm:rounded-lg'>
            <table className='w-full text-sm text-left text-gray-500'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                    <tr>
                        <th className='px-6 py-3'>Date</th>
                        <th className='px-6 py-3'>Job Role</th>
                        <th className='px-6 py-3'>Company</th>
                        <th className='px-6 py-3 text-right'>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {allAppliedJobs.length <= 0 ? (
                        <tr><td colSpan="4" className='px-6 py-4 text-center'>You haven't applied to any jobs yet.</td></tr>
                    ) : (
                        allAppliedJobs.map((appliedJob) => (
                            <tr key={appliedJob._id} className='bg-white border-b hover:bg-gray-50'>
                                <td className='px-6 py-4'>{appliedJob?.createdAt.split("T")[0]}</td>
                                <td className='px-6 py-4 font-medium text-gray-900'>{appliedJob.job?.title}</td>
                                <td className='px-6 py-4'>{appliedJob.job?.company?.name}</td>
                                <td className='px-6 py-4 text-right'>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium 
                                        ${appliedJob.status === "rejected" ? 'bg-red-100 text-red-600' : 
                                        appliedJob.status === "pending" ? 'bg-gray-100 text-gray-600' : 
                                        'bg-green-100 text-green-600'}`}>
                                        {appliedJob.status.toUpperCase()}
                                    </span>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default AppliedJobTable
