import React from 'react'
import TopNavbar from './TopNavbar'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import HeadL from './HeadL'
import Footer from '../pages/Footer'

const PublicNavbar = () => {
    return <>

        <HeadL />
        <TopNavbar />
        <Navbar />
        <Outlet />
        <Footer />
    </>
}

export default PublicNavbar