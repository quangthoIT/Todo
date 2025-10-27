import React, { useRef, useState } from "react";
import { ChevronDown, LogOut, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const UserMenu = ({ isMobile = false }) => {
  const { user: currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = () => {
    setOpen(false);
    logout();
    navigate("/login");
  };

  return (
    <div ref={menuRef} className="relative w-full">
      {/* Khung thông tin người dùng */}
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center w-full  ${
          isMobile
            ? `gap-3 p-2 rounded-xl hover:bg-blue-50 cursor-pointer ${
                open ? "border-none" : "border border-gray-200"
              }`
            : "gap-2 px-3 py-2 rounded-full border border-gray-200 hover:border-gray-300 hover:bg-blue-50 cursor-pointer"
        }  transition`}
      >
        {/* Avatar */}
        <div className="relative">
          {currentUser?.avatar ? (
            <img
              src={currentUser.avatar}
              alt="Avatar"
              className={`${
                isMobile ? "w-12 h-12" : "w-10 h-10"
              } rounded-full shadow-sm `}
            />
          ) : (
            <div
              className={`${
                isMobile ? "w-12 h-12" : "w-10 h-10"
              } flex items-center justify-center text-xl md:text-lg rounded-full bg-blue-600 text-white font-semibold shadow-sm`}
            >
              {currentUser?.userName?.[0]?.toUpperCase() || "U"}
            </div>
          )}
          <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>

        {/* Thông tin người dùng */}
        <div className="text-left flex-1">
          <p className="text-base md:text-sm font-medium text-gray-800">
            {currentUser?.userName}
          </p>
          <p className="text-sm md:text-xs text-gray-600">
            {currentUser?.email}
          </p>
        </div>
        {!isMobile && (
          <ChevronDown
            className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
              open ? "rotate-180" : "rotate-0"
            }`}
          />
        )}
      </button>

      {/* Dropdown menu */}
      {open && (
        <ul
          className={`absolute ${
            isMobile
              ? "static mt-2"
              : "top-16 left-0 w-56 bg-white rounded-xl shadow-md border border-gray-200"
          } overflow-hidden animate-fadeIn`}
        >
          <li className="md:p-2">
            <button
              onClick={() => {
                setOpen(false);
                navigate("/profile");
              }}
              className="w-full px-4 py-2 text-left rounded-md hover:bg-blue-50 text-base md:text-sm text-gray-700 flex items-center cursor-pointer"
            >
              <Settings className="w-4 h-4 mr-2" />
              Profile Setting
            </button>
          </li>
          <li className="md:p-2">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left rounded-md hover:bg-red-50 text-base md:text-sm text-red-500 flex items-center cursor-pointer"
            >
              <LogOut className="w-4 h-4 mr-2 text-red-500" />
              Logout
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default UserMenu;
