import React from 'react'
import Department from './department/Department'
import SchoolStaff from './SchoolStaff'
import Functions from './Functions'
import AddForm from './AddForm'
import Footer from './Footer'
import Navbar from '../components/Navbar'
import PublicNavbar from '../components/PublicNavbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <div>
            <PublicNavbar />
        </div>
    )
}

export default Layout