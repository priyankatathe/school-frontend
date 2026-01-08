import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChalkboardTeacher, FaMicroscope, FaGraduationCap, FaArrowRight, FaArrowLeft } from "react-icons/fa";

const Home = () => {
  const slides = [
    "https://images.unsplash.com/photo-1523050335456-c70d27a19932?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1232&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play feature for professionalism
  useEffect(() => {
    const timer = setInterval(() => nextSlide(), 6000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="bg-[#fcfcfd]">
      {/* --- HERO CAROUSEL SECTION --- */}
      <section className="relative h-[90vh] w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent z-10" />
            <img
              src={slides[currentSlide]}
              className="w-full h-full object-cover"
              alt="Campus"
            />
          </motion.div>
        </AnimatePresence>

        {/* HERO CONTENT */}
        <div className="relative z-20 h-full flex flex-col justify-center px-6 md:px-20 max-w-5xl">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-cyan-400 font-black tracking-[0.3em] uppercase text-xs md:text-sm mb-4"
          >
            Welcome to Excellence
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-black text-white leading-tight"
          >
            Nurturing Minds, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Shaping Futures.
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-200 text-lg md:text-xl mt-6 max-w-xl leading-relaxed"
          >
            Digital Alchemy Academy provides a world-class environment for students to excel academically and creatively.
          </motion.p>
          <motion.div className="flex gap-4 mt-10">
            <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-full font-bold transition-all shadow-xl shadow-cyan-500/30">
              Enroll Now
            </button>
            <button className="border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-full font-bold backdrop-blur-sm transition-all">
              Learn More
            </button>
          </motion.div>
        </div>

        {/* CAROUSEL CONTROLS */}
        <div className="absolute bottom-10 right-10 z-30 flex gap-4">
          <button onClick={prevSlide} className="p-4 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all">
            <FaArrowLeft />
          </button>
          <button onClick={nextSlide} className="p-4 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all">
            <FaArrowRight />
          </button>
        </div>
      </section>

      {/* --- STATS SECTION (Static Professional UI) --- */}
      <div className="relative z-30 -mt-16 max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
        {[
          { label: "Students", val: "2,500+" },
          { label: "Expert Staff", val: "120+" },
          { label: "Graduate Rate", val: "99%" },
          { label: "Years Glory", val: "25+" },
        ].map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 text-center">
            <h4 className="text-2xl font-black text-slate-800">{s.val}</h4>
            <p className="text-sm text-slate-500 font-medium uppercase tracking-tighter">{s.label}</p>
          </div>
        ))}
      </div>

      {/* --- WHY CHOOSE US SECTION --- */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="text-center mb-20">
            <h2 className="text-blue-900 text-4xl md:text-5xl font-black mb-4 tracking-tighter">
                Why Choose Our Academy?
            </h2>
            <div className="w-20 h-1.5 bg-cyan-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              title: "Innovative Curriculum",
              icon: <FaMicroscope />,
              desc: "Modern pedagogical techniques blended with core traditional values.",
              color: "bg-blue-50 text-blue-600"
            },
            {
              title: "Expert Mentorship",
              icon: <FaChalkboardTeacher />,
              desc: "Learn from industry-certified professionals and veteran educators.",
              color: "bg-cyan-50 text-cyan-600"
            },
            {
              title: "Global Recognition",
              icon: <FaGraduationCap />,
              desc: "Degrees and certifications recognized by top universities worldwide.",
              color: "bg-indigo-50 text-indigo-600"
            }
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-300 relative group"
            >
              <div className={`${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed">
                {feature.desc}
              </p>
              <div className="mt-6 flex items-center gap-2 text-cyan-600 font-bold cursor-pointer group-hover:gap-4 transition-all">
                Read More <FaArrowRight size={12} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;