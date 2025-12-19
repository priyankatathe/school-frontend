import React from 'react'
import Home from './Home'
import Functions from './Functions'
import SchoolStaff from './SchoolStaff'
import Department from './department/Department'
import AddForm from './AddForm'
import Footer from './Footer'

const Hero = () => {
    return (
        <div>
            <Home />
            <Department />
            {/* <SchoolStaff /> */}
            <Functions />
        </div>
    )
}

export default Hero