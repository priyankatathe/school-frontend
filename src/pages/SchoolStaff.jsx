import React from 'react'
import { useGetUStaffQuery } from '../redux/api/staffApi'

const SchoolStaff = () => {
    const { data } = useGetUStaffQuery()

    return (
        <div className="bg-gray-100 min-h-screen px-4 py-12">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-12 text-gray-800">
                Our Featured Courses | School Staff
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {data?.map((item) => (
                    <div
                        key={item.id}
                        className="relative bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 overflow-hidden"
                    >
                        <div className="relative">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-64 object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                        </div>
                        <div className="p-5 text-center">
                            <h3 className="text-xl font-bold text-gray-900 mb-1 capitalize">
                                {item.name}
                            </h3>
                            <p className="text-gray-700 font-medium">Subject: {item.sub}</p>
                            <p className="text-gray-600 text-sm mt-1">
                                Experience: {item.expriance} years
                            </p>
                            <div className="mt-4 flex justify-center gap-2">
                                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                    Staff
                                </span>
                                <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">
                                    Expert
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SchoolStaff
