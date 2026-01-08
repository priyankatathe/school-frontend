import React from 'react'
import { Link } from 'react-router-dom'
import { FaUserShield, FaUserEdit, FaInfoCircle } from 'react-icons/fa'

const HeadL = () => {
    return (
        <div className="bg-slate-900 text-slate-300 border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-6 py-2.5 flex flex-col md:flex-row justify-between items-center gap-4">
                
                {/* LEFT SIDE: ANNOUNCEMENT/HEADLINE */}
                <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                    </span>
                    <h6 className="text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                        <FaInfoCircle className="text-cyan-500" />
                        Official Portal of Digital Alchemy Academy
                    </h6>
                </div>

                {/* RIGHT SIDE: PORTAL ACCESS LINKS */}
                <div className="flex items-center gap-6">
                    <Link 
                        to="/admin-login" 
                        className="group flex items-center gap-2 text-[10px] md:text-[11px] font-black uppercase tracking-widest hover:text-white transition-colors"
                    >
                        <FaUserShield className="text-cyan-500 group-hover:scale-110 transition-transform" />
                        Admin Portal
                    </Link>

                    {/* Vertical Divider */}
                    <div className="h-3 w-[1px] bg-slate-700 hidden md:block"></div>

                    <Link 
                        to="/cleark-login" 
                        className="group flex items-center gap-2 text-[10px] md:text-[11px] font-black uppercase tracking-widest hover:text-white transition-colors"
                    >
                        <FaUserEdit className="text-cyan-500 group-hover:scale-110 transition-transform" />
                        Clerk Access
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default HeadL