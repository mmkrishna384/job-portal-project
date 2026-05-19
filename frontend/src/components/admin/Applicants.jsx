import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '../../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '../../redux/applicationSlice'
import { toast } from 'sonner'

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector(store => store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllApplicants(res.data.job));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplicants();
    }, [params.id, dispatch]);

    const statusHandler = async (status, id) => {
        try {
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status }, { withCredentials: true });
            if (res.data.success) {
                toast.success(res.data.message);
                // Optionally update local state here if needed
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Error updating status");
        }
    }

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 my-10'>
                <h1 className='font-bold text-xl mb-5'>Applicants ({applicants?.applications?.length || 0})</h1>
                
                <div className='overflow-x-auto shadow-sm border border-gray-200 rounded-lg'>
                    <table className='w-full text-sm text-left text-gray-500'>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                            <tr>
                                <th className='px-6 py-3'>Full Name</th>
                                <th className='px-6 py-3'>Email</th>
                                <th className='px-6 py-3'>Contact</th>
                                <th className='px-6 py-3'>Resume</th>
                                <th className='px-6 py-3'>Date Applied</th>
                                <th className='px-6 py-3 text-right'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applicants && applicants?.applications?.map((item) => (
                                <tr key={item._id} className='bg-white border-b hover:bg-gray-50'>
                                    <td className='px-6 py-4 font-medium text-gray-900'>{item?.applicant?.fullname}</td>
                                    <td className='px-6 py-4'>{item?.applicant?.email}</td>
                                    <td className='px-6 py-4'>{item?.applicant?.phoneNumber}</td>
                                    <td className='px-6 py-4'>
                                        {item.applicant?.profile?.resume ? (
                                            <a className="text-blue-600 hover:underline" href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">
                                                {item?.applicant?.profile?.resumeOriginalName}
                                            </a>
                                        ) : (
                                            <span>NA</span>
                                        )}
                                    </td>
                                    <td className='px-6 py-4'>{item?.applicant.createdAt.split("T")[0]}</td>
                                    <td className='px-6 py-4 text-right'>
                                        <div className='flex items-center justify-end gap-2'>
                                            <button onClick={() => statusHandler("accepted", item?._id)} className='px-3 py-1 bg-green-100 text-green-700 rounded text-xs font-medium hover:bg-green-200'>Accept</button>
                                            <button onClick={() => statusHandler("rejected", item?._id)} className='px-3 py-1 bg-red-100 text-red-700 rounded text-xs font-medium hover:bg-red-200'>Reject</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Applicants
