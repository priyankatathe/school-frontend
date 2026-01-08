import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'

// Mapping routes to readable names
const PAGE_TITLES = {
    '/cleark/add-student': 'Add Student',
    '/cleark/student-list': 'Student List',
}

const ClearkNav = () => {
    const location = useLocation()

    // Get current page title from pathname
    const pageTitle = PAGE_TITLES[location.pathname] || 'Cleark Panel'

    return (
        <div className="md:ml-[260px] bg-white sticky top-0 z-50">
            <nav className="flex items-center justify-between p-4 md:px-8">
                {/* Dynamic Header / Page Title */}
                <div className="text-2xl ml-10 font-bold text-green-600">{pageTitle}</div>

            </nav>
        </div>
    )
}

export default ClearkNav
