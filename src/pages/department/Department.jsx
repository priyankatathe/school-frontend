import React from 'react'
import { Link } from 'react-router-dom'

const Department = () => {
    const departments = [
        {
            name: 'SPORT',
            description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium amet sed tempore autem, voluptas ipsum ab minima accusamus maiores odit!',
            link: 'photosport',
            color: 'blue-500',
        },
        {
            name: 'MUSIC',
            description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium amet sed tempore autem, voluptas ipsum ab minima accusamus maiores odit!',
            link: 'photomusic',
            color: 'purple-500',
        },
        {
            name: 'NCC',
            description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium amet sed tempore autem, voluptas ipsum ab minima accusamus maiores odit!',
            link: 'photoncc',
            color: 'emerald-500',
        },
        {
            name: 'CLASSES',
            description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium amet sed tempore autem, voluptas ipsum ab minima accusamus maiores odit!',
            link: 'photoclass',
            color: 'yellow-500',
        },
    ]

    return (
        <div className="overflow-hidden mt-10 px-6 md:px-10">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-12 text-center text-blue-700">
                Departments
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
                {departments.map((dept, index) => (
                    <div
                        key={index}
                        className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 p-8 flex flex-col justify-between`}
                    >
                        <div>
                            <h2
                                className={`text-2xl font-bold mb-4 text-${dept.color}`}
                            >
                                {dept.name}
                            </h2>
                            <p className="text-gray-600 mb-6">{dept.description}</p>
                        </div>
                        <Link
                            to={dept.link}
                            className={`w-full text-white bg-${dept.color} hover:bg-${dept.color}-600 px-4 py-2 rounded-lg text-center font-medium transition`}
                        >
                            View
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Department
