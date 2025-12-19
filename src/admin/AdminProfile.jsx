import React from "react";
import { useFetchAdminQuery, useLogoutAdminMutation } from "../redux/api/authApi";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaPhoneAlt, FaUserShield, FaSignOutAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const AdminProfile = () => {
    const navigate = useNavigate();
    const { data } = useFetchAdminQuery();
    const [logoutAdmin, { isLoading: isLogoutLoading, isSuccess: isLogoutSuccess }] =
        useLogoutAdminMutation();

    React.useEffect(() => {
        if (isLogoutSuccess) {
            toast.success("Admin logged out successfully");
            navigate("/admin-login");
        }
    }, [isLogoutSuccess, navigate]);

    return (
        <div className="flex flex-col md:flex-row justify-center items-center min-h-screen px-4 py-10 bg-gray-100 gap-6">
            {/* Profile Card */}
            <div className="bg-gradient-to-r from-emerald-500 to-green-400 p-6 rounded-2xl shadow-lg flex flex-col items-center text-white w-full md:w-1/3">
                <img
                    src="https://5.imimg.com/data5/SELLER/Default/2023/3/294997220/ZX/OC/BE/3365461/acrylic-admin-office-door-sign-board.jpg"
                    alt="Admin"
                    className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-green-500 shadow-lg object-cover transition-transform duration-300 hover:scale-105"
                />
                <h2 className="mt-4 text-2xl font-bold text-center">{data?.name || "Admin Name"}</h2>
                <p className="text-md opacity-90 text-center">{data?.role || "Administrator"}</p>
            </div>

            {/* Info & Logout Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between w-full md:w-1/3">
                <div className="space-y-4">
                    {/* Email */}
                    <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl shadow-sm hover:bg-gray-100 transition">
                        <FaEnvelope className="text-emerald-500 text-xl" />
                        <span className="text-gray-800 font-medium">{data?.email || "Not available"}</span>
                    </div>

                    {/* Mobile */}
                    <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl shadow-sm hover:bg-gray-100 transition">
                        <FaPhoneAlt className="text-emerald-500 text-xl" />
                        <span className="text-gray-800 font-medium">{data?.mobile || "Not available"}</span>
                    </div>

                    {/* Role */}
                    <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl shadow-sm hover:bg-gray-100 transition">
                        <FaUserShield className="text-emerald-500 text-xl" />
                        <span className="text-gray-800 font-medium">{data?.role || "Not available"}</span>
                    </div>
                </div>

                {/* Logout */}
                <button
                    onClick={() => logoutAdmin()}
                    className="mt-6 flex items-center justify-center gap-2 bg-red-600 text-white py-3 rounded-xl shadow-md hover:bg-red-700 transition"
                    disabled={isLogoutLoading}
                >
                    <FaSignOutAlt />
                    {isLogoutLoading ? "Logging out..." : "Logout"}
                </button>
            </div>
        </div>
    );
};

export default AdminProfile;
