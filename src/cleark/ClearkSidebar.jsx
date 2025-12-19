import React, { useState } from 'react'
import { BsPeopleFill } from 'react-icons/bs';
import { FaUserAlt, FaBars, FaSignOutAlt } from 'react-icons/fa'
import { HiMenu, HiX } from 'react-icons/hi';
import { MdDashboard } from 'react-icons/md';

import { Link, useLocation } from 'react-router-dom'

const LINKS = [
    { label: "Admin-Profile", to: "/cleark", icon: MdDashboard, color: "text-blue-500 bg-blue-100" },
    { label: "Department", to: "/cleark/student-list", icon: BsPeopleFill, color: "text-green-500 bg-green-100" },

];

const ClearkSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggleSidebar = () => setIsOpen(!isOpen);

    const renderLink = (item, idx) => {
        const isActive = location.pathname === item.to;
        const Icon = item.icon;

        return (
            <div key={idx} className="relative">
                <Link
                    to={item.to}
                    onClick={() => isOpen && toggleSidebar()}
                    className={`flex items-center gap-3 px-4 py-2 my-1 mx-2 rounded-lg transition-all duration-200 
                ${isActive
                            ? "bg-green-100 text-green-700 font-semibold shadow-sm"
                            : "text-gray-700 hover:bg-gray-100 hover:text-green-600"
                        }`}
                >
                    <div
                        className={`p-2 rounded-md flex items-center justify-center ${item.color}`}
                    >
                        <Icon size={18} />
                    </div>
                    <span className="text-sm font-medium">{item.label}</span>
                </Link>
                {isActive && (
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 h-6 w-1 bg-green-500 rounded-l-md"></span>
                )}
            </div>
        );
    };

    return (
        <>
            {/* ----------- Mobile Hamburger ----------- */}
            <div className="md:hidden fixed top-4 left-4 z-50">
                <button onClick={toggleSidebar}>
                    {isOpen ? <HiX size={28} className="text-green-600" /> : <HiMenu size={28} className="text-green-600" />}
                </button>
            </div>

            {/* ----------- Sidebar ----------- */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl border-r border-gray-200 z-50 
              transform transition-transform duration-300 flex flex-col
              ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:w-[260px]`}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white h-16 flex items-center justify-center text-lg font-bold tracking-wide">
                    Admin Detail
                </div>

                {/* Links */}
                <div className="flex-grow overflow-y-auto mt-4">{LINKS.map(renderLink)}</div>

                {/* Logout fixed at bottom */}
                <div className="mt-auto px-4 py-4">
                    <button
                        onClick={() => alert("Logout Clicked")}
                        className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-2 rounded-lg transition hover:bg-red-700"
                    >
                        <FaSignOutAlt /> Logout
                    </button>
                </div>
            </div>

            {/* Overlay for Mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
                    onClick={toggleSidebar}
                />
            )}
        </>
    );
}

export default ClearkSidebar
