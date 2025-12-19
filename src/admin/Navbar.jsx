import React, { useState } from "react";
import { FaUserGraduate } from "react-icons/fa";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const LINKS = [
        { label: "Cleark Register", to: "cleark-register" },
        { label: "Function", to: "function-form" },
        { label: "gallery add", to: "gallery-add" },
        { label: "Department", to: "department-form" },
        { label: "Staff", to: "staff-form" },
    ];

    return (
        <nav
            className="fixed top-0 left-0 right-0 bg-white shadow-md border-b border-gray-200 
                 z-50 px-6 md:px-12"
        >
            <div className="flex justify-between items-center h-16">
                {/* Logo */}
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-2xl">
                    <FaUserGraduate className="text-3xl" />
                    <span className="hidden sm:block">EduPortal</span>
                </div>

                {/* Desktop Menu */}
                <ul className="hidden md:flex gap-8 text-gray-700 font-medium text-lg">
                    {LINKS.map((link, idx) => (
                        <Link
                            key={idx}
                            to={link.to}
                            className="hover:text-emerald-500 transition-colors duration-200"
                        >
                            {link.label}
                        </Link>
                    ))}
                </ul>

                {/* Mobile Hamburger */}
                <button
                    className="md:hidden text-3xl text-gray-700"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <HiX /> : <HiMenu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white shadow-lg border-t border-gray-200">
                    <ul className="flex flex-col p-4 space-y-4 text-gray-700 font-medium">
                        {LINKS.map((link, idx) => (
                            <Link
                                key={idx}
                                to={link.to}
                                onClick={() => setIsOpen(false)}
                                className="hover:text-emerald-500 transition-colors duration-200"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
