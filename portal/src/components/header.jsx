import React, { useEffect, useState, useRef } from "react";
import { User, LogOut, Menu } from "lucide-react";
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MainHeader = ({
  activeTab = "Dashboard",
  opensidebar,
  setopensidebar,
}) => {
  const [helpOpen, setHelpOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  const helpRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  // ✅ Load user data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  // 🔹 Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
      if (helpRef.current && !helpRef.current.contains(event.target)) {
        setHelpOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔹 Update tab title
  useEffect(() => {
    document.title = `${activeTab} - EMS`;
  }, [activeTab]);

  // ✅ Logout clears localStorage
  const handleLogout = () => {
    localStorage.removeItem("userData");
    toast.success("Logged out successfully!");
    navigate("/");
  };

  return (
    <header className="right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#fff] h-16 text-black">
      {/* Left: Icon + Breadcrumb */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 text-large ml-1">
         
          <span className="text-xl font-bold cursor-pointer ">
           <h2>Hi, User </h2>
          </span>
        </div>
      </div>

      {/* Right: Bell + Help + Profile */}
      <div className="flex items-center space-x-4">
        <div className="relative cursor-pointer">
          <Bell size={14} className="text-black" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-3 h-3 flex items-center justify-center rounded-full">
            3
          </span>
        </div>

        {/* Help Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setHelpOpen(true)}
          onMouseLeave={() => setHelpOpen(false)}
        >
          <div
            onClick={() => setHelpOpen(!helpOpen)}
            className="text-sm cursor-pointer font-medium select-none flex items-center gap-1"
          >
            Help ▾
          </div>

          {helpOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg z-50">
              <ul className="py-1 text-sm">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  FAQ
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Contact Support
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  User Guide
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div
          className="relative"
          ref={profileRef}
          onMouseEnter={() => setProfileOpen(true)}
          onMouseLeave={() => setProfileOpen(false)}
        >
          <div className="rounded-full border-2 border-black cursor-pointer">
            <User />
          </div>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-46 bg-white text-black rounded-2xl shadow-xl border border-gray-200 overflow-hidden z-50 animate-fade-in">
              {/* Header */}
              <div className="px-4 py-3 border-b bg-gray-50">
                <p className="text-sm text-gray-800">
                  {userData?.email || "Guest"}
                </p>
                <p className="text-xs text-gray-500">
                  ID: {userData?.id || "N/A"}
                </p>
              </div>

              {/* Menu Items */}
              <ul className="py-1 text-sm">
                <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer gap-2 transition-colors">
                  <User size={14} /> My Profile
                </li>
                <li
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 bg-[#86d7d4] hover:bg-[#74e3e0] text-black cursor-pointer gap-2 transition-colors"
                >
                  <LogOut size={14} /> Logout
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Sidebar Toggle */}
        <div
          onClick={() => setopensidebar(!opensidebar)}
          className="cursor-pointer max-[900px]:block hidden"
        >
          <Menu size={28} />
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
