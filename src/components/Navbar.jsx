import React, { useState, useEffect } from 'react';
import { FaUserGraduate, FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
import Contact from '../pages/Contact';

const Navbar = () => {
    const [openContact, setOpenContact] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Scroll effect for professional glassmorphism
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Staff', path: '/staff' },
        { name: 'Gallery', path: '/gallery' },
    ];

    return (
        <>
            <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
                scrolled 
                ? 'bg-white/80 backdrop-blur-md shadow-lg py-2' 
                : 'bg-white py-4'
            }`}>
                <div className='max-w-7xl mx-auto px-6 flex items-center justify-between'>
                    
                    {/* LOGO SECTION */}
                    <Link to="/" className='flex items-center gap-3 group'>
                        <div className='bg-cyan-500 p-2 rounded-lg text-white group-hover:rotate-12 transition-transform shadow-lg shadow-cyan-200'>
                            <FaUserGraduate size={24} />
                        </div>
                        <span className='text-lg md:text-xl font-black tracking-tighter text-slate-900'>
                            DIGITAL <span className='text-cyan-500'>ALCHEMY</span> ACADEMY
                        </span>
                    </Link>

                    {/* DESKTOP NAV LINKS */}
                    <ul className='hidden lg:flex items-center gap-8'>
                        {navLinks.map((link) => (
                            <Link 
                                key={link.path}
                                to={link.path} 
                                className={`text-sm font-bold uppercase tracking-widest transition-colors ${
                                    location.pathname === link.path ? 'text-cyan-500' : 'text-slate-600 hover:text-cyan-500'
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <button
                            onClick={() => setOpenContact(true)}
                            className='text-sm font-bold uppercase tracking-widest text-slate-600 hover:text-cyan-500 transition-colors'
                        >
                            Contact
                        </button>
                    </ul>

                    {/* ACTIONS */}
                    <div className='hidden lg:flex items-center gap-4'>
                        <Link 
                            to="/add" 
                            className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-cyan-500 transition-all shadow-md active:scale-95"
                        >
                            Admission Open
                        </Link>
                    </div>

                    {/* MOBILE TOGGLE */}
                    <button 
                        className='lg:hidden text-slate-900 p-2'
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>

                {/* MOBILE MENU DRAWER */}
                <div className={`lg:hidden absolute top-full left-0 w-full bg-white border-t transition-all duration-300 overflow-hidden ${
                    isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                }`}>
                    <div className='p-6 flex flex-col gap-4 text-center'>
                        {navLinks.map((link) => (
                            <Link 
                                key={link.path}
                                to={link.path} 
                                onClick={() => setIsMobileMenuOpen(false)}
                                className='text-lg font-bold text-slate-700 hover:text-cyan-500'
                            >
                                {link.name}
                            </Link>
                        ))}
                        <button
                            onClick={() => {
                                setOpenContact(true);
                                setIsMobileMenuOpen(false);
                            }}
                            className='text-lg font-bold text-slate-700 hover:text-cyan-500'
                        >
                            Contact
                        </button>
                        <Link 
                            to="/add" 
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="bg-cyan-500 text-white px-6 py-3 rounded-xl font-bold mt-2"
                        >
                            Admission Form
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Spacer for sticky nav */}
            <div className='h-20'></div>

            {/* CONTACT POPUP */}
            <Contact
                open={openContact}
                onClose={() => setOpenContact(false)}
            />
        </>
    );
};

export default Navbar;