import React from 'react'
import Navbar from '../shared/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import useGetAllCompanies from '../../hooks/useGetAllCompanies'
import { useSelector, useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '../../redux/companySlice'
import { useEffect, useState } from 'react'

const Companies = () => {
    useGetAllCompanies();
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [input, setInput] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input, dispatch]);

    const filterCompany = companies.filter((company) => {
        if (!searchCompanyByText) return true;
        return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
    });

    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10 px-4'>
                <div className='flex items-center justify-between my-5'>
                    <input
                        className='w-fit border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#F83002]'
                        placeholder="Filter by name"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Link to="/admin/companies/create" className='bg-[#F83002] text-white px-4 py-2 rounded-md hover:bg-[#c92a03]'>
                        New Company
                    </Link>
                </div>
                
                <div className='overflow-x-auto shadow-sm border border-gray-200 rounded-lg'>
                    <table className='w-full text-sm text-left text-gray-500'>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                            <tr>
                                <th className='px-6 py-3'>Company Name</th>
                                <th className='px-6 py-3'>Date Registered</th>
                                <th className='px-6 py-3 text-right'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterCompany.length <= 0 ? (
                                <tr>
                                    <td colSpan="4" className='px-6 py-4 text-center text-gray-500'>No companies found. Try registering a new one!</td>
                                </tr>
                            ) : (
                                filterCompany?.map((company) => (
                                <tr key={company._id} className='bg-white border-b hover:bg-gray-50'>
                                    <td className='px-6 py-4 font-medium text-gray-900 flex items-center gap-3'>
                                        <div className='h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center font-bold text-[#F83002]'>
                                            {company.name.charAt(0)}
                                        </div>
                                        {company.name}
                                    </td>
                                    <td className='px-6 py-4'>{company.createdAt.split("T")[0]}</td>
                                    <td className='px-6 py-4 text-right'>
                                        <button onClick={() => navigate(`/admin/companies/${company._id}`)} className='text-[#F83002] hover:underline flex items-center justify-end gap-1 ml-auto'>
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            )))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Companies
