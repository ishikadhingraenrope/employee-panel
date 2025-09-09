import React from "react";
import {
  LayoutDashboard,
  Users,
  Settings,
  CalendarCheck,
  ClipboardList,
  LogOut,
} from "lucide-react";

import { Link } from "react-router-dom";
const handleLogout = () => {
    localStorage.removeItem("userData");
    toast.success("Logged out successfully!");
    navigate("/");
  };
function Sidebar() {
  return (
    <div className="w-64 h-screen bg-white flex flex-col">
      {/* Logo Section */}
      <div className="flex items-center justify-center bg-gradient-to-b from-[#d0f0ec] to-[#fafcfc] h-16">
        <h1 className="text-xl font-bold">
          <span>ENROPE</span>{" "}
          <span className="text-black">EMS</span>
        </h1>
      </div>

      {/* App Name */}
      <div className="text-center py-4 font-semibold text-black">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="inline mr-1"
        >
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        Enrope Employee EMS
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-3 py-4 space-y-2">
        <Link
          to={"/"}
          className="flex items-center gap-3 px-4 py-2 rounded-md bg-[#86d7d4] text-black font-medium"
        >
          <LayoutDashboard size={18} /> Dashboard
        </Link>

        <Link
          to={"/"}
          className="flex items-center gap-3 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100"
        >
          <Users size={18} /> Employee Details
        </Link>

        <Link
         to={"/"}
          className="flex items-center gap-3 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100"
        >
          <Settings size={18} /> User Settings
        </Link>

        <Link
          to={"/"}
          className="flex items-center gap-3 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100"
        >
          <CalendarCheck size={18} /> Manage Attendance
        </Link>

        <Link
          to={"/Leaves"}
          className="flex items-center gap-3 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100"
        >
          <ClipboardList size={18} /> Employee Leaves
        </Link>
        <Link
          to={"/ManageLeave"}
          className="flex items-center gap-3 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100"
        >
          <ClipboardList size={18} /> Manage Leaves
        </Link>
      </nav>

      {/* Logout Button (Bottom Fixed) */}
      <div className="p-4 absolute bottom-[48px]">
        <button onClick={handleLogout} className=" w-full flex items-center justify-center gap-2 bg-[#86d7d4] hover:bg-[#74e3e0] text-black font-medium rounded-md cursor-pointer" style={ {padding: "10px 70px",}}>
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
