import React from 'react'
import { useFetchClearkQuery } from '../redux/api/authApi'

const AllCleark = () => {
    const { data } = useFetchClearkQuery()

    return (
        <div className='p-5  mt-5'>
            <h2 className='text-2xl font-bold mb-6 text-gray-800'>All Clearks</h2>

            {data?.length > 0 ? (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {data.map((item) => (
                        <div
                            key={item.id}
                            className='relative bg-white rounded-xl shadow-lg p-5 flex flex-col items-center text-center hover:scale-105 transform transition-all duration-300'
                        >
                            <div className='w-16 h-16 mb-3'>
                                <img
                                    src={`https://ui-avatars.com/api/?name=${item.name}&background=4ade80&color=fff&size=128`}
                                    alt={item.name}
                                    className='w-full h-full rounded-full object-cover shadow'
                                />
                            </div>

                            <h3 className='font-semibold text-lg text-gray-800'>{item.name}</h3>
                            <p className='text-sm text-gray-600 mt-1'>{item.email}</p>
                            <p className='text-sm text-gray-600 mt-1'>{item.mobile}</p>

                            <div className='flex gap-3 mt-4'>
                                <button className='bg-yellow-400 text-white px-4 py-1 rounded-lg shadow hover:bg-yellow-500 transition'>
                                    Update
                                </button>
                                <button className='bg-red-600 text-white px-4 py-1 rounded-lg shadow hover:bg-red-700 transition'>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className='text-center text-gray-500'>No clearks found.</p>
            )}
        </div>
    )
}

export default AllCleark
