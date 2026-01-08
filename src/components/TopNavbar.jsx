import React from 'react'
import { FaLocationDot, FaPhoneVolume, FaClock, FaEnvelope } from "react-icons/fa6";

const TopNavbar = () => {
  return (
    <div className="bg-slate-900 text-slate-300 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-2">

        {/* MOBILE VIEW */}
        <div className="flex flex-col gap-2 sm:hidden">
          <div className="flex items-center gap-2 text-[11px]">
            <FaLocationDot className="text-cyan-500" />
            <span>71 Pilgrim Avenue, MD</span>
          </div>

          <div className="flex items-center gap-2 text-[11px]">
            <FaEnvelope className="text-cyan-500" />
            <span>contact@academy.com</span>
          </div>

          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-2 text-[11px]">
              <FaClock className="text-cyan-500" />
              <span>Mon - Sat: 8AM - 5PM</span>
            </div>

            <a
              href="tel:+101234567977"
              className="flex items-center gap-2 bg-cyan-600 px-3 py-1 rounded-full text-white text-[11px] font-semibold"
            >
              <FaPhoneVolume className="animate-pulse" />
              Call
            </a>
          </div>
        </div>

        {/* DESKTOP VIEW */}
        <div className="hidden sm:flex flex-col lg:flex-row justify-between items-center gap-4">
          
          {/* LEFT */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <FaLocationDot className="text-cyan-500" />
              <span className="text-[11px]">
                71 Pilgrim Avenue Chevy Chase, MD 20815
              </span>
            </div>

            <div className="h-3 w-px bg-slate-700" />

            <div className="flex items-center gap-2">
              <FaEnvelope className="text-cyan-500" />
              <span className="text-[11px]">
                contact@academy.com
              </span>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <FaClock className="text-cyan-500" />
              <span className="text-[11px]">
                Mon - Sat: 8:00 AM - 5:00 PM
              </span>
            </div>

            <div className="h-3 w-px bg-slate-700" />

            <div className="flex items-center gap-3 bg-slate-800/60 px-4 py-1 rounded-full border border-slate-700 hover:bg-slate-800 transition">
              <FaPhoneVolume size={12} className="text-cyan-400 animate-pulse" />
              <span className="text-[11px] font-bold text-white tracking-widest">
                +(10) 123 456 7977
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default TopNavbar
