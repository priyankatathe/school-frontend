import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ClearkProtected = ({ compo }) => {
    const { cleark } = useSelector((state) => state.Auth);

    if (cleark) {
        return <>{compo}</>;
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 px-4">
            <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-red-600">Cleark Not Logged In</h1>
                <p className="mb-6 text-gray-600">
                    Please log in to access the Admin Dashboard.
                </p>
                <Link
                    to="/cleark-login"
                    className="inline-block px-6 py-3 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 transition"
                >
                    Login
                </Link>
            </div>
        </div>
    );
};

export default ClearkProtected;
