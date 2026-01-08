import React from "react";
import { useLocation } from "react-router-dom";

const PAGE_TITLES = {
    "/admin": "Admin Profile",
    "/admin/department-list": "Department",
    "/admin/function-list": "Function",
    "/admin/staff-list": "School Staff",
    "/admin/gallery-list": "Gallery",
    "/admin/cleark-list": "Clerk",
};

const Navbar = () => {
    const location = useLocation();

    const title = PAGE_TITLES[location.pathname] || "Admin Panel";

    return (
        <div className="fixed top-0 left-0 right-0 h-16 flex items-center px-6 z-40 md:ml-[260px]">
            <h1 className="text-xl ml-16 font-semibold text-gray-800">
                {title}
            </h1>
        </div>
    );
};

export default Navbar;
