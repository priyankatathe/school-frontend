import React from 'react';
import { motion } from 'framer-motion';

const Functions = () => {
    const highlights = [
        { title: "🏆 Awards", desc: "Our students and faculty have won national & international awards.", color: "from-yellow-400 to-yellow-500" },
        { title: "📚 Student Projects", desc: "Innovative projects by students showcased at competitions.", color: "from-green-400 to-green-500" },
        { title: "🎭 Events & Workshops", desc: "Regular workshops, seminars & cultural events for students.", color: "from-pink-400 to-pink-500" },
        { title: "🧪 Modern Labs", desc: "State-of-the-art laboratories for practical learning.", color: "from-blue-400 to-blue-500" }
    ];

    const testimonials = [
        { name: "Rohit Sharma", role: "Alumni", msg: "This school gave me the best learning environment. The teachers are amazing!" },
        { name: "Sneha Patil", role: "Parent", msg: "Our children are thriving here academically and creatively. Highly recommend!" },
        { name: "Ankit Mehta", role: "Student", msg: "I love the extra-curricular activities and sports facilities provided here." },
        { name: "Priya Reddy", role: "Faculty", msg: "Working here has been a joy. The school encourages innovation and creativity." }
    ];

    return (
        <div>
            {/* Functions Section */}
            <div className='mt-10 px-4'>
                <h1 className='text-5xl p-6 text-center font-extrabold'>Function</h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    <img className='h-80 w-93 p-5' src="https://emeraldheights.edu.in/wp-content/uploads/2023/09/EHIS_GC_2.jpg" alt="" />
                    <img className='h-80 w-93 p-5' src="https://i0.wp.com/avenuemail.in/wp-content/uploads/2022/08/Sheyn-Ganesh.jpeg?fit=1600%2C981&ssl=1" alt="" />
                    <img className='h-80 w-93 p-5' src="https://pcacs.ac.in/wp-content/uploads/2017/05/shiv-jayanti-2.jpg" alt="" />
                    <img className='h-80 w-93 p-5' src="https://www.sanskrutividyasankul.com/wp-content/uploads/2021/06/Celebrations_Shiv-Jayanti_image_01-1024x768.jpg" alt="" />
                    <img className='h-80 w-93 p-5' src="https://media.assettype.com/thequint%2F2023-04%2Fa4f92527-6db2-4a3c-98a6-cac3563c413d%2FIMG20230411103441.jpg?auto=format%2Ccompress&fmt=webp&width=720&w=1200" alt="" />
                    <img className='h-80 w-93 p-5' src="https://zealsilvercrest.com/wp-content/uploads/2022/12/ga_ban.jpg" alt="" />
                    <img className='h-80 w-93 p-5' src="https://www.ies.edu/cpvemprimary/gallery/101_1884.jpg" alt="" />
                    <img className='h-80 w-93 p-5' src="https://proproductions.in/images/sports-events-bannerM.jpg" alt="" />
                </div>
            </div>

            {/* Highlights Section */}
            <section className="bg-gray-50 py-20 mt-10">
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-800">Our Highlights</h2>
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
                    {highlights.map((item, index) => (
                        <motion.div
                            key={index}
                            className={`rounded-xl shadow-lg p-6 text-center text-white bg-gradient-to-r ${item.color} hover:scale-105 transform transition`}
                            whileHover={{ scale: 1.05 }}
                        >
                            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                            <p className="text-sm">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Testimonials / Achievements Section */}
            <section className="bg-blue-50 py-20 mt-10">
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-blue-800">
                    School Achievements & Testimonials
                </h2>
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={index}
                            className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition transform hover:-translate-y-1"
                            whileHover={{ scale: 1.05 }}
                        >
                            <p className="text-gray-700 mb-4 text-sm">{item.msg}</p>
                            <h4 className="text-lg font-bold text-blue-700">{item.name}</h4>
                            <p className="text-gray-500 text-sm">{item.role}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Functions;
