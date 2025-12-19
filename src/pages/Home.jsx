import React from "react";
import { motion } from "framer-motion";

const Home = () => {
    return (
        <div className="overflow-hidden">
            <div className="relative w-screen h-screen">
                {/* Carousel Slides */}
                <div className="carousel h-full w-full">
                    {[
                        "https://i.pinimg.com/736x/75/53/db/7553db372d7ec0ee513d1b672003f5de.jpg",
                        "https://i.pinimg.com/736x/cd/7a/5f/cd7a5f5508b8f8852e8138619dab5dcd.jpg",
                        "https://i.pinimg.com/736x/4f/f8/bd/4ff8bd78dd5e1f81bc1f747274cfabba.jpg",
                        "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1232&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    ].map((img, index) => (
                        <div
                            key={index}
                            id={`slide${index + 1}`}
                            className="carousel-item relative w-full h-full"
                        >
                            <img
                                src={img}
                                alt={`Slide ${index + 1}`}
                                className="w-full h-full object-cover"
                            />

                            {/* Overlay Text */}
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1 }}
                                className="absolute inset-0 flex items-center justify-center px-6"
                            >
                                <div className="bg-white bg-opacity-60 backdrop-blur-md p-8 rounded-2xl text-center max-w-2xl shadow-lg">
                                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
                                        Digital Alchemy Academy
                                    </h1>
                                    <p className="text-gray-800 text-base md:text-lg lg:text-xl">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
                                        reiciendis accusamus optio esse unde dignissimos. Molestiae
                                        reprehenderit architecto eos animi?
                                    </p>
                                </div>
                            </motion.div>

                            {/* Carousel Buttons */}
                            <div className="absolute inset-y-1/2 left-5 right-5 flex justify-between transform -translate-y-1/2">
                                <a
                                    href={`#slide${index === 0 ? 4 : index}`}
                                    className="btn btn-circle bg-white bg-opacity-70 hover:bg-white/90 text-gray-800 shadow-lg"
                                >
                                    ❮
                                </a>
                                <a
                                    href={`#slide${index === 3 ? 1 : index + 2}`}
                                    className="btn btn-circle bg-white bg-opacity-70 hover:bg-white/90 text-gray-800 shadow-lg"
                                >
                                    ❯
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* About Section */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <motion.h2
                    className="text-3xl sm:text-4xl font-bold text-center mb-12 text-blue-700"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    Why Choose Us
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <motion.div
                        className="bg-white shadow-lg rounded-xl p-8 text-center hover:shadow-2xl transition"
                        whileHover={{ scale: 1.05 }}
                    >
                        <h3 className="text-xl font-semibold mb-2">Innovative Curriculum</h3>
                        <p className="text-gray-600">Our courses combine modern techniques with traditional learning for complete growth.</p>
                    </motion.div>

                    <motion.div
                        className="bg-white shadow-lg rounded-xl p-8 text-center hover:shadow-2xl transition"
                        whileHover={{ scale: 1.05 }}
                    >
                        <h3 className="text-xl font-semibold mb-2">Expert Staff</h3>
                        <p className="text-gray-600">Learn from highly experienced teachers and mentors guiding every step of the way.</p>
                    </motion.div>

                    <motion.div
                        className="bg-white shadow-lg rounded-xl p-8 text-center hover:shadow-2xl transition"
                        whileHover={{ scale: 1.05 }}
                    >
                        <h3 className="text-xl font-semibold mb-2">Vibrant Campus Life</h3>
                        <p className="text-gray-600">Engage in sports, music, and cultural activities to develop holistic skills.</p>
                    </motion.div>
                </div>
            </section>


        </div>
    );
};

export default Home;
