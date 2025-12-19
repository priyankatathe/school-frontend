import React from 'react'
import { Link } from 'react-router-dom'

const HeadL = () => {
    return <>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-2'>
            <div>
                <h6 className='font-bold text-lg'> ** this line only head of schooll **</h6>
            </div>
            <div className="flex gap-4 justify-start md:justify-end">
                <Link to="admin-login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">admin</Link>
                <Link to="cleark-login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">cleark</Link>
            </div>
        </div>
    </>
}

export default HeadL