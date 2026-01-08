import React from "react";
import { useFetchAdminQuery, useLogoutAdminMutation } from "../redux/api/authApi";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaPhoneAlt, FaUserShield, FaSignOutAlt, FaIdBadge, FaCheckCircle } from "react-icons/fa";
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
        <div className=" bg-slate-50/50 flex items-center justify-center py-5 px-4">
            <div className="max-w-4xl w-full">
                
                {/* Header Welcome Message */}
                <div className="mb-8 text-center md:text-left">
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight">System Administrator<span className="text-emerald-500">.</span></h1>
                    <p className="text-slate-500 font-medium mt-1">Manage your account settings and security preferences.</p>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-stretch">
                    
                    {/* Left: Identity Card */}
                    <div className="w-full md:w-[380px] bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 overflow-hidden border border-slate-100 flex flex-col">
                        <div className="h-32 bg-gradient-to-br from-emerald-600 to-teal-800 relative">
                            {/* Decorative circles */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                        </div>
                        
                        <div className="px-6 pb-8 flex-grow flex flex-col items-center -mt-16 relative">
                            <div className="relative">
                                <img
                                    src="https://5.imimg.com/data5/SELLER/Default/2023/3/294997220/ZX/OC/BE/3365461/acrylic-admin-office-door-sign-board.jpg"
                                    alt="Admin"
                                    className="w-32 h-32 rounded-3xl border-4 border-white shadow-2xl object-cover transform transition-transform duration-500 hover:rotate-2"
                                />
                                <div className="absolute bottom-2 right-2 bg-emerald-500 p-1.5 rounded-full border-4 border-white">
                                    <FaCheckCircle className="text-white text-xs" />
                                </div>
                            </div>
                            
                            <h2 className="mt-6 text-2xl font-black text-slate-800 tracking-tight">
                                {data?.name || "Admin Name"}
                            </h2>
                            <div className="mt-2 inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-widest border border-emerald-100">
                                <FaUserShield /> {data?.role || "Administrator"}
                            </div>

                            <div className="mt-8 w-full border-t border-slate-50 pt-8 space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400 font-bold uppercase tracking-tighter text-[10px]">Security Level</span>
                                    <span className="text-slate-700 font-black">Tier 1 Elite</span>
                                </div>
                                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-emerald-500 h-full w-[100%]"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Detailed Info & Actions */}
                    <div className="flex-grow flex flex-col gap-6">
                        
                        {/* Info Section */}
                        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 p-8 border border-slate-100 flex-grow">
                            <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Contact Information</h3>
                            
                            <div className="grid gap-4">
                                {/* Email Row */}
                                <div className="group flex items-center gap-5 p-4 rounded-2xl border border-slate-50 bg-slate-50/30 hover:bg-white hover:border-emerald-100 hover:shadow-md transition-all duration-300">
                                    <div className="h-12 w-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                                        <FaEnvelope size={20} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</span>
                                        <span className="text-slate-700 font-bold">{data?.email || "Not available"}</span>
                                    </div>
                                </div>

                                {/* Mobile Row */}
                                <div className="group flex items-center gap-5 p-4 rounded-2xl border border-slate-50 bg-slate-50/30 hover:bg-white hover:border-emerald-100 hover:shadow-md transition-all duration-300">
                                    <div className="h-12 w-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                                        <FaPhoneAlt size={18} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone Number</span>
                                        <span className="text-slate-700 font-bold">{data?.mobile || "Not available"}</span>
                                    </div>
                                </div>

                                {/* ID Row */}
                                <div className="group flex items-center gap-5 p-4 rounded-2xl border border-slate-50 bg-slate-50/30 hover:bg-white hover:border-emerald-100 hover:shadow-md transition-all duration-300">
                                    <div className="h-12 w-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                                        <FaIdBadge size={20} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Designation</span>
                                        <span className="text-slate-700 font-bold">{data?.role || "Not available"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Bar */}
                        <div className="bg-white rounded-[1.5rem] shadow-lg shadow-red-100/50 p-4 border border-red-50 flex items-center justify-between">
                            <span className="text-slate-400 text-xs font-bold ml-4 italic">Sign out of all sessions?</span>
                            <button
                                onClick={() => logoutAdmin()}
                                disabled={isLogoutLoading}
                                className="flex items-center gap-3 bg-red-50 text-red-600 px-8 py-3 rounded-xl font-black text-xs uppercase tracking-[0.1em] hover:bg-red-600 hover:text-white transition-all duration-300 shadow-sm disabled:opacity-50"
                            >
                                {isLogoutLoading ? (
                                    <span className="loading loading-spinner loading-xs"></span>
                                ) : (
                                    <>
                                        <FaSignOutAlt /> Sign Out
                                    </>
                                )}
                            </button>
                        </div>

                    </div>
                </div>

                
            </div>
        </div>
    );
};

export default AdminProfile;