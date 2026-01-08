import React, { useEffect, useState } from 'react';
import { BsPeopleFill } from 'react-icons/bs';
import { FaSignOutAlt } from 'react-icons/fa';
import { HiMenu, HiX } from 'react-icons/hi';
import { MdDashboard } from 'react-icons/md';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLogoutClearkMutation } from '../redux/api/authApi';

const LINKS = [
    { label: "Cleark Profile", to: "/cleark", icon: MdDashboard, color: "text-blue-600 bg-blue-50" },
    { label: "Student Detail", to: "/cleark/student-list", icon: BsPeopleFill, color: "text-emerald-600 bg-emerald-50" },
];

const ClearkSidebar = () => {
    const [logoutCleark, { isSuccess }] = useLogoutClearkMutation();
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggleSidebar = () => setIsOpen(!isOpen);
    useEffect(() => {
        if (isSuccess) {
            toast.success("Logged out successfully!");
            navigate("/cleark-login");
        }
    }, [isSuccess, navigate]);
    const renderLink = (item, idx) => {
        const isActive = location.pathname === item.to;
        const Icon = item.icon;

        return (
            <div key={idx} className="px-3">
                <Link
                    to={item.to}
                    onClick={() => isOpen && toggleSidebar()}
                    className={`flex items-center gap-3 px-3 py-2.5 my-1 rounded-xl transition-all duration-300 group
                ${isActive
                            ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200"
                            : "text-slate-600 hover:bg-slate-50 hover:text-emerald-600"
                        }`}
                >
                    <div
                        className={`p-2 rounded-lg flex items-center justify-center transition-colors duration-300 
                        ${isActive ? "bg-white/20 text-white" : item.color}`}
                    >
                        <Icon size={20} />
                    </div>
                    <span className={`text-[15px] font-semibold tracking-wide ${isActive ? "opacity-100" : "opacity-80 group-hover:opacity-100"}`}>
                        {item.label}
                    </span>
                </Link>
            </div>
        );
    };

    return (
        <>
            {/* ----------- Mobile Header / Hamburger ----------- */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b flex items-center px-4 z-50">
                <button
                    onClick={toggleSidebar}
                    className="p-2 rounded-lg bg-slate-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
                >
                    {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
                </button>
                <span className="ml-4 font-bold text-slate-800 text-lg">Admin Portal</span>
            </div>

            {/* ----------- Sidebar ----------- */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-white  z-50 
              transform transition-all duration-300 ease-in-out flex flex-col border-r border-slate-100
              ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:w-[280px]`}
            >
                {/* Header Section */}
                <div className="p-6">
                    <div className="flex items-center gap-3 bg-gradient-to-br from-emerald-500 to-teal-700 p-4 rounded-2xl shadow-inner">
                        <div className="bg-white/20 p-2 rounded-lg backdrop-blur-md">
                            <MdDashboard className="text-white" size={24} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-white font-bold leading-tight tracking-tight text-lg">Cleark Details</span>
                            <span className="text-emerald-100 text-[11px] uppercase tracking-widest font-medium">Management</span>
                        </div>
                    </div>
                </div>

                {/* Navigation Links */}
                <div className="flex-grow overflow-y-auto pt-2 space-y-1 custom-scrollbar">
                    <p className="px-7 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Main Menu</p>
                    {LINKS.map(renderLink)}
                </div>

                {/* Footer Section (Logout) */}
                <div className="p-6 border-t border-slate-50">
                    <button
                        onClick={() => logoutCleark()}
                        className="group w-full flex items-center justify-center gap-3 bg-slate-50 text-slate-600 font-bold py-3 rounded-xl transition-all duration-300 hover:bg-red-50 hover:text-red-600 border border-transparent hover:border-red-100"
                    >
                        <FaSignOutAlt className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm uppercase tracking-wider">Sign Out</span>
                    </button>

                </div>
            </div>

            {/* Overlay for Mobile with Blur */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden transition-opacity"
                    onClick={toggleSidebar}
                />
            )}
        </>
    );
}

export default ClearkSidebar;