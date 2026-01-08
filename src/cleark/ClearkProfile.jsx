import React, { useEffect } from "react";
import { useFindClearkQuery, useLogoutClearkMutation } from "../redux/api/authApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaPhone, FaUserShield, FaSignOutAlt, FaCalendarAlt, FaIdBadge } from "react-icons/fa";

const ClearkProfile = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useFindClearkQuery();
  const [logoutCleark, { isSuccess }] = useLogoutClearkMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Logged out successfully!");
      navigate("/cleark-login");
    }
  }, [isSuccess, navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#f8fafc]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium">Loading Professional Profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-[#f1f5f9] flex items-center justify-center p-6">
      <div className="w-full py-6 max-w-5xl bg-white shadow-sm border border-slate-200 rounded-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Sidebar Profile Section */}
        <div className="w-full md:w-80 bg-slate-50 border-r border-slate-200 p-8 flex flex-col items-center">
          <div className="relative group">
            <div className="w-36 h-36 rounded-2xl overflow-hidden ring-4 ring-white shadow-xl transition-transform duration-500 group-hover:scale-105">
              <img
                src={data?.image || "https://ui-avatars.com/api/?name=" + data?.name + "&background=6366f1&color=fff"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white shadow-sm"></div>
          </div>

          <div className="mt-6 text-center">
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">{data?.name || "Clerk Name"}</h2>
            <span className="inline-block mt-2 px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider rounded-full border border-indigo-100">
              {data?.role || "Administrator"}
            </span>
          </div>

          <div className="w-full mt-10 pt-8 border-t border-slate-200">
             <button
              onClick={() => logoutCleark()}
              className="group flex items-center justify-center gap-3 w-full py-3.5 bg-white border border-red-200 text-red-600 font-semibold rounded-xl hover:bg-red-50 hover:border-red-300 transition-all duration-200 shadow-sm"
            >
              <FaSignOutAlt className="group-hover:-translate-x-1 transition-transform" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-8 md:p-12">
          <div className="flex justify-between items-start mb-10">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900">Account Overview</h1>
              <p className="text-slate-500 mt-1">Manage your professional information and security.</p>
            </div>
            <div className="hidden sm:block">
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Info Cards */}
            <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl flex items-center gap-4 transition-hover hover:bg-white hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-indigo-500">
                <FaEnvelope size={20} />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Address</p>
                <p className="text-slate-800 font-semibold truncate">{data?.email || "N/A"}</p>
              </div>
            </div>

            <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl flex items-center gap-4 transition-hover hover:bg-white hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-indigo-500">
                <FaPhone size={20} />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Contact Number</p>
                <p className="text-slate-800 font-semibold">{data?.mobile || "N/A"}</p>
              </div>
            </div>

            <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl flex items-center gap-4 transition-hover hover:bg-white hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-indigo-500">
                <FaIdBadge size={20} />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Employee Role</p>
                <p className="text-slate-800 font-semibold">{data?.role || "Clerk"}</p>
              </div>
            </div>

            <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl flex items-center gap-4 transition-hover hover:bg-white hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-indigo-500">
                <FaCalendarAlt size={20} />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Account Status</p>
                <p className="text-green-600 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Active
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 rounded-2xl bg-indigo-600 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg shadow-indigo-100">
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-bold">Need to update information?</h3>
              <p className="text-indigo-100 text-sm">Please contact the administrator to modify your profile details.</p>
            </div>
            <button className="px-6 py-2.5 bg-white text-indigo-600 font-bold rounded-lg hover:bg-indigo-50 transition-colors whitespace-nowrap">
              Contact Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClearkProfile;