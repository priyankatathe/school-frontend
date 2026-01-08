import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#020617] text-slate-300">
            {/* Top Wave or Border Decoration */}
            <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500"></div>

            <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="bg-blue-600 p-2 rounded-lg">
                                <span className="text-white font-black text-xl">DA</span>
                            </div>
                            <h2 className="text-xl font-black text-white tracking-tighter uppercase">
                                Digital Alchemy
                            </h2>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-400 italic">
                            "A place where learning begins and never ends. Shaping the innovators of tomorrow since 2015."
                        </p>
                        <div className="flex gap-3">
                            {[FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn].map((Icon, i) => (
                                <a key={i} href="#" className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-lg">
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
                            Explore
                            <span className="absolute -bottom-1 left-0 w-8 h-1 bg-blue-500 rounded-full"></span>
                        </h3>
                        <ul className="space-y-4 text-sm font-medium">
                            {['Home', 'About Academy', 'Admissions', 'Academic Calendar', 'Gallery'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="hover:text-blue-400 hover:translate-x-2 transition-all inline-block duration-300">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Important Sections */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
                            Support
                            <span className="absolute -bottom-1 left-0 w-8 h-1 bg-blue-500 rounded-full"></span>
                        </h3>
                        <ul className="space-y-4 text-sm font-medium">
                            {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Student Portal', 'Contact Us'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="hover:text-blue-400 hover:translate-x-2 transition-all inline-block duration-300">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
                            Get In Touch
                            <span className="absolute -bottom-1 left-0 w-8 h-1 bg-blue-500 rounded-full"></span>
                        </h3>
                        <div className="space-y-5 text-sm">
                            <div className="flex items-start gap-4 group">
                                <div className="p-3 rounded-xl bg-slate-800 group-hover:bg-blue-600/20 transition-colors">
                                    <FaMapMarkerAlt className="text-blue-500" />
                                </div>
                                <span>Kharadi IT Park, Pune,<br /> Maharashtra 411014</span>
                            </div>
                            <div className="flex items-center gap-4 group">
                                <div className="p-3 rounded-xl bg-slate-800 group-hover:bg-blue-600/20 transition-colors">
                                    <FaPhoneAlt className="text-blue-500" />
                                </div>
                                <span>+91 98765 43210</span>
                            </div>
                            <div className="flex items-center gap-4 group">
                                <div className="p-3 rounded-xl bg-slate-800 group-hover:bg-blue-600/20 transition-colors">
                                    <FaEnvelope className="text-blue-500" />
                                </div>
                                <span className="lowercase">contact@digitalalchemy.edu</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Footer Bottom */}
                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-slate-500 font-medium tracking-wide text-center md:text-left">
                        © {currentYear} <span className="text-blue-500">Digital Alchemy Public School</span>. 
                        Engineering Education with Integrity.
                    </p>
                    <div className="flex gap-6 text-[10px] uppercase font-bold tracking-widest text-slate-500">
                        <a href="#" className="hover:text-white transition-colors">Status</a>
                        <a href="#" className="hover:text-white transition-colors">Site Map</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;