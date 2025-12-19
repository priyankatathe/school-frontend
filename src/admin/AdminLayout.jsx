import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
    return (
        <>
            <Navbar />
            <AdminSidebar />

            {/* Page Content */}
            <div className="pt-16 md:ml-[260px] px-4 md:px-6">
                <Outlet />
            </div>
        </>
    );
};

export default AdminLayout;
