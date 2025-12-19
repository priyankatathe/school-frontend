import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const AdminProtected = ({ compo }) => {
    const { admin } = useSelector(state => state.Auth)

    return (
        <>
            {admin ? (
                <>{compo}</>
            ) : (
                <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                    <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">Admin Not Logged In</h1>
                        <p className="text-gray-600 mb-6">
                            Please login to access the Admin Dashboard.
                        </p>
                        <Link
                            to="/admin-login"
                            className="inline-block w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-300"
                        >
                            Go to Login
                        </Link>
                    </div>
                </div>
            )}
        </>
    )
}

export default AdminProtected
