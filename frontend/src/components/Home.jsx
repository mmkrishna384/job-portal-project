import React from 'react'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import HeroSection from './HeroSection'

const Home = () => {
  return (
    <div className='min-h-screen flex flex-col'>
        <Navbar />
        <div className='flex-grow'>
            <HeroSection />
        </div>
        <Footer />
    </div>
  )
}

export default Home
