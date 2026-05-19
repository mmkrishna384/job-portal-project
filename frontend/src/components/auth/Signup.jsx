import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '../../utils/constant'
import { toast } from 'sonner'

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: null
    });

    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "An error occurred");
        }
    }

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto mt-10 px-4 mb-20'>
                <form onSubmit={submitHandler} className='w-full max-w-md border border-gray-200 rounded-md p-8 shadow-sm bg-white'>
                    <h1 className='font-bold text-2xl mb-6 text-center'>Signup</h1>
                    
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Full Name</label>
                        <input
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="John Doe"
                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#F83002]'
                        />
                    </div>
                    
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
                        <input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="example@gmail.com"
                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#F83002]'
                        />
                    </div>

                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Phone Number</label>
                        <input
                            type="text"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="1234567890"
                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#F83002]'
                        />
                    </div>
                    
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
                        <input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="••••••••"
                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#F83002]'
                        />
                    </div>
                    
                    <div className='mb-6 flex flex-col md:flex-row justify-between md:items-center gap-4'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>Role</label>
                            <div className='flex items-center gap-4'>
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="student"
                                        checked={input.role === 'student'}
                                        onChange={changeEventHandler}
                                        className="cursor-pointer text-[#F83002] focus:ring-[#F83002]"
                                    />
                                    <label className="ml-2 text-sm text-gray-700">Student</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="recruiter"
                                        checked={input.role === 'recruiter'}
                                        onChange={changeEventHandler}
                                        className="cursor-pointer text-[#F83002] focus:ring-[#F83002]"
                                    />
                                    <label className="ml-2 text-sm text-gray-700">Recruiter</label>
                                </div>
                            </div>
                        </div>
                        <div>
                             <label className='block text-sm font-medium text-gray-700 mb-2'>Profile Picture</label>
                             <input 
                                type="file" 
                                accept="image/*"
                                onChange={changeFileHandler}
                                className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200'
                             />
                        </div>
                    </div>
                    
                    <button type="submit" className='w-full bg-[#F83002] text-white py-2 rounded-md hover:bg-[#c92a03] transition-colors font-medium'>
                        Signup
                    </button>
                    
                    <p className='mt-4 text-center text-sm text-gray-600'>
                        Already have an account? <Link to="/login" className='text-[#F83002] hover:underline'>Login</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Signup
