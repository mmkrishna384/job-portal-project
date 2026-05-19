import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '../../utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '../../redux/companySlice'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState("");
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "An error occurred");
        }
    }

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto my-10 px-4'>
                <div className='my-10'>
                    <h1 className='font-bold text-2xl mb-2'>Your Company Name</h1>
                    <p className='text-gray-500'>What would you like to give your company name? you can change this later.</p>
                </div>

                <div className='mb-8'>
                    <label className='font-medium text-sm'>Company Name</label>
                    <input
                        type="text"
                        className='w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-1 focus:ring-[#F83002]'
                        placeholder="JobHunt, Microsoft etc."
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                </div>

                <div className='flex items-center gap-4 my-10'>
                    <button onClick={() => navigate("/admin/companies")} className='px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors'>Cancel</button>
                    <button onClick={registerNewCompany} className='px-4 py-2 bg-[#F83002] text-white rounded-md hover:bg-[#c92a03] transition-colors'>Continue</button>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate
