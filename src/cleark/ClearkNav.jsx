import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'

const ClearkNav = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="md:ml-[250px] bg-white shadow-md sticky top-0 z-50">
            <nav className="flex items-center justify-between p-4 md:px-8">
                {/* Logo / Title */}
                <div className="text-2xl font-bold text-green-600">Cleark Panel</div>

                {/* Desktop Menu */}
                <ul className="hidden md:flex gap-8 text-lg font-semibold text-gray-800">
                    <li>
                        <Link
                            to="add-student"
                            className="hover:text-green-600 transition-colors duration-300"
                        >
                            Add Student
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="student-list"
                            className="hover:text-green-600 transition-colors duration-300"
                        >
                            Student List
                        </Link>
                    </li>
                </ul>

                {/* Mobile Hamburger */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isOpen && (
                <ul className="md:hidden bg-white shadow-lg flex flex-col gap-4 p-4 text-gray-800 font-semibold">
                    <li>
                        <Link
                            to="add-student"
                            className="block py-2 px-3 rounded hover:bg-green-100 transition"
                            onClick={() => setIsOpen(false)}
                        >
                            Add Student
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="student-list"
                            className="block py-2 px-3 rounded hover:bg-green-100 transition"
                            onClick={() => setIsOpen(false)}
                        >
                            Student List
                        </Link>
                    </li>
                </ul>
            )}
        </div>
    )
}

export default ClearkNav
