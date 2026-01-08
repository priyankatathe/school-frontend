import React from "react";
import { useFindSportQuery } from "../../redux/api/departmentApi";
import { FaShieldAlt, FaUserTie, FaLandmark } from "react-icons/fa";
import { motion } from "framer-motion";

const PhotoNcc = () => {
    const { data, isLoading } = useFindSportQuery();

    // ✅ MILITARY GRADE PROFESSIONAL CARD
    const Card = ({ item }) => (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-500"
        >
            {/* IMAGE SECTION */}
            <div className="relative h-64 overflow-hidden">
                <img
                    src={item.image[0]}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* STATUS BADGE */}
                <div className="absolute top-4 right-4">
                    <span className="bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-xl">
                        {item.category || "Active Wing"}
                    </span>
                </div>

                {/* OVERLAY GRADIENT */}
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* CONTENT SECTION */}
            <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                        <FaShieldAlt size={20} />
                    </div>
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                        {item.name}
                    </h2>
                </div>

                {/* OFFICER IN CHARGE */}
                <div className="flex items-center gap-2 mb-4 py-2 px-3 bg-slate-50 rounded-xl border border-slate-100">
                    <FaUserTie className="text-indigo-500" size={14} />
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-tighter">
                        Commanding Officer: <span className="text-slate-900">{item.head}</span>
                    </p>
                </div>

                <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-6 italic">
                    "{item.desc}"
                </p>

                <button className="w-full py-3.5 rounded-2xl bg-indigo-600 text-white text-xs font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg active:scale-95">
                    View Wing Profile
                </button>
            </div>
        </motion.div>
    );

    if (isLoading) return (
        <div className="h-screen flex items-center justify-center bg-slate-50">
            <div className="relative flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                <FaShieldAlt className="absolute text-indigo-600" />
            </div>
        </div>
    );

    return (
        <div className="bg-[#fcfcff] min-h-screen pb-20">
            {/* PATRIOTIC HERO SECTION */}
            <div className="relative py-24 px-6 mb-12 text-center bg-slate-900 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                </div>

                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="relative z-10"
                >
                    <span className="text-indigo-400 font-bold uppercase tracking-[0.5em] text-xs">Unity and Discipline</span>
                    <h1 className="text-5xl md:text-7xl font-black text-white mt-4 mb-6 tracking-tighter">
                        NCC <span className="text-indigo-500 font-outline-2">Wing</span>
                    </h1>
                    <div className="w-24 h-1.5 bg-indigo-500 mx-auto rounded-full mb-8"></div>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        Empowering the youth of today to become the leaders of tomorrow through 
                        rigorous training, social service, and patriotic values.
                    </p>
                </motion.div>
            </div>

            {/* GRID SECTION */}
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center gap-4 mb-12">
                    <FaLandmark className="text-indigo-600 text-2xl" />
                    <h3 className="text-2xl font-bold text-slate-800">Camps & Activities</h3>
                    <div className="flex-1 h-[1px] bg-slate-200"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {data?.ncc?.map((item) => (
                        <Card key={item._id} item={item} />
                    ))}
                </div>

                {/* NO DATA STATE */}
                {data?.ncc?.length === 0 && (
                    <div className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
                        <FaShieldAlt className="mx-auto text-slate-200 mb-4" size={50} />
                        <h3 className="text-xl font-bold text-slate-400 uppercase tracking-widest">No Active Wings Found</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PhotoNcc;