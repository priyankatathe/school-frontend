import React from 'react';
import { motion } from 'framer-motion';
import { FaAward, FaProjectDiagram, FaCalendarAlt, FaFlask, FaQuoteRight } from 'react-icons/fa';

const Functions = () => {
    const highlights = [
        { title: "Awards", desc: "National & international recognition for excellence.", icon: <FaAward />, color: "from-amber-400 to-yellow-600" },
        { title: "Student Projects", desc: "Showcasing innovative tech & art competitions.", icon: <FaProjectDiagram />, color: "from-emerald-400 to-green-600" },
        { title: "Events", desc: "Regular cultural seminars & holistic workshops.", icon: <FaCalendarAlt />, color: "from-rose-400 to-pink-600" },
        { title: "Modern Labs", desc: "State-of-the-art facilities for practical R&D.", icon: <FaFlask />, color: "from-sky-400 to-blue-600" }
    ];

    const testimonials = [
        { name: "Rohit Sharma", role: "Alumni", msg: "This school gave me the best learning environment. The teachers are amazing!" },
        { name: "Sneha Patil", role: "Parent", msg: "Our children are thriving here academically and creatively. Highly recommend!" },
        { name: "Ankit Mehta", role: "Student", msg: "I love the extra-curricular activities and sports facilities provided here." },
        { name: "Priya Reddy", role: "Faculty", msg: "Working here has been a joy. The school encourages innovation and creativity." }
    ];

    const images = [
        "https://emeraldheights.edu.in/wp-content/uploads/2023/09/EHIS_GC_2.jpg",
        "https://i0.wp.com/avenuemail.in/wp-content/uploads/2022/08/Sheyn-Ganesh.jpeg?fit=1600%2C981&ssl=1",
        "https://pcacs.ac.in/wp-content/uploads/2017/05/shiv-jayanti-2.jpg",
        "https://www.sanskrutividyasankul.com/wp-content/uploads/2021/06/Celebrations_Shiv-Jayanti_image_01-1024x768.jpg",
        "https://media.assettype.com/thequint%2F2023-04%2Fa4f92527-6db2-4a3c-98a6-cac3563c413d%2FIMG20230411103441.jpg?auto=format%2Ccompress&fmt=webp&width=720&w=1200",
        "https://zealsilvercrest.com/wp-content/uploads/2022/12/ga_ban.jpg",
        "https://www.ies.edu/cpvemprimary/gallery/101_1884.jpg",
        "https://proproductions.in/images/sports-events-bannerM.jpg"
    ];

    return (
        <div className="bg-slate-50 min-h-screen font-sans">
            {/* --- GALLERY SECTION --- */}
            <div className='max-w-7xl mx-auto py-20 px-6'>
                <div className="text-center mb-16">
                    <span className="text-blue-600 font-bold tracking-widest uppercase text-sm">Our Legacy</span>
                    <h1 className='text-4xl md:text-6xl font-black text-slate-900 mt-3 italic'>School Functions</h1>
                    <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full mt-6"></div>
                </div>

                <div className='columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4'>
                    {images.map((src, i) => (
                        <motion.div 
                            key={i} 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="break-inside-avoid"
                        >
                            <img 
                                className='w-full rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 border-4 border-white' 
                                src={src} 
                                alt="Function" 
                            />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* --- HIGHLIGHTS SECTION --- */}
            <section className="bg-slate-900 py-24 text-white">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl md:text-5xl font-black text-center mb-16 tracking-tight">Key Highlights</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {highlights.map((item, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -10 }}
                                className={`relative overflow-hidden group p-8 rounded-[2rem] bg-gradient-to-br ${item.color} shadow-2xl`}
                            >
                                <div className="text-4xl mb-6 opacity-80 group-hover:scale-110 transition-transform">{item.icon}</div>
                                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                                <p className="text-white/80 leading-relaxed text-sm">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- TESTIMONIALS SECTION --- */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-black text-center mb-20 text-slate-900">
                        Words from our <span className="text-blue-600 italic">Community</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {testimonials.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 flex flex-col md:flex-row gap-6 relative group"
                            >
                                <FaQuoteRight className="absolute top-8 right-8 text-slate-100 text-6xl group-hover:text-blue-50 transition-colors" />
                                <div className="flex-1">
                                    <p className="text-slate-600 text-lg leading-relaxed mb-8 relative z-10 italic font-medium">
                                        "{item.msg}"
                                    </p>
                                    <div>
                                        <h4 className="text-xl font-bold text-blue-600 tracking-tight">{item.name}</h4>
                                        <p className="text-slate-400 font-bold uppercase text-xs tracking-widest mt-1">{item.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Functions;