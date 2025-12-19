import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { MdAddIcCall } from "react-icons/md";

const TopNavbar = () => {
    return <div className='bg-gray-500 text-white font-bold  '>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 px-4 py-3 items-center '>
            {/* locaton wala logo */}
            <div className='flex items-center justify-center md:justify-start '>
                <h1 className='mr-3 text-2xl' ><FaLocationDot /></h1>
                <p className='text-center  md:text-left'>71 Pilgrim Avenue Chevy Chase, MD 20815</p>
            </div>
            {/* call wala logo */}
            <div className='flex flex-col md:flex-row items-center justify-center md:justify-end'>
                <h1 className='text-2xl mb-2 md:mb-0 md:mr-3'><MdAddIcCall /></h1>
                <div className='text-center md:text-left'>
                    <p>+(10) 123 456 7977</p>
                    <hr className='border-white w-32 mx-auto md:mx-0' />
                    <p className='mt-1'>+(10) 123 456 7977</p>
                    <hr className='border-white w-32 mx-auto md:mx-0' />
                </div>
                {/* <p className='text-center'>+(10) 123 456 7966</p> */}
            </div>

        </div>

    </div>
}

export default TopNavbar