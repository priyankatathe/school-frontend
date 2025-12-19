import React, { useEffect } from 'react'
import { useFindClearkQuery, useLogoutClearkMutation } from '../redux/api/authApi'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { FaEnvelope, FaPhone, FaUserShield } from 'react-icons/fa'

const ClearkProfile = () => {
    const navigate = useNavigate()
    const { data } = useFindClearkQuery()
    const [logoutCleark, { isSuccess: isClearkSuccess }] = useLogoutClearkMutation()

    useEffect(() => {
        if (isClearkSuccess) {
            toast.success("Cleark logged out successfully")
            navigate("/cleark-login")
        }
    }, [isClearkSuccess])

    return (
        <div className="flex justify-center items-start p-5 mt-40 ">
            <div className="flex flex-col md:flex-row max-w-3xl w-full bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden transition-transform transform hover:scale-105 duration-300">

                {/* Left Side: Image & Name */}
                <div className="flex flex-col items-center justify-center bg-indigo-50 p-8 w-full md:w-1/3">
                    <img
                        className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover mb-4"
                        src={data?.image || "https://media.istockphoto.com/id/1398994132/photo/happy-businesswoman-using-a-digital-tablet-young-leading-businesswoman-using-a-wireless.jpg?s=2048x2048&w=is&k=20&c=tJZloUY9Ons1DD_8zVSelqaYJtl4PvqxVPgal6Z3Sic="}
                        alt={data?.name}
                    />
                    <h2 className="text-2xl font-bold text-gray-900">{data?.name}</h2>
                    <p className="text-indigo-600 mt-1 flex items-center gap-2 font-semibold">
                        <FaUserShield /> {data?.role || "Cleark"}
                    </p>
                </div>

                {/* Right Side: Info & Logout */}
                <div className="flex flex-col justify-between p-8 w-full md:w-2/3">
                    <h1 className='text-2xl font-bold'>Cleark Profile</h1>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-100">
                            <FaEnvelope className="text-indigo-500 text-xl" />
                            <span className="font-medium text-gray-700">{data?.email || "N/A"}</span>
                        </div>
                        <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-100">
                            <FaPhone className="text-indigo-500 text-xl" />
                            <span className="font-medium text-gray-700">{data?.mobile || "N/A"}</span>
                        </div>
                    </div>

                    <div className="mt-6 md:mt-auto">
                        <button
                            onClick={() => logoutCleark()}
                            className="w-full py-3 font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg hover:from-purple-500 hover:to-indigo-500 transition-all duration-300"
                        >
                            Log Out
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ClearkProfile
