import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { ArrowLeft } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '../../utils/constant'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'

const CompanySetup = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { singleCompany } = useSelector(store => store.company);

    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const fetchCompanyById = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${params.id}`, { withCredentials: true });
                if (res.data.success) {
                    setInput({
                        name: res.data.company.name || "",
                        description: res.data.company.description || "",
                        website: res.data.company.website || "",
                        location: res.data.company.location || "",
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchCompanyById();
    }, [params.id]);

    return (
        <div>
            <Navbar />
            <div className='max-w-xl mx-auto my-10 px-4'>
                <form onSubmit={submitHandler} className='border border-gray-200 p-8 rounded-lg shadow-sm bg-white'>
                    <div className='flex items-center gap-5 mb-8'>
                        <button onClick={() => navigate("/admin/companies")} type="button" className='hover:bg-gray-100 p-2 rounded-full flex items-center justify-center text-gray-500'>
                            <ArrowLeft size={20} />
                        </button>
                        <h1 className='font-bold text-xl'>Company Setup</h1>
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <label className='font-medium text-sm'>Company Name</label>
                            <input type="text" name="name" value={input.name} onChange={changeEventHandler} className='w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-1 focus:ring-[#F83002]' />
                        </div>
                        <div>
                            <label className='font-medium text-sm'>Description</label>
                            <input type="text" name="description" value={input.description} onChange={changeEventHandler} className='w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-1 focus:ring-[#F83002]' />
                        </div>
                        <div>
                            <label className='font-medium text-sm'>Website</label>
                            <input type="text" name="website" value={input.website} onChange={changeEventHandler} className='w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-1 focus:ring-[#F83002]' />
                        </div>
                        <div>
                            <label className='font-medium text-sm'>Location</label>
                            <input type="text" name="location" value={input.location} onChange={changeEventHandler} className='w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-1 focus:ring-[#F83002]' />
                        </div>
                        <div className='col-span-2'>
                            <label className='font-medium text-sm'>Logo</label>
                            <input type="file" accept="image/*" onChange={changeFileHandler} className='w-full border border-gray-300 rounded-md px-3 py-2 mt-1' />
                        </div>
                    </div>

                    {loading ? (
                        <button type="button" disabled className='w-full mt-8 bg-[#F83002] opacity-70 text-white py-2 rounded-md font-medium flex justify-center items-center gap-2'>
                            <span className='animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent'></span> Updating...
                        </button>
                    ) : (
                        <button type="submit" className='w-full mt-8 bg-[#F83002] text-white py-2 rounded-md hover:bg-[#c92a03] font-medium'>
                            Update
                        </button>
                    )}
                </form>
            </div>
        </div>
    )
}

export default CompanySetup
