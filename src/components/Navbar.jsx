import React from 'react'
import { useState } from 'react';
import { FaUserGraduate } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";

import { Link } from 'react-router-dom';

const Navbar = () => {
    // const [nav, setNav] = useState("")
    return <>
        <div className=' bg-neutral-600 w-full  '>
            <nav className=' bg-white p-4'>
                <div className=' grid grid-cols-1 md:grid-cols-3 items-center gap-4'>

                    <div className='flex items-center gap-2 justify-center md:justify-start'>
                        <h1 className='text-2xl font-extrabold p-1 mr-2 hover:text-cyan-500 '><FaUserGraduate /></h1>
                        <h1 className='text-xl md:text-2xl text-gray-950 font-extrabold  hover:text-cyan-500'> DIGITAL ALCHEMY ACADMY</h1>
                    </div>
                    <div>
                        <ul className='hidden  md:flex gap-6 text-black font-bold justify-center '>
                            <Link to="/" className='hover:text-cyan-500'>Home</Link>
                            <Link to="about" className='hover:text-cyan-500'>About</Link>
                            <Link to="staff" className='hover:text-cyan-500'>SchoollStaff</Link>
                            <Link to="gallery" className='hover:text-cyan-500'>Gallery</Link>
                            <Link to="contact" className='hover:text-cyan-500'>Contact</Link>
                        </ul>
                    </div>
                    <div className='hidden md:flex justify-end'>
                        <Link to="add" className="btn btn-neutral btn-outline">Addmission Form</Link>
                    </div>
                    {/* show md creen only */}
                    <div className="md:hidden mt-4">

                        <div className="flex flex-col gap-2 p-4 text-center font-semibold text-black">
                            <Link to="/" className="hover:text-cyan-500">Home</Link>
                            <Link to="/about" className="hover:text-cyan-500">About</Link>
                            <Link to="/gallery" className="hover:text-cyan-500">Gallery</Link>
                            <Link to="/contact" className="hover:text-cyan-500">Contact</Link>
                            <Link to="/add" className="btn btn-neutral btn-outline mx-auto mt-2">Admission Form</Link>
                        </div>
                    </div>

                </div>
            </nav >
        </div >


    </>

}

export default Navbar