import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '../../utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '../../redux/authSlice'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: ""
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector(store => store.auth);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "An error occurred");
        } finally {
            dispatch(setLoading(false));
        }
    }

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto mt-20 px-4'>
                <form onSubmit={submitHandler} className='w-full max-w-md border border-gray-200 rounded-md p-8 shadow-sm bg-white'>
                    <h1 className='font-bold text-2xl mb-6 text-center'>Login</h1>
                    
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
                    
                    <div className='mb-6'>
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
                    
                    {
                        loading ? (
                            <button type="button" disabled className='w-full bg-[#F83002] opacity-70 text-white py-2 rounded-md transition-colors font-medium flex items-center justify-center gap-2'>
                                <span className='animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent'></span> Please wait
                            </button>
                        ) : (
                            <button type="submit" className='w-full bg-[#F83002] text-white py-2 rounded-md hover:bg-[#c92a03] transition-colors font-medium'>
                                Login
                            </button>
                        )
                    }
                    
                    <p className='mt-4 text-center text-sm text-gray-600'>
                        Don't have an account? <Link to="/signup" className='text-[#F83002] hover:underline'>Signup</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login
