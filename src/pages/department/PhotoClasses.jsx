import React from "react";
import { useFindSportQuery } from "../../redux/api/departmentApi";
import { FaChalkboardTeacher, FaBookReader, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";

const PhotoClasses = () => {
  const { data, isLoading } = useFindSportQuery();

  // ✅ PREMIUM ACADEMIC CARD
  const Card = ({ item }) => (
    <motion.div 
      whileHover={{ y: -10 }}
      className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-emerald-200/50 transition-all duration-500"
    >
      {/* IMAGE SECTION */}
      <div className="relative h-60 overflow-hidden">
        <img
          src={item.image[0]}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Floating Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-emerald-500/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg border border-white/20">
            {item.category || "General"}
          </span>
        </div>
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-emerald-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* CONTENT SECTION */}
      <div className="p-6 relative">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
            <FaBookReader />
          </div>
          <h2 className="text-xl font-black text-slate-800 tracking-tight leading-tight">
            {item.name}
          </h2>
        </div>

        <div className="flex items-center gap-2 mb-4 bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
          <FaChalkboardTeacher className="text-emerald-500" size={14} />
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-tighter">
            Class Head: <span className="text-slate-900">{item.head}</span>
          </p>
        </div>

        <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-6">
          {item.desc}
        </p>

        <button className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-3.5 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg active:scale-95">
          View Class Details <FaChevronRight size={10} />
        </button>
      </div>
    </motion.div>
  );

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="bg-[#fcfdfd] min-h-screen pb-20">
      {/* HEADER SECTION */}
      <div className="relative py-20 px-6 mb-12 text-center overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -ml-32 -mt-32"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-32 -mb-32"></div>

        <div className="relative z-10">
          <span className="text-emerald-600 font-bold uppercase tracking-[0.4em] text-xs">Academic Excellence</span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mt-4 mb-6 tracking-tighter">
            Smart <span className="text-emerald-600">Classes</span>
          </h1>
          <div className="w-24 h-1.5 bg-emerald-600 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Exploring modern learning environments designed to foster creativity, 
            critical thinking, and academic brilliance.
          </p>
        </div>
      </div>

      {/* GRID SECTION */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
          {data?.clasess?.map((item) => (
            <Card key={item._id} item={item} />
          ))}
        </div>

        {/* EMPTY STATE */}
        {data?.clasess?.length === 0 && (
          <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
             <div className="text-6xl mb-4">Empty</div>
             <p className="text-slate-400 font-medium">No class data found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoClasses;