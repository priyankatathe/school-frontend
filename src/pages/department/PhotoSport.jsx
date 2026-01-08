import React from "react";
import { useFindSportQuery } from "../../redux/api/departmentApi";
import { FaUserTie, FaAward, FaInfoCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const PhotoSport = () => {
    const { data, isLoading } = useFindSportQuery();

    // ✅ Professional Card Component
    const Card = ({ item }) => (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500"
        >
            {/* IMAGE SECTION */}
            <div className="relative h-64 overflow-hidden">
                <img
                    src={item.image[0]}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay Badge */}
                <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-md text-emerald-700 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg border border-white/20">
                        {item.category || "Tournament"}
                    </span>
                </div>
                {/* Bottom Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* CONTENT SECTION */}
            <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                    <h2 className="text-xl font-black text-slate-800 tracking-tight group-hover:text-emerald-600 transition-colors">
                        {item.name}
                    </h2>
                    <FaAward className="text-emerald-500 text-xl" />
                </div>

                <div className="flex items-center gap-2 text-slate-500 mb-4 bg-slate-50 p-2 rounded-xl">
                    <FaUserTie className="text-emerald-600 shadow-sm" size={14} />
                    <p className="text-xs font-bold uppercase tracking-tighter">
                        Coach: <span className="text-slate-800">{item.head}</span>
                    </p>
                </div>

                <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 italic">
                    "{item.desc}"
                </p>
                
                <button className="mt-6 w-full py-3 rounded-2xl bg-slate-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg active:scale-95">
                    View Achievement
                </button>
            </div>
        </motion.div>
    );

    // ✅ Professional Section Component
    const Section = ({ title, items, iconColor }) =>
        items?.length > 0 && (
            <div className="mb-24">
                <div className="flex items-center gap-4 mb-10">
                    <div className={`h-12 w-2 rounded-full ${iconColor}`}></div>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter">
                        {title}
                    </h2>
                    <div className="flex-1 h-[1px] bg-slate-100 ml-4"></div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
                    {items.map((item) => (
                        <Card key={item._id} item={item} />
                    ))}
                </div>
            </div>
        );

    if (isLoading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
    );

    return (
        <div className="bg-[#fcfcfd] min-h-screen pb-20">
            {/* HERO HEADER */}
            <div className="bg-slate-900 py-20 px-6 mb-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter">
                        Sports <span className="text-emerald-500">Excellence</span>
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        Celebrating the spirit of sportsmanship and the glory of our champions across various disciplines.
                    </p>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="max-w-7xl mx-auto px-6">
                <Section title="Hockey Division" items={data?.hocky} iconColor="bg-orange-500" />
                <Section title="Cricket Club" items={data?.cricket} iconColor="bg-blue-500" />
                <Section title="Handball Team" items={data?.handball} iconColor="bg-emerald-500" />
                <Section title="Basketball Squad" items={data?.basketball} iconColor="bg-purple-500" />

                {/* EMPTY STATE */}
                {!data && (
                    <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
                        <FaInfoCircle className="mx-auto text-slate-300 mb-4" size={40} />
                        <h3 className="text-xl font-bold text-slate-800">No Gallery Data Available</h3>
                        <p className="text-slate-500">Check back later for recent sports updates.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PhotoSport;