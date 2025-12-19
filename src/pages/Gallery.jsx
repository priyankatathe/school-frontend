import React from 'react'
import { useGetGalleryQuery } from '../redux/api/galleryApi'

const Gallery = () => {
    const { data } = useGetGalleryQuery()

    return <div >
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        <div className='bg-gray-100 py-10 px-4'>
            <h1 className='text-4xl text-center font-bold text-blue-800 mb-10'>📸 Our School Gallery</h1>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto'>
                {data && data.map(item => (
                    <div key={item.id} className='rounded overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 bg-white'>
                        <img
                            src={item.image}
                            alt="gallery"
                            className='w-full h-60 object-cover hover:scale-105 transition-transform duration-300'
                        />
                    </div>
                ))}
            </div>
        </div>

    </div>
}

export default Gallery
