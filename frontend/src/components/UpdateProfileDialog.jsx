import React, { useState } from 'react'
import axios from 'axios'
import { USER_API_END_POINT } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../redux/authSlice'
import { toast } from 'sonner'
import { X } from 'lucide-react'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(",") || "",
        file: user?.profile?.resume || ""
    });

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const fileChangeHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file && typeof input.file === "object") {
            formData.append("file", input.file);
        }
        
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                setOpen(false);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    }

    if (!open) return null;

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
            <div className='bg-white rounded-lg max-w-lg w-full p-6 relative shadow-xl'>
                <button onClick={() => setOpen(false)} className='absolute right-4 top-4 hover:bg-gray-100 rounded-full p-1'>
                    <X size={20} className='text-gray-600' />
                </button>
                
                <h2 className='text-xl font-bold mb-5'>Update Profile</h2>
                
                <form onSubmit={submitHandler}>
                    <div className='grid gap-4 mb-5'>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <label className='text-right font-medium text-sm text-gray-700'>Name</label>
                            <input name="fullname" value={input.fullname} onChange={changeEventHandler} className='col-span-3 border border-gray-300 rounded-md px-3 py-2' />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <label className='text-right font-medium text-sm text-gray-700'>Email</label>
                            <input name="email" value={input.email} onChange={changeEventHandler} className='col-span-3 border border-gray-300 rounded-md px-3 py-2' />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <label className='text-right font-medium text-sm text-gray-700'>Number</label>
                            <input name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler} className='col-span-3 border border-gray-300 rounded-md px-3 py-2' />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <label className='text-right font-medium text-sm text-gray-700'>Bio</label>
                            <input name="bio" value={input.bio} onChange={changeEventHandler} className='col-span-3 border border-gray-300 rounded-md px-3 py-2' />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <label className='text-right font-medium text-sm text-gray-700'>Skills</label>
                            <input name="skills" value={input.skills} onChange={changeEventHandler} placeholder="e.g. HTML,CSS,JS" className='col-span-3 border border-gray-300 rounded-md px-3 py-2' />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <label className='text-right font-medium text-sm text-gray-700'>Resume</label>
                            <input name="file" type="file" accept="application/pdf" onChange={fileChangeHandler} className='col-span-3 border border-gray-300 rounded-md px-3 py-1' />
                        </div>
                    </div>

                    <div className='flex justify-end'>
                        {loading ? (
                            <button type="button" disabled className='bg-[#F83002] opacity-70 text-white px-4 py-2 rounded-md font-medium flex items-center gap-2'>
                                <span className='animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent'></span> Updating...
                            </button>
                        ) : (
                            <button type="submit" className='bg-[#F83002] text-white px-4 py-2 rounded-md hover:bg-[#c92a03] font-medium'>
                                Save Changes
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateProfileDialog
