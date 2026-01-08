import React from 'react'
import { useGetUStaffQuery } from '../redux/api/staffApi'
// Icons ke liye (Optional: Agar react-icons install hai to use karein, warna svg use karein)
import { FaGraduationCap, FaEnvelope, FaLinkedin } from 'react-icons/fa'

const SchoolStaff = () => {
    const { data } = useGetUStaffQuery()

    return (
        <div className="bg-[#f8fafc] min-h-screen px-4 py-20 font-sans">
            
            {/* DECORATIVE BACKGROUND ELEMENTS (Static Extra UI) */}
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-50 to-transparent -z-10" />
            <div className="absolute top-40 right-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50 -z-10" />

            {/* HEADER SECTION */}
            <div className="text-center mb-20">
                <span className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-3 block">
                    Academic Excellence
                </span>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
                    Our Dedicated <span className="text-blue-600">Faculty</span>
                </h1>
                <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full mb-6"></div>
                <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
                    Meet the brilliant minds shaping the future. Our educators bring years of 
                    expertise and a passion for holistic development.
                </p>
            </div>

            {/* STAFF GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {data?.map((item) => (
                    <div
                        key={item.id}
                        className="group relative bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-blue-200/40 transition-all duration-500 hover:-translate-y-3 overflow-hidden"
                    >
                        {/* IMAGE SECTION WITH OVERLAY */}
                        <div className="relative h-72 overflow-hidden">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            {/* Experience Badge (Top Right) */}
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-lg border border-white/20">
                                <p className="text-[10px] font-black text-slate-400 uppercase leading-none">Experience</p>
                                <p className="text-sm font-bold text-blue-600">{item.expriance}</p>
                            </div>
                            
                            {/* Bottom Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>

                        {/* CONTENT SECTION */}
                        <div className="p-8 relative">
                            {/* Subject Badge (Floating) */}
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-5 py-2 rounded-full text-xs font-bold shadow-xl border-4 border-white whitespace-nowrap">
                                {item.sub}
                            </div>

                            <div className="mt-2 text-center">
                                <h3 className="text-xl font-extrabold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">
                                    {item.name}
                                </h3>
                                
                                <div className="flex items-center justify-center gap-1.5 text-slate-400 mb-6">
                                    <FaGraduationCap className="text-blue-500" />
                                    <span className="text-[13px] font-semibold tracking-wide uppercase italic">
                                        Senior Faculty
                                    </span>
                                </div>

                                {/* EXTRA STATIC UI: PROFESSIONAL FOOTER BAR */}
                                <div className="pt-6 border-t border-slate-50 flex items-center justify-center gap-4">
                                    <button className="p-2.5 rounded-full bg-slate-50 text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300">
                                        <FaEnvelope size={14} />
                                    </button>
                                    <button className="p-2.5 rounded-full bg-slate-50 text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300">
                                        <FaLinkedin size={14} />
                                    </button>
                                    <div className="h-8 w-[1px] bg-slate-100 mx-1"></div>
                                    <button className="text-[11px] font-black uppercase tracking-tighter text-blue-600 hover:tracking-widest transition-all">
                                        View Profile
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            
        </div>
    )
}

export default SchoolStaff