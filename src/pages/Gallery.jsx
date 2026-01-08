import React from 'react';
import { useGetGalleryQuery } from '../redux/api/galleryApi';
import { motion } from 'framer-motion';
import { FaExpandAlt, FaCameraRetro } from 'react-icons/fa';

const Gallery = () => {
    const { data, isLoading } = useGetGalleryQuery();

    if (isLoading) return (
        <div className="h-96 flex items-center justify-center">
            <div className="animate-bounce text-blue-600 flex flex-col items-center">
                <FaCameraRetro size={40} className="mb-2" />
                <span className="font-bold tracking-widest uppercase text-xs">Loading Memories...</span>
            </div>
        </div>
    );

    return (
        <div className="bg-[#f8fafc] min-h-screen pb-20">
            {/* --- HEADER SECTION --- */}
            <div className="relative bg-white border-b border-slate-200 py-16 mb-12">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span className="text-blue-600 font-bold uppercase tracking-[0.4em] text-[10px]">Captured Moments</span>
                        <h1 className="text-4xl md:text-6xl font-black text-slate-900 mt-4 mb-2 tracking-tighter italic">
                            School <span className="text-blue-600 font-outline-2">Gallery</span>
                        </h1>
                        <p className="text-slate-500 max-w-xl mx-auto text-sm">
                            A visual journey through our academic year, sports achievements, and cultural celebrations.
                        </p>
                    </motion.div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-50 rounded-full -ml-12 -mb-12"></div>
            </div>

            {/* --- MASONRY-STYLE GRID --- */}
            <div className="max-w-7xl mx-auto px-6">
                <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                    {data && data.map((item, index) => (
                        <motion.div
                            key={item.id || index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className="relative group break-inside-avoid rounded-[2rem] overflow-hidden bg-white shadow-sm border border-slate-200 hover:shadow-2xl hover:shadow-blue-200/50 transition-all duration-500"
                        >
                            {/* IMAGE */}
                            <img
                                src={item.image}
                                alt="School Activity"
                                className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* HOVER OVERLAY */}
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-white font-bold text-sm tracking-wide">
                                                {item.title || "School Event"}
                                            </p>
                                            <p className="text-blue-300 text-[10px] uppercase font-bold tracking-widest mt-1">
                                                {item.category || "Moment"}
                                            </p>
                                        </div>
                                        <button className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white hover:text-blue-900 transition-colors">
                                            <FaExpandAlt size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* EMPTY STATE */}
                {(!data || data.length === 0) && (
                    <div className="text-center py-40">
                        <div className="inline-block p-10 rounded-[3rem] bg-white shadow-inner border-2 border-dashed border-slate-200">
                            <FaCameraRetro className="mx-auto text-slate-300 mb-4" size={50} />
                            <h3 className="text-slate-400 font-bold tracking-widest uppercase text-sm">No Photos Found</h3>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Gallery;