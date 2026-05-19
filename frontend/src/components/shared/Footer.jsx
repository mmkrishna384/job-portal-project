import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="bg-white border-t border-t-gray-200 mt-20 pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-1">
                    <h1 className='text-2xl font-bold mb-4'>Job<span className='text-[#F83002]'>Portal</span></h1>
                    <p className="text-gray-500 text-sm">
                        Connecting the best talent with the best companies. Your dream job is just a click away.
                    </p>
                </div>
                
                <div>
                    <h2 className="font-bold text-lg mb-4 text-gray-800">Quick Links</h2>
                    <ul className="space-y-2 text-sm text-gray-500">
                        <li><Link to="/" className="hover:text-[#F83002] transition-colors">Home</Link></li>
                        <li><Link to="/jobs" className="hover:text-[#F83002] transition-colors">Browse Jobs</Link></li>
                        <li><Link to="/about" className="hover:text-[#F83002] transition-colors">About Us</Link></li>
                        <li><Link to="/contact" className="hover:text-[#F83002] transition-colors">Contact</Link></li>
                    </ul>
                </div>
                
                <div>
                    <h2 className="font-bold text-lg mb-4 text-gray-800">For Employers</h2>
                    <ul className="space-y-2 text-sm text-gray-500">
                        <li><Link to="/login" className="hover:text-[#F83002] transition-colors">Post a Job</Link></li>
                        <li><Link to="/login" className="hover:text-[#F83002] transition-colors">Search Resumes</Link></li>
                        <li><Link to="/login" className="hover:text-[#F83002] transition-colors">Pricing</Link></li>
                    </ul>
                </div>
                
                <div>
                    <h2 className="font-bold text-lg mb-4 text-gray-800">Follow Us</h2>
                    <div className="flex flex-col gap-2 text-sm text-gray-500">
                        <a href="#" className="hover:text-[#F83002] transition-colors">Facebook</a>
                        <a href="#" className="hover:text-[#F83002] transition-colors">Twitter</a>
                        <a href="#" className="hover:text-[#F83002] transition-colors">LinkedIn</a>
                        <a href="#" className="hover:text-[#F83002] transition-colors">Instagram</a>
                    </div>
                </div>
            </div>
            
            <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-t-gray-100 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
                <p>&copy; {new Date().getFullYear()} JobPortal. All rights reserved.</p>
                <div className="flex gap-4 mt-4 md:mt-0">
                    <Link to="/privacy" className="hover:text-gray-600 transition-colors">Privacy Policy</Link>
                    <Link to="/terms" className="hover:text-gray-600 transition-colors">Terms of Service</Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer
