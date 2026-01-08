import React from "react";
import { useFindSportQuery } from "../../redux/api/departmentApi";
import { FaMusic, FaMicrophoneAlt, FaUserEdit, FaPlayCircle } from "react-icons/fa";

const PhotoMusic = () => {
    const { data, isLoading } = useFindSportQuery();

    // ✅ PROFESSIONAL MUSIC CARD
    const Card = ({ item }) => (
        <div className="group bg-white rounded-[2.5rem] p-3 border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-purple-200/50 transition-all duration-500 overflow-hidden">
            {/* IMAGE WRAPPER */}
            <div className="relative h-60 w-full overflow-hidden rounded-[2rem]">
                <img
                    src={item.image[0]}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* PLAY OVERLAY */}
                <div className="absolute inset-0 bg-purple-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <FaPlayCircle className="text-white text-5xl drop-shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform" />
                </div>

                {/* CATEGORY TAG */}
                <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-md text-purple-700 text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-lg">
                        {item.category}
                    </span>
                </div>
            </div>

            {/* CONTENT SECTION */}
            <div className="p-5">
                <h3 className="text-xl font-black text-slate-800 mb-2 group-hover:text-purple-600 transition-colors">
                    {item.name}
                </h3>
                
                <div className="flex items-center gap-2 mb-4">
                    <FaUserEdit className="text-purple-400" size={12}/>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                        Directed by: <span className="text-slate-700">{item.head}</span>
                    </p>
                </div>

                <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-6 italic border-l-2 border-purple-200 pl-3">
                    {item.desc}
                </p>

                <button className="w-full bg-purple-50 text-purple-700 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all">
                    View Performance
                </button>
            </div>
        </div>
    );

    // ✅ SECTION HEADER UI
    const MusicSection = ({ title, items, icon }) => (
        items?.length > 0 && (
            <div className="mb-24">
                <div className="flex items-center gap-4 mb-12">
                    <div className="bg-purple-600 p-4 rounded-2xl text-white shadow-lg shadow-purple-200">
                        {icon}
                    </div>
                    <div>
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter capitalize">
                            {title} <span className="text-purple-600 italic">Melodies</span>
                        </h2>
                        <div className="h-1 w-20 bg-purple-200 rounded-full mt-1"></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                    {items.map((item) => (
                        <Card key={item._id} item={item} />
                    ))}
                </div>
            </div>
        )
    );

    if (isLoading) return (
        <div className="h-screen flex items-center justify-center">
            <div className="animate-bounce flex space-x-2">
                <div className="h-3 w-3 bg-purple-600 rounded-full"></div>
                <div className="h-3 w-3 bg-purple-400 rounded-full"></div>
                <div className="h-3 w-3 bg-purple-200 rounded-full"></div>
            </div>
        </div>
    );

    return (
        <div className="bg-[#fdfaff] min-h-screen">
            {/* MUSIC HERO HEADER */}
            <div className="relative pt-24 pb-16 px-6 text-center overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-10">
                    <FaMusic className="text-[20rem] absolute -top-10 -left-20 rotate-12" />
                    <FaMusic className="text-[15rem] absolute top-20 -right-10 -rotate-12" />
                </div>
                
                <span className="text-purple-600 font-bold uppercase tracking-[0.4em] text-xs">Aura of Sound</span>
                <h1 className="text-5xl md:text-7xl font-black text-slate-900 mt-4 mb-6 tracking-tight">
                    Music <span className="text-purple-600">Department</span>
                </h1>
                <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
                    Celebrating the rhythm of life through soulful performances and artistic dedication.
                </p>
            </div>

            <main className="max-w-7xl mx-auto px-6 pb-20">
                <MusicSection 
                    title="Classical" 
                    items={data?.classical} 
                    icon={<FaMicrophoneAlt size={24} />} 
                />
                
                <MusicSection 
                    title="Western" 
                    items={data?.western} 
                    icon={<FaMusic size={24} />} 
                />
            </main>
        </div>
    );
};

export default PhotoMusic;