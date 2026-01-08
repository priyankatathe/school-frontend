import React from 'react'
import { Link } from 'react-router-dom'
import { FaRunning, FaMusic, FaShieldAlt, FaChalkboardTeacher, FaArrowRight } from 'react-icons/fa'

const Department = () => {
    const departments = [
        {
            name: 'SPORTS ACADEMY',
            description: 'Building physical strength and team spirit through diverse athletic programs and state-of-the-art facilities.',
            link: '/photosport',
            icon: <FaRunning />,
            color: '#3b82f6', // blue-500
            bgColor: 'bg-blue-50',
        },
        {
            name: 'MUSIC & ARTS',
            description: 'Unleashing creativity through classical and modern music education, vocal training, and instrumental mastery.',
            link: '/photomusic',
            icon: <FaMusic />,
            color: '#a855f7', // purple-500
            bgColor: 'bg-purple-50',
        },
        {
            name: 'NCC WING',
            description: 'Instilling discipline, patriotism, and leadership qualities in our students through dedicated cadet training.',
            link: '/photoncc',
            icon: <FaShieldAlt />,
            color: '#10b981', // emerald-500
            bgColor: 'bg-emerald-50',
        },
        {
            name: 'SMART CLASSES',
            description: 'Advanced digital learning environments equipped with modern technology to enhance academic excellence.',
            link: '/photoclass',
            icon: <FaChalkboardTeacher />,
            color: '#f59e0b', // yellow-500
            bgColor: 'bg-yellow-50',
        },
    ]

    return (
        <section className="bg-slate-50 py-24 px-6 md:px-10">
            <div className="max-w-7xl mx-auto">
                {/* HEADER */}
                <div className="text-center mb-16">
                    <span className="text-blue-600 font-bold tracking-[0.2em] uppercase text-sm">Our Facilities</span>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 mt-3">
                        Campus <span className="text-blue-600">Departments</span>
                    </h1>
                    <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full mt-6"></div>
                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {departments.map((dept, index) => (
                        <div
                            key={index}
                            className="group relative bg-white rounded-[2.5rem] p-2 pr-4 md:pr-8 flex flex-col md:flex-row items-center gap-6 border border-white shadow-xl shadow-slate-200/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                        >
                            {/* ICON BOX */}
                            <div className={`w-full md:w-48 h-48 ${dept.bgColor} rounded-[2rem] flex items-center justify-center text-5xl transition-transform duration-500 group-hover:scale-95`} style={{ color: dept.color }}>
                                {dept.icon}
                            </div>

                            {/* CONTENT */}
                            <div className="flex-1 p-6 md:p-0">
                                <h2 className="text-2xl font-black text-slate-800 mb-3 tracking-tight">
                                    {dept.name}
                                </h2>
                                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                                    {dept.description}
                                </p>
                                
                                <Link
                                    to={dept.link}
                                    className="inline-flex items-center gap-2 font-bold text-sm tracking-widest uppercase transition-all duration-300 hover:gap-4"
                                    style={{ color: dept.color }}
                                >
                                    Explore Gallery <FaArrowRight />
                                </Link>
                            </div>

                            {/* DECORATIVE NUMBER */}
                            <span className="absolute top-8 right-8 text-6xl font-black text-slate-50 opacity-0 group-hover:opacity-100 transition-opacity">
                                0{index + 1}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Department