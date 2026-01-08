import React from 'react';
import { FaGraduationCap, FaQuoteLeft, FaHistory, FaBullseye } from 'react-icons/fa';

const About = () => {
    return (
        <div className='bg-slate-50 min-h-screen'>
            {/* HERO SECTION */}
            <div className="relative bg-blue-900 py-24 px-6 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
                </div>
                <div className="relative z-10 text-center max-w-4xl mx-auto">
                    <span className="text-blue-300 font-bold uppercase tracking-[0.3em] text-xs">Excellence in Education</span>
                    <h1 className="text-5xl md:text-7xl font-black text-white mt-4 mb-6 tracking-tighter">
                        About Our <span className="text-blue-400">Legacy</span>
                    </h1>
                    <div className="flex justify-center gap-4">
                        <span className='bg-white/10 backdrop-blur-md text-white border border-white/20 px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2'>
                            <FaHistory className="text-blue-400" /> Est. 2015
                        </span>
                        <span className='bg-white/10 backdrop-blur-md text-white border border-white/20 px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2'>
                            <FaGraduationCap className="text-blue-400" /> CBSE Pattern
                        </span>
                    </div>
                </div>
            </div>

            {/* CONTENT GRID */}
            <div className='max-w-7xl mx-auto px-6 -mt-12 relative z-20 pb-20'>
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
                    
                    {/* LEFT: SCHOOL STORY */}
                    <div className='lg:col-span-7 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-slate-200/60 border border-slate-100'>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="h-12 w-1.5 bg-blue-600 rounded-full"></div>
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Digital Alchemy Public School</h2>
                        </div>
                        
                        <div className='space-y-6 text-slate-600 text-lg leading-relaxed'>
                            <p>
                                <span className='font-bold text-blue-700'>Digital Alchemy Public School</span> isn't just an institution; it's a 
                                transformative environment where curiosity meets structure. Since our foundation in 
                                <span className="text-slate-900 font-bold"> 2015</span>, we have dedicated ourselves to crafting a learning 
                                experience that transcends traditional boundaries.
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
                                <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                                    <FaBullseye className="text-blue-600 text-2xl mb-4" />
                                    <h4 className="font-bold text-slate-900 mb-2">Our Mission</h4>
                                    <p className="text-sm">To empower students with critical thinking and values to lead in a global society.</p>
                                </div>
                                <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                                    <FaGraduationCap className="text-emerald-600 text-2xl mb-4" />
                                    <h4 className="font-bold text-slate-900 mb-2">Our Vision</h4>
                                    <p className="text-sm">Nurturing holistic development through arts, science, and disciplined sportsmanship.</p>
                                </div>
                            </div>

                            <p>
                                We believe every child is a unique narrative waiting to be written. Our campus provides 
                                the canvas, our teachers provide the ink, and our values provide the direction. 
                                We don't just teach—we inspire leaders of the future.
                            </p>
                        </div>
                    </div>

                    {/* RIGHT: PRINCIPAL PROFILE */}
                    <div className='lg:col-span-5'>
                        <div className="sticky top-10">
                            <div className="bg-white p-4 rounded-[3rem] shadow-2xl border border-slate-100 group">
                                <div className="relative overflow-hidden rounded-[2.5rem]">
                                    <img
                                        src="https://viaaninternationalschool.com/wp-content/uploads/2024/02/WhatsApp-Image-2024-02-13-at-22.06.07-1-480x800.jpg"
                                        alt="Principal"
                                        className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-transparent"></div>
                                    <div className="absolute bottom-8 left-8 right-8 text-white">
                                        <h3 className="text-2xl font-black tracking-tight">Ms. Sujata Singh</h3>
                                        <p className="text-blue-300 font-bold text-sm uppercase tracking-widest">Principal & Visionary</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* PRINCIPAL MESSAGE SECTION */}
                <div className='mt-24 bg-blue-900 rounded-[3rem] overflow-hidden relative'>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-800 rounded-full -mr-32 -mt-32 blur-3xl opacity-50"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-800 rounded-full -ml-32 -mb-32 blur-3xl opacity-50"></div>
                    
                    <div className="relative z-10 p-10 md:p-20 flex flex-col items-center text-center">
                        <FaQuoteLeft className="text-blue-400 text-5xl mb-8" />
                        <h2 className='text-3xl md:text-5xl font-black text-white mb-10 tracking-tighter'>Principal's Message</h2>
                        <p className='text-blue-100 text-lg md:text-xl leading-relaxed max-w-4xl italic font-medium'>
                            "At Digital Alchemy, we believe education is the most powerful tool to change the world. 
                            Our focus is not just on academic scores, but on the character we build. Every child who 
                            enters our gates is nurtured with empathy, discipline, and the courage to dream big. 
                            Welcome to a journey of endless possibilities."
                        </p>
                        <div className="w-20 h-1 bg-blue-400 mt-10 rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;