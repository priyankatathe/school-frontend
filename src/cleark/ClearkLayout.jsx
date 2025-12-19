import React from 'react'
import ClearkNav from './ClearkNav'
import ClearkSidebar from './ClearkSidebar'
import { Outlet } from 'react-router-dom'

const ClearkLayout = () => {
    return <>
        <ClearkNav />
        <ClearkSidebar />

        <div className=" md:ml-[260px] ">
            <Outlet />
        </div>
    </>
}

export default ClearkLayout